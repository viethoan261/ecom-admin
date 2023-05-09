import { DataTable } from 'mantine-datatable';
import { DataTableColumn } from 'mantine-datatable/dist/types';

import { Group, Modal, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Order, OrderStatus, OrderStatusStrategy } from '../../types/models/order';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';
import { formatCurrency, getNextEnumValue } from '../../utils/helpers';
import { IconInfoCircle, IconTrash } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { orderActions } from '../../reducers/order/order.action';

const Orders = () => {
  const { orders } = useSelector((state: RootState) => state.order);

  const dispatch = useAppDispatch();

  const columns: DataTableColumn<Order>[] = [
    { accessor: 'orderID', title: 'Mã Đơn' },
    {
      accessor: 'status',
      title: 'Trạng Thái',
      width: 100,
      render: (record) => <Text>{OrderStatusStrategy[record.status!].label}</Text>,
    },
    { accessor: 'name', title: 'Tên Khách Hàng' },
    { accessor: 'email', title: 'Email' },
    { accessor: 'phone', title: 'Số Điện Thoại' },
    { accessor: 'price', title: 'Tổng Thanh Toán', render: (record) => formatCurrency(record.price) },
    { accessor: 'address', width: 400, title: 'Địa Chỉ' },
  ];

  return (
    <>
      <Stack>
        <Group position="apart">
          <Text fw={700} fz="xl">
            Danh Sách Đơn Hàng
          </Text>
        </Group>
        <DataTable
          idAccessor="orderID"
          minHeight={200}
          withBorder
          withColumnBorders
          striped
          highlightOnHover
          columns={columns}
          records={orders}
          rowContextMenu={{
            trigger: 'click',
            items: (record) => [
              {
                key: 'status',
                color: 'orange',
                hidden: record.status === OrderStatus.delivered || record.status === OrderStatus.rejected,
                icon: <IconInfoCircle size={16} />,
                title: `Thay đổi trạng thái đơn`,
                onClick: () =>
                  modals.openConfirmModal({
                    title: 'Xác Nhận Thay Đổi Trạng Thái',
                    centered: true,
                    children: <Text size="sm">Bạn có chắc muốn thay đổi trạng thái đơn hàng này không?</Text>,
                    labels: { confirm: 'Đồng ý', cancel: 'Huỷ bỏ' },
                    confirmProps: { color: 'red' },
                    onCancel: () => {},
                    onConfirm: () => {
                      if (!record.orderID) return;
                      const nextStatus: () => OrderStatus = () => {
                        if (record.status === OrderStatus.pending) return OrderStatus.delivering;
                        if (record.status === OrderStatus.delivering) return OrderStatus.delivered;
                        if (record.status === OrderStatus.delivered) return OrderStatus.delivered;
                        if (record.status === OrderStatus.rejected) return OrderStatus.rejected;
                        return OrderStatus.delivered;
                      };

                      if (!nextStatus) {
                        return;
                      }
                      dispatch(
                        orderActions.changeOrderStatus(record.orderID, nextStatus(), {
                          onSuccess: () => dispatch(orderActions.getAllOrders()),
                        })
                      );
                    },
                  }),
              },
              {
                key: 'reject',
                color: 'red',
                icon: <IconTrash size={16} />,
                title: `Huỷ đơn`,
                hidden: record.status !== OrderStatus.pending,
                onClick: () =>
                  modals.openConfirmModal({
                    title: 'Xác Nhận Huỷ',
                    centered: true,
                    children: <Text size="sm">Bạn có chắc muốn huỷ đơn hàng này không?</Text>,
                    labels: { confirm: 'Đồng ý', cancel: 'Huỷ bỏ' },
                    confirmProps: { color: 'red' },
                    onCancel: () => {},
                    onConfirm: () => {
                      if (!record.orderID) return;

                      dispatch(
                        orderActions.changeOrderStatus(record.orderID, OrderStatus.rejected, {
                          onSuccess: () => dispatch(orderActions.getAllOrders()),
                        })
                      );
                    },
                  }),
              },
            ],
          }}
        />
      </Stack>
    </>
  );
};

export default Orders;
