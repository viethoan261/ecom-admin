import { Button, Group, Select, Stack, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { IconLock, IconUser } from '@tabler/icons-react';
import React from 'react';
import { Role, SelectRoleOptions, User } from '../../types/models/user';
import { useAuthContext } from '../../hooks/contexts';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { userActions } from '../../reducers/account/user.action';

interface Props {
  close: () => void;
}

const ModalAddAccount: React.FC<Props> = ({ close }) => {
  const dispatch = useAppDispatch();
  const { signup, state } = useAuthContext();

  const initialValues: User = {
    userName: '',
    password: '',
    email: '',
    fullName: '',
    role: Role.staff,
  };

  const form = useForm({
    initialValues,
    validate: {
      userName: isNotEmpty('Bạn chưa nhập tên tài khoản'),
      password: isNotEmpty('Điền mật khẩu!'),
      fullName: isNotEmpty('Bạn chưa nhập tên!'),
      role: isNotEmpty('Bạn chưa chọn vai trò'),
      email: isNotEmpty('Bạn chưa điền email'),
    },
  });

  return (
    <>
      <form
        onSubmit={form.onSubmit((values) =>
          signup(values, {
            onSuccess: () => {
              dispatch(userActions.getAllUsers());
              close();
            },
          })
        )}
      >
        <Stack>
          <TextInput
            withAsterisk
            label="Tên đăng nhập"
            placeholder="Nhập tên tài khoản"
            icon={<IconUser size={14} />}
            {...form.getInputProps('userName')}
          />
          <TextInput
            withAsterisk
            label="Mật khẩu"
            type="password"
            placeholder="Nhập mật khẩu"
            icon={<IconLock size={14} />}
            {...form.getInputProps('password')}
          />
          <TextInput withAsterisk label="Họ và tên" placeholder="Nhập họ và tên" {...form.getInputProps('fullName')} />
          <TextInput
            withAsterisk
            label="Email"
            placeholder="Nhập email"
            {...form.getInputProps('email')}
            type="email"
          />
          <Select withAsterisk data={SelectRoleOptions} label="Vai trò" {...form.getInputProps('role')} />
          <Group mt="sm" position="right">
            <Button variant="light" onClick={close}>
              Huỷ bỏ
            </Button>
            <Button disabled={state.isFetching} type="submit">
              Thêm mới
            </Button>
          </Group>
        </Stack>
      </form>
    </>
  );
};

export default ModalAddAccount;
