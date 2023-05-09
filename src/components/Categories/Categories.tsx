import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { IconEdit, IconInfoCircle, IconPlus, IconTrash } from '@tabler/icons-react';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { StatusTypePayload, categoryActions } from '../../reducers/category/category.action';
import { RootState } from '../../redux/reducer';
import { Category, CategoryStatus, CategoryStatusStrategy } from '../../types/models/category';
import ModalAddCategory from './ModalAddCategory';
import ModalEditCategory from './ModalEditCategory';

const Categories = () => {
  const dispatch = useAppDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const [openedEditModal, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
  const [selectedItem, setSelectedItem] = useState<Category | null>(null);
  const { categories } = useSelector((state: RootState) => state.category);

  const columns: DataTableColumn<Category>[] = [
    { accessor: 'name', title: 'Tên Danh Mục' },
    { accessor: 'description', title: 'Mô Tả Danh Mục' },
    {
      accessor: 'categoryParentID',
      title: 'Danh Mục Cha',
      render: ({ categoryParentID }) => {
        const parentCategory = categories.find((category) => category.id === categoryParentID);
        const categoryName = parentCategory ? parentCategory.name : '';
        return <Text>{categoryName}</Text>;
      },
    },
    {
      accessor: 'status',
      title: 'Trạng Thái',
      width: 200,
      render: (record) => <Text>{CategoryStatusStrategy[record.status!]?.label}</Text>,
    },
  ];

  return (
    <>
      <Stack>
        <Group position="apart">
          <Text fw={700} fz="xl">
            Danh Sách Danh Mục
          </Text>
          <Button leftIcon={<IconPlus size={16} />} onClick={open}>
            Thêm
          </Button>
        </Group>

        <DataTable
          minHeight={200}
          withBorder
          withColumnBorders
          striped
          highlightOnHover
          columns={columns}
          records={categories}
          rowContextMenu={{
            trigger: 'click',
            items: (record) => [
              {
                key: 'edit',
                icon: <IconEdit size={16} />,
                title: `Sửa danh mục ${record.name}`,
                onClick: () => {
                  setSelectedItem(record);
                  openEditModal();
                },
              },
              {
                key: 'delete',
                color: 'orange',
                icon: <IconInfoCircle size={16} />,
                title: `Thay đổi trạng thái danh mục`,
                onClick: () =>
                  modals.openConfirmModal({
                    title: 'Xác Nhận Thay Đổi Trạng Thái',
                    centered: true,
                    children: <Text size="sm">Bạn có chắc muốn thay đổi trạng thái danh mục này không?</Text>,
                    labels: { confirm: 'Đồng ý', cancel: 'Huỷ bỏ' },
                    confirmProps: { color: 'red' },
                    onCancel: () => {},
                    onConfirm: () => {
                      if (!record.id) return;
                      dispatch(
                        categoryActions.toggleStatus(
                          {
                            id: record.id,
                            type:
                              record.status === CategoryStatus.ACTIVE
                                ? StatusTypePayload.inactive
                                : StatusTypePayload.active,
                          },
                          {
                            onSuccess: () => dispatch(categoryActions.getAllCategories()),
                          }
                        )
                      );
                    },
                  }),
              },
            ],
          }}
        />
      </Stack>
      <Modal centered opened={opened} onClose={close} title="Thêm Danh Mục">
        <ModalAddCategory close={close} />
      </Modal>
      <Modal centered opened={openedEditModal} onClose={closeEditModal} title="Sửa Danh Mục">
        <ModalEditCategory item={selectedItem} close={closeEditModal} />
      </Modal>
    </>
  );
};

export default Categories;
