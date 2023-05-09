import { Button, Card, Center, Col, Grid, Text, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import _ from 'lodash';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { userActions } from '../../reducers/account/user.action';

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const str = useLocation().search;
  const value = str.split('=')[2];
  const token = _.trimStart(value, '?');

  const form = useForm({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate: {
      password: isNotEmpty('Bạn chưa nhập mật khẩu'),
      confirmPassword: isNotEmpty('Bạn chưa nhập mật khẩu'),
    },
  });

  const handleSubmit = (formValue: any) => {
    dispatch(
      userActions.resetPassword(
        {
          token: token,
          pass: formValue.password,
          confirmPass: formValue.confirmPassword,
        },
        navigate
      )
    );
  };

  return (
    <Center>
      <Card withBorder padding="xl" w={360}>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Grid>
            <Col span={12}>
              <Text align="center" fw={600} size="xl">
                Khôi phục mật khẩu
              </Text>
            </Col>

            <Col span={12}>
              <TextInput
                placeholder="Mật khẩu mới"
                label="Mật khẩu mới"
                type={'password'}
                {...form.getInputProps('password')}
              ></TextInput>
            </Col>
            <Col span={12}>
              <TextInput
                placeholder="Xác nhận mật khẩu"
                label="Xác nhận mật khẩu"
                type={'password'}
                {...form.getInputProps('confirmPassword')}
              ></TextInput>
            </Col>
            <Col sx={{ marginTop: '10px' }} span={12}>
              <Button type="submit" fullWidth>
                Khôi phục mật khẩu
              </Button>
            </Col>
          </Grid>
        </form>
      </Card>
    </Center>
  );
};

export default ResetPassword;
