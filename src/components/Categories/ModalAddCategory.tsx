import { Button, Flex, Group, Select, TextInput, Textarea, useMantineTheme } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { RootState } from '../../redux/reducer';
import { Category } from '../../types/models/category';
import { categoryActions } from '../../reducers/category/category.action';

interface Props {
  close: () => void;
}

const ModalAddCategory: React.FC<Props> = ({ close }) => {
  const dispatch = useAppDispatch();
  const { categories } = useSelector((state: RootState) => state.category);

  const categoryParentOptions = useMemo(
    () =>
      categories.map((category) => ({
        value: category.id?.toString() ?? '',
        label: category.name,
      })),
    [categories]
  );

  const initialValues: Category = {
    name: '',
    categoryParentID: 0,
    description: '',
  };

  const form = useForm({
    initialValues,
    validate: {
      name: isNotEmpty('Bạn chưa nhập tên danh mục hàng!'),
    },
  });

  return (
    <form
      id="form-add-category"
      onSubmit={form.onSubmit((values) =>
        dispatch(
          categoryActions.addCategory(values, {
            onSuccess: () => {
              close();
              dispatch(categoryActions.getAllCategories());
            },
          })
        )
      )}
    >
      <Flex direction="column" gap="sm">
        <TextInput withAsterisk label="Tên danh mục" placeholder="Nhập tên danh mục" {...form.getInputProps('name')} />

        <Select
          data={categoryParentOptions}
          placeholder="Danh mục cha"
          label="Chọn danh mục cha"
          {...form.getInputProps('categoryParentID')}
        />

        <Textarea
          placeholder="Nhập mô tả..."
          label="Mô tả danh mục"
          {...form.getInputProps('description')}
          minRows={4}
        />

        <Group mt="sm" position="right">
          <Button variant="light" onClick={close}>
            Huỷ bỏ
          </Button>
          <Button type="submit">Thêm mới</Button>
        </Group>
      </Flex>
    </form>
  );
};

export default ModalAddCategory;
