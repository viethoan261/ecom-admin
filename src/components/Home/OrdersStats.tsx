import { Card, Group, Loader, RingProgress, Text } from '@mantine/core';
import { OrdersStatistics, ProductsStatistics } from '../../types/helpers/statistics';
import useStyles from './styles';
import { useMemo } from 'react';
import { OrderStatus, OrderStatusStrategy } from '../../types/models/order';

interface StatsRingCardProps {
  stats?: OrdersStatistics[];
}

function OrderStats({ stats }: StatsRingCardProps) {
  if (!stats) return <Loader />;

  const { classes, theme } = useStyles();

  const totalOrders = useMemo(() => {
    return stats.reduce((sum, stat) => sum + stat.totalOrder, 0);
  }, [stats]);

  const totalDone = useMemo(() => {
    const done = stats.filter((stat) => stat.status === OrderStatus.delivered)[0];
    if (!done) return 0;
    return done.totalOrder;
  }, [stats]);

  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <div className={classes.inner}>
        <div>
          <Text fz="xl" className={classes.label}>
            Đơn hàng
          </Text>
          <div>
            <Text className={classes.lead} mt={30}>
              {totalOrders}{' '}
            </Text>
            <Text fz="xs" color="dimmed">
              Tổng sản phẩm
            </Text>
          </div>
          <Group mt="lg">
            {stats.map((stat) => (
              <div>
                <Text className={classes.label}>{stat.totalOrder}</Text>
                <Text size="xs" color="dimmed">
                  {OrderStatusStrategy[stat.status].label}
                </Text>
              </div>
            ))}
          </Group>
        </div>

        <div className={classes.ring}>
          <RingProgress
            roundCaps
            thickness={6}
            size={150}
            sections={[
              {
                value: (totalDone / totalOrders) * 100,
                color: theme.primaryColor,
              },
            ]}
            label={
              <div>
                <Text ta="center" fz="lg" className={classes.label}>
                  {((totalDone / totalOrders) * 100).toFixed(0)}%
                </Text>
                <Text ta="center" fz="xs" c="dimmed">
                  Hoàn thành
                </Text>
              </div>
            }
          />
        </div>
      </div>
    </Card>
  );
}

export default OrderStats;
