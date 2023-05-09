import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { IconEdit, IconPlus, IconRefresh, IconTrash } from '@tabler/icons-react';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAuthContext } from '../../hooks/contexts';
import { RootState } from '../../redux/reducer';
import { Role, User } from '../../types/models/user';
import ModalAddAccount from './ModalAddAccount';
import ModalEditUser from './ModalEditUser';
import { modals } from '@mantine/modals';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { userActions } from '../../reducers/account/user.action';

const Accounts = () => {
  const { state } = useAuthContext();
  const { users } = useSelector((state: RootState) => state.user);
  const [openedAddModal, { close: closeAddModal, open: openAddModal }] = useDisclosure();
  const [openedEditModal, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const columns: DataTableColumn<User>[] = [
    { accessor: 'fullName', title: 'Họ Và Tên' },
    { accessor: 'userName', title: 'Tên Tài Khoản' },
    { accessor: 'phone', title: 'Số Điện Thoại' },
    { accessor: 'role', title: 'Chức Vụ' },
    { accessor: 'email', title: 'Email' },
    { accessor: 'district', title: 'Tỉnh/Thành phố' },
    { accessor: 'city', title: 'Thành phố/Huyện' },
    { accessor: 'ward', title: 'Xã/Phường' },
    { accessor: 'address', title: 'Địa Chỉ' },
  ];

  const memoRecords = useMemo(() => {
    if (state.user?.role === Role.staff) {
      return users.filter((user) => user.role === Role.customer);
    }
    return users;
  }, [users]);

  const dispatch = useAppDispatch();
  return (
    <>
      <Stack>
        <Group position="apart">
          <Text fw={700} fz="xl">
            Quản Lý Tài Khoản
          </Text>
          <Button leftIcon={<IconPlus size={16} />} onClick={openAddModal}>
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
          records={memoRecords}
          rowContextMenu={{
            trigger: 'click',
            items: (record) => [
              {
                key: 'edit',
                icon: <IconEdit size={16} />,
                title: `Sửa tài khoản ${record.fullName}`,
                onClick: () => {
                  setSelectedUser(record);
                  openEditModal();
                },
              },
              // {
              //   key: 'delete',
              //   color: 'red',
              //   icon: <IconTrash size={16} />,
              //   title: `Xoá tài khoản`,
              //   onClick: () => showNotification({ color: 'red', message: `Should delete company ${record?.fullName}` }),
              // },
              {
                key: 'resetPassword',
                color: 'green',
                icon: <IconRefresh size={16} />,
                title: `Cấp lại mật khẩu`,
                onClick: () => {
                  modals.openConfirmModal({
                    title: 'Xác Nhận Cấp Lại Mật Khẩu',
                    centered: true,
                    children: <Text size="sm">Bạn có chắc muốn cấp lại mật khẩu cho tài khoản này không?</Text>,
                    labels: { confirm: 'Đồng ý', cancel: 'Huỷ bỏ' },
                    confirmProps: { color: 'red' },
                    onConfirm: () => {
                      if (!record.id) return;
                      if (!record.email) return;
                      dispatch(userActions.forgotPassword(record?.email));
                    },
                  });
                },
              },
            ],
          }}
        />
      </Stack>
      <Modal centered opened={openedAddModal} onClose={closeAddModal} title="Thêm Tài Khoản">
        <ModalAddAccount close={closeAddModal} />
      </Modal>
      <Modal centered opened={openedEditModal} onClose={closeEditModal} title="Sửa Tài Khoản">
        <ModalEditUser item={selectedUser} close={closeEditModal} />
      </Modal>
    </>
  );
};

export default Accounts;
