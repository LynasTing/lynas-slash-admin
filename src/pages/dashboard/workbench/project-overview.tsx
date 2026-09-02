import { Card } from '@/ui/card';
import { Icon } from '@/components/icon';
import { Text, Title } from '@/ui/typography';
import { Chart, useChart } from '@/components/chart';
import Button from '@/ui/button';
import useLocale from '@/locales/use-locale';

/**
 * 项目概览
 * Project overview
 */
export function ProjectOverview() {
  const { t } = useLocale();

  const options = useChart({
    chart: { sparkline: { enabled: true } },
    grid: { show: false },
    yaxis: { show: false },
    tooltip: { enabled: false }
  });

  const seriesData = [10, 20, 15, 30, 25, 40, 35, 20];

  return (
    <Card className="flex flex-col gap-4 p-6 lg:col-span-2">
      <Text variant="body2" className="mb-2 font-semibold">
        {t('dashboard.projectOverview')}
      </Text>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Text variant="body2">{t('dashboard.totalTasks')}</Text>
          <Title as="h3" className="text-xl font-bold">
            34,686
          </Title>
        </div>
        <div>
          <Text variant="body2">{t('dashboard.pendingTasks')}</Text>
          <Title as="h3" className="text-xl font-bold">
            3,786
          </Title>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <Button className="w-48" size="sm" variant="default">
            <Icon icon="mid:plus" size={18} />
            {t('dashboard.addProject')}
          </Button>
        </div>
      </div>
      <div className="mt-4 h-16 w-full">
        <Chart
          type="line"
          height={60}
          options={options}
          series={[
            {
              data: seriesData,
              color: '#ef4444'
            }
          ]}
        />
      </div>
    </Card>
  );
}
