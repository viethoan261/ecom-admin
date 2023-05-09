import {
  ActionIcon,
  Button,
  Flex,
  Group,
  Modal,
  NumberInput,
  Paper,
  Select,
  SelectItem,
  Stack,
  Text,
  TextInput,
  Textarea,
  useMantineTheme,
  Image,
} from '@mantine/core';
import React, { useMemo } from 'react';
import { Product } from '../../types/models/product';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';
import { AddProductPayload } from '../../reducers/product/product.type';
import { isNotEmpty, useForm } from '@mantine/form';
import { IconPhoto, IconPlus, IconUpload, IconX } from '@tabler/icons-react';
import { ColorSelectOptions, SizeSelectOptions } from '../../config/constants/system';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { handleUploadImageOnFirebase } from '../../config/firebase/helpers';
import { productActions } from '../../reducers/product/product.action';
import { notiType, renderNotification } from '../../utils/notifications';

interface Props {
  item: Product | null;
  close: () => void;
}

const ModalEditProduct: React.FC<Props> = ({ close, item }) => {
  if (!item) return null;
  const { categoryID, categoryName, description, name, price, status, properties } = item;

  const dispatch = useAppDispatch();
  const theme = useMantineTheme();
  const { categories } = useSelector((state: RootState) => state.category);

  const categoryParentOptions: SelectItem[] = useMemo(() => {
    return categories.map((category) => ({
      value: category.id?.toString() ?? '',
      label: category.name,
      group: categories.find((cate) => cate.id === category.categoryParentID)?.name,
    }));
  }, [categories]);

  const initialValues: AddProductPayload = {
    name,
    description,
    price,
    categoryID,
    properties: properties ?? [],
  };

  const form = useForm({
    initialValues: {
      ...initialValues,
      categoryID: categoryID?.toString(),
    },
    validate: {
      name: isNotEmpty('Bạn chưa nhập tên sản phẩm!'),
      price: isNotEmpty('Bạn chưa nhập giá sản phẩm!'),
      categoryID: isNotEmpty('Bạn chưa chọn danh mục!'),
      properties: (value) => (value.length <= 0 ? 'Bạn chưa chọn kích cỡ và màu sắc' : null),
    },
  });

  const fields = form.values.properties.map((item, index) => {
    const disabledSizes = form.values.properties
      .slice(0, index)
      .filter((prop) => prop.color === item.color)
      .map((prop) => prop.size);

    return (
      <Paper pos="relative" shadow="xs" p="md" key={`product-variants-${index}`}>
        <ActionIcon
          top={-5}
          right={-5}
          pos="absolute"
          color="red"
          size="xs"
          variant="filled"
          onClick={() => form.removeListItem('properties', index)}
        >
          <IconX size="0.75rem" />
        </ActionIcon>
        <Group position="apart" spacing={0}>
          <Stack w={`calc(100% - 100.2px)`} spacing="xs">
            <Select
              data={ColorSelectOptions}
              placeholder="Màu sắc"
              {...form.getInputProps(`properties.${index}.color`)}
            />
            <Select
              data={SizeSelectOptions(disabledSizes)}
              placeholder="Kích cỡ"
              {...form.getInputProps(`properties.${index}.size`)}
            />
            <NumberInput
              defaultValue={0}
              placeholder="Chọn hoặc nhập số lượng"
              withAsterisk
              {...form.getInputProps(`properties.${index}.quantity`)}
              min={0}
            />
          </Stack>
          <Dropzone
            onDrop={(files) => {
              handleUploadImageOnFirebase(files[0], {
                onSuccess: (url) => {
                  form.setFieldValue(`properties.${index}.imagePath`, url);
                },
              });
            }}
            onReject={(files) => console.log('rejected files', files)}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            multiple={false}
            {...form.getInputProps(`properties.${index}.imagePath`)}
          >
            <Group position="center" spacing="xs" style={{ pointerEvents: 'none' }}>
              <Dropzone.Accept>
                <IconUpload size="2rem" stroke={1.5} color={theme.colors[theme.primaryColor][6]} />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX size="2rem" stroke={1.5} color={theme.colors.red[6]} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                {form.getInputProps(`properties.${index}.imagePath`).value ? (
                  <Image src={form.getInputProps(`properties.${index}.imagePath`).value} mt={8} width={50}/>
                ) : (
                  <IconPhoto size="3.2rem" stroke={1.5} />
                )}
              </Dropzone.Idle>
            </Group>
          </Dropzone>
        </Group>
      </Paper>
    );
  });

  return (
    <form
      id="form-add-product"
      onSubmit={form.onSubmit((values) => {
        if (!form.isDirty()) {
          renderNotification('Thông báo', 'Bạn chưa thay đổi thông tin gì!', notiType.ERROR);
          return;
        }
        const finalValue = { ...values, categoryID: Number(values.categoryID) };
        const initialProps = item.properties?.map((prop) => prop.propertyID);
        const editedProps = values.properties?.map((prop) => prop.propertyID);

        const deletedProps = initialProps?.filter((id) => !editedProps?.includes(id));

        dispatch(
          productActions.editProduct(
            { ...item, ...finalValue },
            {
              onSuccess: () => {
                if (deletedProps && deletedProps.length > 0) {
                  deletedProps.forEach((id) =>
                    dispatch(
                      productActions.deleteProperty(id, {
                        onSuccess: () => {
                          close();
                          dispatch(productActions.getAllProducts());
                        },
                      })
                    )
                  );
                  return;
                }
                close();
                dispatch(productActions.getAllProducts());
              },
            }
          )
        );
      })}
    >
      <Flex direction="column" gap="sm">
        <TextInput withAsterisk label="Tên sản phẩm" placeholder="Nhập tên sản phẩm" {...form.getInputProps('name')} />

        <Select
          searchable
          clearable
          withAsterisk
          data={categoryParentOptions}
          placeholder="Danh mục"
          label="Chọn danh mục"
          {...form.getInputProps('categoryID')}
        />

        <NumberInput
          defaultValue={0}
          placeholder="Chọn hoặc nhập giá sản phẩm"
          label="Giá tiền"
          step={1000}
          withAsterisk
          {...form.getInputProps('price')}
          min={0}
        />

        <Textarea
          placeholder="Nhập mô tả..."
          label="Mô tả sản phẩm"
          {...form.getInputProps('description')}
          minRows={4}
        />

        <Stack spacing={4}>
          <Text fw={600} fz="sm">
            Màu sắc, kích cỡ
          </Text>
          {fields.length === 0 ? null : (
            <Stack mb="xs" mt={0}>
              {fields}
            </Stack>
          )}
          <Button
            leftIcon={<IconPlus size={14} />}
            fullWidth
            variant="outline"
            onClick={() => form.insertListItem('properties', { color: '', size: '', quantity: 0, imagePath: '' })}
          >
            Thêm hình dáng
          </Button>
        </Stack>

        <Group mt="sm" position="right">
          <Button variant="light" onClick={close}>
            Huỷ bỏ
          </Button>
          <Button type="submit">Cập nhật</Button>
        </Group>
      </Flex>
    </form>
  );
};

export default ModalEditProduct;
