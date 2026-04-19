import { Card, CardContent, CardAction } from '@/ui/card';
import { Text, Title } from '@/ui/typography';
import { Icon } from '@/components/icon';
import Trend from './components/trend';
import { cn } from '@/utils';
import { AnalysisTitle } from './components/analysis-title';

export interface MetricItem {
  /**
   * 当前指标数值
   * metric value
   */
  value: number | string;

  /**
   * 趋势变化值（正负表示涨跌）
   * change value (positive or negative)
   */
  change: number;

  /**
   * 辅助说明文案
   * helper text
   */
  tip: string;
}

/**
 * 指标卡片组件 Props 定义
 * props definition for metric card component
 */
export interface MetricCardProps {
  /**
   * 卡片标题
   * card title
   */
  title: string;

  /**
   * 图标背景色（Tailwind 类名）
   * icon background color (Tailwind class)
   */
  bgColor: string;

  /**
   * 图标名称（Iconify）
   * icon name (Iconify)
   */
  icon: string;

  /**
   * 不同时间维度的指标数据 / metrics by time period
   */
  metrics: MetricItem;
}

export function MetricCard({ metricCard }: { metricCard: MetricCardProps }) {
  if (!metricCard) {
    return null;
  }

  return (
    <Card className="flex-1">
      <AnalysisTitle title={metricCard.title}>
        <CardAction className={cn('flex justify-center items-center w-10 h-10 rounded-full', metricCard.bgColor)}>
          <Icon icon={metricCard.icon} size={20} color="black" />
        </CardAction>
      </AnalysisTitle>
      <CardContent>
        <Title as="h3" className="text-xl">
          {metricCard.metrics.value.toLocaleString()}
        </Title>
        <div className="flex flex-row items-center gap-2">
          <Trend value={metricCard.metrics.change} />
          <Text variant="caption" className="flex items-center text-muted-foreground">
            {metricCard.metrics.tip}
          </Text>
        </div>
      </CardContent>
    </Card>
  );
}
