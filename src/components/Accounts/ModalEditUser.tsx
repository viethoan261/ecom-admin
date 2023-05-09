import { Button, Group, Select, Stack, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import React from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { userActions } from '../../reducers/account/user.action';
import { SelectRoleOptions, User } from '../../types/models/user';
import { notiType, renderNotification } from '../../utils/notifications';

interface Props {
  item: User | null;
  close: () => void;
}

const ModalEditUser: React.FC<Props> = ({ close, item }) => {
  if (!item) return null;

  const { email, fullName, role, address, city, district, phone, ward, id } = item;

  const dispatch = useAppDispatch();

  const initialValues: User = {
    email,
    fullName,
    role,
    phone: phone ?? '',
    address: address ?? '',
    district: district ?? '',
    city: city ?? '',
    ward: ward ?? '',
  };

  const form = useForm({
    initialValues,
    validate: {
      fullName: isNotEmpty('Bạn chưa nhập tên!'),
      role: isNotEmpty('Bạn chưa chọn vai trò'),
      email: isNotEmpty('Bạn chưa điền email'),
      phone: isNotEmpty('Bạn chưa điền số điện thoại'),
    },
  });

  return (
    <>
      <form
        onSubmit={form.onSubmit((values) => {
          if (!form.isDirty()) {
            renderNotification('Thông báo', 'Bạn chưa thay đổi thông tin gì!', notiType.ERROR);
            return;
          }
          dispatch(
            userActions.editUser(
              { email, fullName, role, id, ...values },
              {
                onSuccess: () => {
                  close();
                  dispatch(userActions.getAllUsers());
                },
              }
            )
          );
        })}
      >
        <Stack>
          <TextInput withAsterisk label="Họ và tên" placeholder="Nhập họ và tên" {...form.getInputProps('fullName')} />
          <TextInput
            withAsterisk
            label="Email"
            placeholder="Nhập email"
            {...form.getInputProps('email')}
            type="email"
          />
          <Select withAsterisk data={SelectRoleOptions} label="Vai trò" {...form.getInputProps('role')} />
          <TextInput
            withAsterisk
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            {...form.getInputProps('phone')}
          />
          <TextInput label="Tỉnh/Thành phố" placeholder="Nhập tỉnh/thành phố" {...form.getInputProps('district')} />
          <TextInput label="Thành phố/Huyện" placeholder="Nhập thành phố/huyện" {...form.getInputProps('city')} />
          <TextInput label="Xã/Phường" placeholder="Nhập xã/phường" {...form.getInputProps('ward')} />
          <TextInput label="Địa chỉ" placeholder="Nhập địa chỉ" {...form.getInputProps('address')} />
          <Group mt="sm" position="right">
            <Button variant="light" onClick={close}>
              Huỷ bỏ
            </Button>
            <Button type="submit">Sửa</Button>
          </Group>
        </Stack>
      </form>
    </>
  );
};

export default ModalEditUser;
