import {
  ActionIcon,
  Anchor,
  AppShell,
  Button,
  Group,
  Header,
  Image,
  Indicator,
  Loader,
  LoadingOverlay,
  Menu,
  Navbar,
  Text,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconBellRinging, IconCheck, IconLogout, IconNotification } from '@tabler/icons-react';
import { Suspense, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import logo from '../../assets/svg/db.svg';
import ROUTER from '../../config/router';
import MainLinks from '../MainLinks';
import User from '../User';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { categoryActions } from '../../reducers/category/category.action';
import { productActions } from '../../reducers/product/product.action';
import { Role } from '../../types/models/user';
import { userActions } from '../../reducers/account/user.action';
import { useAuthContext, useSocketContext } from '../../hooks/contexts';
import { notiType, renderNotification } from '../../utils/notifications';
import { useDidUpdate } from '@mantine/hooks';
import { orderActions } from '../../reducers/order/order.action';

export default function AppLayout() {
  const [opened, setOpened] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { getCurrentProfile } = useAuthContext();
  const { connectWs, closeWs, message } = useSocketContext();

  const handleLogout = () => {
    modals.openConfirmModal({
      title: 'Xác Nhận Rời Khỏi',
      centered: true,
      children: <Text size="sm">Bạn có chắc muốn đăng xuất không?</Text>,
      labels: { confirm: 'Đồng ý', cancel: 'Huỷ bỏ' },
      confirmProps: { color: 'red' },
      onCancel: () => {},
      onConfirm: () => {
        localStorage.removeItem('authUser');
        navigate(ROUTER.AUTH.LOGIN);
        notifications.show({
          withCloseButton: true,
          title: 'Thông báo',
          message: 'Bạn đã đăng xuất thành công!',
          color: 'green',
          icon: <IconCheck size={16} />,
          autoClose: 1200,
        });
      },
    });
  };

  useEffect(() => {
    dispatch(categoryActions.getAllCategories());
    dispatch(productActions.getAllProducts());
    dispatch(orderActions.getAllOrders());
    getCurrentProfile();
    if (JSON.parse(localStorage.getItem('authUser') || '').role === Role.admin) {
      dispatch(userActions.getAllUsers());
    }
    connectWs();

    return closeWs;
  }, []);

  useDidUpdate(() => {
    if (!message) return;
    renderNotification('Thông báo', `Bạn có đơn hàng mới cập nhật`, notiType.INFO);
  }, [message]);

  return (
    <>
      <AppShell
        styles={{
          main: {
            maxWidth: 'calc(100vw - 32px)',
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
            <Navbar.Section grow mt="0">
              <MainLinks />
            </Navbar.Section>
            <Navbar.Section>
              <User />
            </Navbar.Section>
          </Navbar>
        }
        header={
          <Header height={60}>
            <Group position="apart" sx={{ height: '100%' }} px={20}>
              <Group>
                <Anchor href={ROUTER.HOME.INDEX}>
                  <Image src={logo} height={32} width={32} />
                </Anchor>
                <Text fw={600} fz="lg">
                  Hệ Thống Quản Lý Shop Quần Áo
                </Text>
              </Group>
              <Group>
                <Menu width={280} position="bottom-end">
                  {message && (
                    <Menu.Target>
                      <Indicator>
                        <ActionIcon>
                          <IconBellRinging size={16} color="black" />
                        </ActionIcon>
                      </Indicator>
                    </Menu.Target>
                  )}
                  <Menu.Dropdown>
                    <Menu.Label>Thông báo</Menu.Label>
                    <Menu.Item>
                      Đơn hàng mới đến {message?.address} - Mã đơn hàng: {message?.id} - Tổng giá trị: {message?.price}
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
                <Button onClick={handleLogout} variant="subtle" color="red" leftIcon={<IconLogout size={20} />}>
                  Đăng xuất
                </Button>
              </Group>
            </Group>
          </Header>
        }
      >
        <Suspense fallback={<LoadingOverlay visible />}>
          <Outlet />
        </Suspense>
      </AppShell>
    </>
  );
}
