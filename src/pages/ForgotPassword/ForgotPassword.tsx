import { Card, Col, Grid, Text, TextInput, Button, MediaQuery, BackgroundImage, Box, Center } from '@mantine/core';
import { useForm, isEmail, isNotEmpty } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import ROUTER from '../../config/router';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { userActions } from '../../reducers/account/user.action';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';
import { IconLoader } from '@tabler/icons-react';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isFetching } = useSelector((state: RootState) => state.user);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: isEmail('Bạn cần nhập email hợp lệ') && isNotEmpty('Bạn chưa nhập tên email'),
    },
  });

  const handleSubmit = (values: { email: string; password: string }) => {
    dispatch(userActions.forgotPassword(values.email));
  };

  return (
    <Center mt="xl">
      <Card withBorder w={360}>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Grid>
            <Col span={12}>
              <Text align="center" weight={700} size="xl">
                Quên Mật Khẩu
              </Text>
            </Col>
            <Col span={12}>
              <Text align="center" weight={400} size="sm">
                Nhập email của bạn để khôi phục lại mật khẩu
              </Text>
            </Col>
            <Col span={12}>
              <TextInput placeholder="Email" {...form.getInputProps('email')}></TextInput>
            </Col>
            <Col span={12}>
              <Button leftIcon={isFetching ? <IconLoader /> : undefined} disabled={isFetching} type="submit" fullWidth>
                Lấy lại mật khẩu
              </Button>
            </Col>
          </Grid>
        </form>
      </Card>
    </Center>
  );
};

export default ForgotPassword;
