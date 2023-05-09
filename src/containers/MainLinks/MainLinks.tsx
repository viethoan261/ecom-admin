import { Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import { IconBuildingFactory2, IconCategory2, IconListDetails, IconUsers } from '@tabler/icons-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTER from '../../config/router';

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  to: string;
}

const MainLink = ({ icon, color, label, to }: MainLinkProps) => {
  const navigate = useNavigate();

  return (
    <UnstyledButton
      onClick={() => navigate(to, { replace: true })}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
};

const data = [
  {
    icon: <IconBuildingFactory2 size="1rem" />,
    color: 'red',
    label: 'Quản Lý Sản Phẩm',
    to: ROUTER.NAV.PRODUCTS.INDEX,
  },
  {
    icon: <IconCategory2 size="1rem" />,
    color: 'gray',
    label: 'Quản Lý Danh Mục',
    to: ROUTER.NAV.CATEGORIES.INDEX,
  },
  {
    icon: <IconListDetails size="1rem" />,
    color: 'teal',
    label: 'Quản Lý Đơn Hàng',
    to: ROUTER.NAV.ORDERS.INDEX,
  },
  {
    icon: <IconUsers size="1rem" />,
    color: 'grape',
    label: 'Quản Lý Tài Khoản',
    to: ROUTER.NAV.ACCOUNTS.INDEX,
  },
];

const MainLinks = () => {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
};

export default MainLinks;
