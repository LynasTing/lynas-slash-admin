import { Card, CardHeader, CardTitle, CardContent } from '@/ui/card';
import { Title, Text } from '@/ui/typography';
import { Icon } from '@/components/icon';
import { Chart } from '@/components/chart/chart';
import { useChart } from '@/components/chart/use-chart';
import useLocale from '@/locales/use-locale';

/**
 * 设备统计项 / device statistics
 */
export interface DeviceStatProps {
  /**
   * 标签名称 / display label
   */
  label: string;

  /**
   * 数值占比 / percentage value
   */
  value: number;

  /**
   * 颜色值 / chart color
   */
  color: string;

  /**
   * 图标名称 / icon identifier
   */
  icon: string;
}

export function SessionDevices({ sessionDevices }: { sessionDevices: DeviceStatProps[] }) {
  const { t } = useLocale();
  const chartOptions = useChart({
    labels: sessionDevices.map(item => item.label),
    stroke: {
      show: false
    },
    legend: {
      show: false
    },
    tooltip: {
      fillSeriesColor: false
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%'
        }
      }
    }
  });
  if (!sessionDevices?.length) {
    return null;
  }
  return (
    <Card className="col-span-12 md:col-span-6 xl:col-span-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>
          <Title as="h3" className="text-lg">
            {t('dashboard.sessionDevices.title')}
          </Title>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-2">
          <div className="w-full max-w-[180px]">
            <Chart type="donut" height={320} options={chartOptions} series={sessionDevices.map(i => i.value)} />
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-2">
          {sessionDevices.map(item => (
            <div key={item.label} className="flex flex-col items-center gap-y-1">
              <Icon icon={item.icon} size={20} color={item.color} />
              <Text variant="body2">{item.label}</Text>
              <Text variant="body2" className="font-bold">
                {item.value}%
              </Text>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
