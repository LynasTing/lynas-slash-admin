import { Card, CardContent } from '@/ui/card';
import { Title, Text } from '@/ui/typography';
import Trend from './components/trend';
import { Chart } from '@/components/chart/chart';
import { useChart } from '@/components/chart/use-chart';
import { AnalysisTitle } from './components/analysis-title';
import useLocale from '@/locales/use-locale';

/**
 * 流量来源类型
 * Traffic source type
 *
 * @description
 * 用于约束图表中数据来源的名称，防止拼写错误导致图表异常
 * Used to constrain traffic source names and prevent typos from breaking charts
 */
export type TrafficSource = string;

/**
 * Web 网站分析数据结构（适用于 day / month / year）
 * Web analytics data structure (suitable for day / month / year)
 */
export interface WebAnalyticsProps {
  /**
   * 页面浏览量（PV）
   * Total page views (PV)
   */
  pageViews: number;

  /**
   * 页面浏览量变化（百分比，如 4.2 表示 +4.2%）
   * Page views change (percentage, e.g. 4.2 means +4.2%)
   */
  pageViewsChange: number;

  /**
   * 平均停留时间（展示用字符串，如 "3m 16s"）
   * Average session duration (formatted string, e.g. "3m 16s")
   */
  avgTime: string;

  /**
   * 平均停留时间变化（百分比）
   * Average session duration change (percentage)
   */
  avgTimeChange: number;

  /**
   * 图表数据配置
   * Chart configuration data
   */
  chart: {
    /**
     * 折线数据集合
     * Line series collection
     */
    series: {
      /**
       * 数据来源名称
       * Traffic source name
       */
      name: TrafficSource;

      /**
       * 对应每个分类的数值
       * Data points aligned with categories
       */
      data: number[];
    }[];

    /**
     * 横轴分类（通常是日期）
     * X-axis categories (usually dates)
     */
    categories: string[];
  };
}

export function WebAnalysis({ webAnalytic }: { webAnalytic: WebAnalyticsProps }) {
  const { t } = useLocale();
  const chartOptions = useChart({
    xaxis: { categories: webAnalytic?.chart?.categories }
  });

  if (!webAnalytic) {
    return null;
  }

  return (
    <Card className="col-span-4 xl:col-span-3">
      <AnalysisTitle title={t('dashboard.webAnalysis.title')} />
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center flex-wrap gap-6">
          <div>
            <Text variant="subTitle2" className="text-muted-foreground">
              {t('dashboard.webAnalysis.pageViews')}
            </Text>
            <div className="flex items-end gap-2">
              <Title as="h3" className="text-2xl">
                {webAnalytic.pageViews.toLocaleString()}
              </Title>
              <Trend value={webAnalytic.pageViewsChange} />
            </div>
          </div>
          <div>
            <Text variant="subTitle2" className="text-muted-foreground">
              {t('dashboard.webAnalysis.avgTimeOnPage')}
            </Text>
            <div className="flex items-end gap-2">
              <Title as="h3" className="text-2xl">
                {webAnalytic.avgTime}
              </Title>
              <Trend value={webAnalytic.avgTimeChange} />
            </div>
          </div>
        </div>
        <div className="w-full min-h-[200px] mt-2">
          <Chart type="line" height={320} options={chartOptions} series={webAnalytic.chart.series} />
        </div>
      </CardContent>
    </Card>
  );
}
