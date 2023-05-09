import { Avatar, Button, Grid, Group, Image, Modal, Select, Stack, Text, TextInput } from '@mantine/core';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { IconEdit, IconInfoCircle, IconPlus, IconRefresh, IconSearch, IconTrash } from '@tabler/icons-react';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';
import { Product, ProductStatus } from '../../types/models/product';
import { formatCurrency } from '../../utils/helpers';
import ModalAddProduct from './ModalAddProduct';
import ModalEditProduct from './ModalEditProduct';
import { modals } from '@mantine/modals';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { productActions } from '../../reducers/product/product.action';
import { StatusTypePayload } from '../../reducers/category/category.action';

const Products = () => {
  const { categories } = useSelector((state: RootState) => state.category);
  const { products } = useSelector((state: RootState) => state.product);

  const dispatch = useAppDispatch();
  const [query, setQuery] = useState('');
  const [records, setRecords] = useState(products);
  const [filterPrice, setFilterPrice] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);

  const [opened, { open, close }] = useDisclosure(false);
  const [openedEditModal, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);

  const [debouncedQuery] = useDebouncedValue(query, 200);

  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterCategoryChildren, setFilterCategoryChildren] = useState<(number | undefined)[]>([]);

  const categorySelectOptions = useMemo(
    () =>
      categories.map((category) => ({
        value: category.id?.toString() || '',
        label: category.name || '',
      })),
    [categories]
  );

  useEffect(() => {
    setRecords(
      products.filter(({ price = 0, name, categoryID }) => {
        if (filterPrice && price < 1000000) {
          return false;
        }
        // Search
        if (debouncedQuery !== '' && !`${name}`.toLowerCase().includes(debouncedQuery.trim().toLowerCase())) {
          return false;
        }

        // Filter theo danh mục
        if (
          filterCategory &&
          filterCategory !== categoryID?.toString() &&
          !filterCategoryChildren.find((child) => child === categoryID)
        ) {
          return false;
        }

        return true;
      })
    );

    console.log(filterCategoryChildren);
  }, [debouncedQuery, filterPrice, filterCategory, products, filterCategoryChildren]);

  const columns: DataTableColumn<Product>[] = [
    { accessor: 'name', title: 'Tên Sản Phẩm' },
    { accessor: 'description', title: 'Mô Tả' },
    {
      accessor: 'categoryName',
      title: 'Danh Mục',
      render: ({ categoryID }) => {
        const category = categories.find((category) => category.id === categoryID);
        const categoryName = category ? category.name : '';
        return <Text>{categoryName}</Text>;
      },
    },
    {
      accessor: 'price',
      title: 'Giá Tiền',
      width: 80,
      render: (record) => <>{formatCurrency(record.price)}</>,
    },
    { accessor: 'quantity', title: 'Số Lượng Còn Lại' },
    { accessor: 'status', title: 'Trạng Thái' },
    {
      accessor: 'properties',
      title: 'Hình Ảnh ',
      render: ({ properties }) => (
        <Image
          width={100}
          height={100}
          src={(properties && properties[0]?.imagePath && properties[0]?.imagePath.toString()) || ''}
        />
      ),
    },
  ];

  return (
    <>
      <Stack>
        <Group position="apart">
          <Text fw={700} fz="xl">
            Danh Sách Sản Phẩm
          </Text>
          <Button leftIcon={<IconPlus size={16} />} onClick={open}>
            Thêm
          </Button>
        </Group>
        <Grid align="center">
          <Grid.Col span={6}>
            <TextInput
              placeholder="Tìm kiếm sản phẩm..."
              icon={<IconSearch size={16} />}
              value={query}
              onChange={(e) => setQuery(e.currentTarget.value)}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              clearable
              placeholder="Lọc theo danh mục..."
              data={categorySelectOptions}
              onChange={(value) => {
                setFilterCategory(value);
                setFilterCategoryChildren(
                  categories.filter((cate) => cate.categoryParentID === Number(value)).map((cate) => cate.id)
                );
              }}
            />
          </Grid.Col>
        </Grid>
        <DataTable
          minHeight={200}
          withBorder
          withColumnBorders
          striped
          highlightOnHover
          columns={columns}
          records={records}
          rowContextMenu={{
            trigger: 'click',
            items: (record) => [
              {
                key: 'edit',
                icon: <IconEdit size={16} />,
                title: `Sửa sản phẩm`,
                onClick: () => {
                  setSelectedItem(record);
                  openEditModal();
                },
              },
              {
                key: 'delete',
                color: 'orange',
                icon: <IconInfoCircle size={16} />,
                title: `Thay đổi trạng thái sản phẩm`,
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
                        productActions.toggleStatus(
                          {
                            id: record.id,
                            type:
                              record.status === ProductStatus.ACTIVE
                                ? StatusTypePayload.inactive
                                : StatusTypePayload.active,
                          },
                          {
                            onSuccess: () => dispatch(productActions.getAllProducts()),
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
      <Modal centered opened={opened} onClose={close} title="Thêm Sản Phẩm">
        <ModalAddProduct close={close} />
      </Modal>
      <Modal centered opened={openedEditModal} onClose={closeEditModal} title="Sửa Sản Phẩm">
        <ModalEditProduct item={selectedItem} close={closeEditModal} />
      </Modal>
    </>
  );
};

export default Products;

const initialRecords: Product[] = [];
