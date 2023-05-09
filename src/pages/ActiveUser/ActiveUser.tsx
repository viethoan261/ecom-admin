import { Center, Loader, Space, Stack, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTER from '../../config/router';
import { useAuthContext } from '../../hooks/contexts';
import { getParamsFromUrl } from '../../utils/helpers';

const ActiveUser = () => {
  const navigate = useNavigate();
  const { active } = useAuthContext();
  const [remainingTime, setRemainingTime] = useState(3);

  useEffect(() => {
    const email = getParamsFromUrl('email');
    if (!email) return;

    active(email, {
      onSuccess: () => {
        let timeLeft = remainingTime;
        const intervalId = setInterval(() => {
          timeLeft -= 1;
          setRemainingTime(timeLeft);
        }, 1000);
        setTimeout(() => {
          clearInterval(intervalId);
          navigate(ROUTER.AUTH.LOGIN);
        }, remainingTime * 1000);
      },
    });
  }, []);

  return (
    <Center>
      <Stack align="center">
        <Space />
        <Loader color="orange.9" />
        <Text>Kích hoạt tài khoản lần đầu thành công</Text>
        <Stack spacing="sm">
          <Text>
            Đang chuyển hướng đến trang đăng nhập trong{' '}
            <Text span inherit color="red" fw={700}>
              {remainingTime}
            </Text>
            &nbsp; giây
          </Text>
        </Stack>
      </Stack>
    </Center>
  );
};

export default ActiveUser;
