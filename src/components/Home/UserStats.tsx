import { Card, Group, Loader, RingProgress, Text } from '@mantine/core';
import { UsersStatistics } from '../../types/helpers/statistics';
import useStyles from './styles';

interface StatsRingCardProps {
  stats?: UsersStatistics;
}

function UserStats({ stats }: StatsRingCardProps) {
  if (!stats) return <Loader />;

  const { totalUser, totalUserOrdered } = stats;
  const { classes, theme } = useStyles();

  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <div className={classes.inner}>
        <div>
          <Text fz="xl" className={classes.label}>
            Khách hàng
          </Text>
          <div>
            <Text className={classes.lead} mt={30}>
              {totalUser}
            </Text>
            <Text fz="xs" color="dimmed">
              Người dùng
            </Text>
          </div>
          <Group mt="lg">
            <div>
              <Text className={classes.label}>{totalUserOrdered}</Text>
              <Text size="xs" color="dimmed">
                Người đặt hàng
              </Text>
            </div>
          </Group>
        </div>

        <div className={classes.ring}>
          <RingProgress
            roundCaps
            thickness={6}
            size={150}
            sections={[{ value: (totalUserOrdered / totalUser) * 100, color: theme.primaryColor }]}
            label={
              <div>
                <Text ta="center" fz="lg" className={classes.label}>
                  {((totalUserOrdered / totalUser) * 100).toFixed(0)}%
                </Text>
                <Text ta="center" fz="xs" c="dimmed">
                  Đã đặt đơn
                </Text>
              </div>
            }
          />
        </div>
      </div>
    </Card>
  );
}

export default UserStats;
