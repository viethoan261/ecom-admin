import { ActionIcon, Grid, Group, Image, Stack, Text, Tooltip } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { useAuthContext } from '../../hooks/contexts';
import { useAppDispatch } from '../../hooks/use-app-dispatch';

const renderHeading = (children: string) => (
  <Text fz="md" fw={600}>
    {children}
  </Text>
);

const renderField = (children: string) => <Text fz="md">{children}</Text>;

const Profile = () => {
  const dispatch = useAppDispatch();
  const { state } = useAuthContext();

  return (
    <Stack>
      <Group position="apart">
        <Text fw={700} fz="xl">
          Trang cá nhân
        </Text>
        {/* <Tooltip label="Chỉnh sửa trang cá nhân">
          <ActionIcon>
            <IconEdit size={20} color="black" />
          </ActionIcon>
        </Tooltip> */}
      </Group>

      <Grid m="md" gutter={32}>
        <Grid.Col span="auto">
          <Grid gutter={32}>
            <Grid.Col span={5}>
              <Stack justify="space-between" spacing="sm">
                {renderHeading('Họ và tên')}
                {renderHeading('Tên tài khoản')}
                {renderHeading('Vị trí')}
              </Stack>
            </Grid.Col>
            <Grid.Col span={7}>
              <Stack justify="space-between" spacing="sm">
                {renderField(state?.user?.fullName || '')}
                {renderField(state?.user?.userName || '')}
                {renderField(state?.user?.role || '')}
              </Stack>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span="content">
          <Image
            width={300}
            height={300}
            src={
              'https://plus.unsplash.com/premium_photo-1664104028638-57ccb7c1aa31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80'
            }
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

export default Profile;
