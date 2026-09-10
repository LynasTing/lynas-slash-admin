import { Card } from '@/ui/card';
import { Text } from '@/ui/typography';
import { Chart, useChart } from '@/components/chart';
import useLocale from '@/locales/use-locale';

/**
 * 收入明细项
 * Income detail item
 */
export interface IncomeDetail {
  /**
   * 标签
   * Label
   */
  label: string;

  /**
   * 数值
   * Value
   */
  value: number;
}

/**
 * 总收入数据类型
 * Total income data type
 */
export interface TotalIncome {
  /**
   * 图表系列数据
   * Chart series data
   */
  series: number[];

  /**
   * 标签列表
   * Labels for series
   */
  labels: string[];

  /**
   * 明细列表
   * Detail items
   */
  details: IncomeDetail[];
}

/**
 * 收入明细
 * Income breakdown
 */
export function IncomeBreakdown({ totalIncome }: { totalIncome: TotalIncome }) {
  const { t } = useLocale();

  const dountOptions = useChart({
    labels: totalIncome.labels,
    legend: { show: false },
    dataLabels: { enabled: false },
    plotOptions: { pie: { donut: { size: '70%' } } }
  });

  const dotColors = ['#3b82f6', '#f59e42', '#10b981', '#6366f1'];

  return (
    <Card className="flex flex-col p-6">
      <Text variant="body2" className="mb-2 font-semibold">
        {t('dashboard.totalIncome')}
      </Text>
      <div className="flex flex-1 flex-col items-center justify-center">
        <Chart type="donut" height={180} options={dountOptions} series={totalIncome.series} />
        <div className="mt-4 w-full">
          {totalIncome.details.map((item, index) => (
            <div className="mb-2 flex items-center justify-between" key={item.label}>
              <div className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: dotColors[index] }} />
                <Text variant="body2">{item.label}</Text>
              </div>
              <span className="font-bold">{item.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
