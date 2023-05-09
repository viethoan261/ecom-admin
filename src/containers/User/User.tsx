import { Avatar, Box, Group, Text, UnstyledButton, rem, useMantineTheme } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import ROUTER from '../../config/router';
import { useAuthContext } from '../../hooks/contexts';
import { useAppDispatch } from '../../hooks/use-app-dispatch';

const User = () => {
  const navigate = useNavigate();
  const theme = useMantineTheme();

  const { state } = useAuthContext();

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
      }}
    >
      <UnstyledButton
        sx={{
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

          '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          },
        }}
      >
        <Group onClick={() => navigate(ROUTER.AUTH.PROFILE)}>
          <Avatar radius="xl" />
          <Box sx={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {state?.user?.fullName}
            </Text>
            <Text color="dimmed" size="xs">
              {state?.user?.role}
            </Text>
          </Box>
        </Group>
      </UnstyledButton>
    </Box>
  );
};

export default User;
