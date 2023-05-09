import { Card, Group, Loader, RingProgress, Text } from '@mantine/core';
import { ProductsStatistics } from '../../types/helpers/statistics';
import useStyles from './styles';

interface StatsRingCardProps {
  stats?: ProductsStatistics;
}

function ProductStats({ stats }: StatsRingCardProps) {
  if (!stats) return <Loader />;

  const { totalActiveProduct, totalProduct } = stats;
  const { classes, theme } = useStyles();

  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <div className={classes.inner}>
        <div>
          <Text fz="xl" className={classes.label}>
            Sản phẩm
          </Text>
          <div>
            <Text className={classes.lead} mt={30}>
              {totalProduct}
            </Text>
            <Text fz="xs" color="dimmed">
              Tổng sản phẩm
            </Text>
          </div>
          <Group mt="lg">
            <div>
              <Text className={classes.label}>{totalActiveProduct}</Text>
              <Text size="xs" color="dimmed">
                Có sẵn
              </Text>
            </div>
          </Group>
        </div>

        <div className={classes.ring}>
          <RingProgress
            roundCaps
            thickness={6}
            size={150}
            sections={[{ value: (totalActiveProduct / totalProduct) * 100, color: theme.primaryColor }]}
            label={
              <div>
                <Text ta="center" fz="lg" className={classes.label}>
                  {((totalActiveProduct / totalProduct) * 100).toFixed(0)}%
                </Text>
                <Text ta="center" fz="xs" c="dimmed">
                  Đang hoạt động
                </Text>
              </div>
            }
          />
        </div>
      </div>
    </Card>
  );
}

export default ProductStats;
