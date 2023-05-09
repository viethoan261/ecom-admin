import React, { useMemo } from 'react';
import { Category } from '../../types/models/category';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';
import { isNotEmpty, useForm } from '@mantine/form';
import { categoryActions } from '../../reducers/category/category.action';
import { Button, Flex, Group, Select, TextInput, Textarea } from '@mantine/core';
import { notiType, renderNotification } from '../../utils/notifications';
import { Modify } from '../../types/helpers';

interface Props {
  item: Category | null;
  close: () => void;
}
const ModalEditCategory: React.FC<Props> = ({ item, close }) => {
  if (!item) return null;

  const { categoryParentID, description, id, name, status } = item;

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
    name,
    categoryParentID,
    description,
  };

  const form = useForm({
    initialValues: {
      ...initialValues,
      categoryParentID: categoryParentID?.toString(),
    },
    validate: {
      name: isNotEmpty('Bạn chưa nhập tên danh mục hàng!'),
    },
  });

  return (
    <form
      id="form-edit-category"
      onSubmit={form.onSubmit((values) => {
        if (!form.isDirty()) {
          renderNotification('Thông báo', 'Bạn chưa thay đổi thông tin gì!', notiType.ERROR);
          return;
        }
        const finalValue = { ...values, categoryParentID: Number(values.categoryParentID) };
        dispatch(
          categoryActions.editCategory(
            { ...item, ...finalValue },
            {
              onSuccess: () => {
                close();
                dispatch(categoryActions.getAllCategories());
              },
            }
          )
        );
      })}
    >
      <Flex direction="column" gap="sm">
        <TextInput withAsterisk label="Tên danh mục" placeholder="Nhập tên danh mục" {...form.getInputProps('name')} />

        <Select
          disabled={categoryParentID === 0}
          data={categoryParentOptions}
          placeholder={categoryParentID === 0 ? 'Không thể sửa danh mục cha cho danh mục gốc' : 'Danh mục cha'}
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
          <Button type="submit">Sửa</Button>
        </Group>
      </Flex>
    </form>
  );
};

export default ModalEditCategory;
