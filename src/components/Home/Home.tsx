import { faker } from '@faker-js/faker';
import { Alert, Group, Stack } from '@mantine/core';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { useContext, useLayoutEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useAuthContext, useStatisticsContext } from '../../hooks/contexts';
import UserStats from './UserStats';
import ProductStats from './ProductsStats';
import OrderStats from './OrdersStats';
import dayjs from 'dayjs';
import { Role } from '../../types/models/user';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Home = () => {
  const { state, getOrdersStatistics, getProductsStatistics, getUsersStatistics, getTurnOverStatistics } =
    useStatisticsContext();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'DOANH THU CỬA HÀNG THEO NGÀY',
      },
    },
  };

  const data = {
    labels: state?.turnoverStatistics?.map((statistic) => dayjs(statistic.paymentDate).format('DD/MM/YYYY')),
    datasets: [
      {
        label: 'Doanh thu',
        data: state?.turnoverStatistics?.map((statistics) => statistics.totalAmount / 1000000),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const role = useAuthContext().state.user?.role;

  useLayoutEffect(() => {
    getOrdersStatistics();
    getProductsStatistics();
    getUsersStatistics();
    getTurnOverStatistics();
  }, []);

  return role === Role.admin ? (
    <Stack spacing="xl">
      <Group mt="md" spacing="md" position="center">
        <UserStats stats={state.usersStatistics} />
        <ProductStats stats={state.productsStatistics} />
        <OrderStats stats={state.ordersStatistics} />
      </Group>
      <Line options={options} data={data} />
    </Stack>
  ) : null;
};

export default Home;
