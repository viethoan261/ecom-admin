import { Anchor, Button, Card, Center, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconLock, IconUser } from '@tabler/icons-react';
import { Navigate, useNavigate } from 'react-router-dom';
import AuthLayout from '../../containers/AuthLayout';
import { useAuthContext } from '../../hooks/contexts';
import { LoginValues } from '../../contexts/AuthContext';
import ROUTER from '../../config/router';
import { decodeToken } from '../../utils/token';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const authUser = localStorage.getItem('authUser');

  const initialValues: LoginValues = { userName: '', password: '' };
  const form = useForm({ initialValues });

  if (authUser) {
    return <Navigate to={ROUTER.HOME.INDEX} replace={true} />;
  }

  return (
    <AuthLayout>
      <Text align="center" fw="700" fz={28}>
        ĐĂNG NHẬP
      </Text>
      <Text align="center" color="dimmed" fz="xl">
        Chào mừng quay trở lại. Đăng nhập để tiếp tục
      </Text>
      <Center mt="sm">
        <Card shadow="md" w={360}>
          <form
            onSubmit={form.onSubmit((values) =>
              login(values, {
                onSuccess: () => {
                  navigate(ROUTER.HOME.INDEX);
                  decodeToken();
                },
              })
            )}
          >
            <Stack>
              <TextInput
                label="Tên đăng nhập"
                placeholder="Nhập tên tài khoản"
                icon={<IconUser size={14} />}
                {...form.getInputProps('userName')}
              />
              <TextInput
                label="Mật khẩu"
                type="password"
                placeholder="Nhập mật khẩu"
                icon={<IconLock size={14} />}
                {...form.getInputProps('password')}
              />
              <Button color="yellow.9" variant="filled" fullWidth type="submit">
                Đăng nhập
              </Button>
            </Stack>
            <Anchor href={ROUTER.AUTH.FORGOT_PASSWORD} target="_blank">
              <Text mt="xs" fz="xs" ta="right">
                Quên mật khẩu?
              </Text>
            </Anchor>
          </form>
        </Card>
      </Center>
    </AuthLayout>
  );
};

export default Login;
