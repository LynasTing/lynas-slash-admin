import { Card, CardContent } from '@/ui/card';
import { Icon } from '@/components/icon';
import { Text } from '@/ui/typography';
import { Chart, useChart } from '@/components/chart';
import useLocale from '@/locales/use-locale';

/**
 * 月度收入数据类型
 * Monthly revenue data type
 */
export interface MonthlyRevenueData {
  /**
   * 图表系列数据
   * Chart series data
   */
  series: {
    /**
     * 系列名称
     * Series name
     */
    name: string;
    /**
     * 数据数组
     * Array of numbers representing data points
     */
    data: number[];
  }[];
  /**
   * 类别，即月份
   * Categories, representing months
   */
  // categories: Array<'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec'>;
  categories: string[];
  /**
   * 增长百分比
   * Growth percentage
   */
  percent: number;
}

/**
 * 月度收入
 * Monthly revenue
 */
export function MonthlyRevenue({ monthlyRevenue }: { monthlyRevenue: MonthlyRevenueData }) {
  const { t } = useLocale();

  const chartOptions = useChart({
    xaxis: { categories: monthlyRevenue.categories },
    chart: { toolbar: { show: false } },
    grid: { show: false },
    stroke: { curve: 'smooth' },
    dataLabels: { enabled: false },
    yaxis: { show: false },
    legend: { show: false }
  });

  return (
    <Card className="lg:col-span-2">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-2">
          <Text variant="body2" className="font-semibold">
            {t('dashboard.monthlyRevenue')}
          </Text>
          <span className=" items-center gap-1 text-green-500 font-bold text-sm">
            <Icon icon="mdi:arrow-up" size={16} />
            {monthlyRevenue.percent}%
          </span>
        </div>
        <Chart type="area" height={220} series={monthlyRevenue.series} options={chartOptions} />
      </CardContent>
    </Card>
  );
}
