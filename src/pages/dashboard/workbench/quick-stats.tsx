import { Card, CardContent } from '@/ui/card';
import { Icon } from '@/components/icon';
import { cn, rgbAlpha } from '@/utils';
import { Text, Title } from '@/ui/typography';
import { Chart, useChart } from '@/components/chart';
import { useMemo } from 'react';

/**
 * 快捷统计卡片数据类型
 * Quick stats card data type
 */
export interface QuickStatProps {
  /**
   * 图标名称（Iconify）
   * Icon name
   */
  icon: string;

  /**
   * 标题
   * Label text
   */
  label: string;

  /**
   * 展示值（已格式化）
   * Display value (formatted)
   */
  value: string;

  /**
   * 增长百分比（可正可负）
   * Percentage change (positive or negative)
   */
  percent: number;

  /**
   * 主题颜色
   * Theme color
   */
  color: string;

  /**
   * 迷你图表数据
   * Sparkline chart data
   */
  chart: number[];
}

export function QuickStats({ data }: { data: QuickStatProps[] }) {
  /**
   * 调用自定义 Hook 获取基础图表配置
   * 这里是顶层 Hook 调用，保证 React Hook 规则不报错
   *
   * Call custom hook to get base chart options
   * This is the top-level hook call, ensuring React Hook rules do not report errors
   */
  const base = useChart({
    chart: { sparkline: { enabled: true } },
    grid: { show: false },
    yaxis: { show: false },
    tooltip: { enabled: false }
  });

  /**
   * 为每个 data item 生成独立的图表 options
   * 使用 useMemo 缓存，避免每次渲染都重新生成对象
   *
   * Generate separate chart options for each data item
   * Use useMemo to cache, avoiding re-generation of objects on each render
   */
  const options = useMemo(
    () =>
      data.map(item => ({
        ...base,
        colors: [item.color]
      })),
    [data, base]
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((item, index) => (
        <Card key={item.label} className="flex flex-col justify-between h-full">
          <CardContent className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg" style={{ backgroundColor: rgbAlpha(item.color, 0.1) }}>
                <Icon icon={item.icon} size={24} color={item.color} />
              </div>
              <Text variant="body2" className="font-semibold">
                {item.label}
              </Text>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Title as="h3" className="text-2xl font-bold">
                {item.value}
              </Title>
              <span
                className={cn(
                  'flex items-center gap-1 text-xs font-bold',
                  item.percent > 0 && 'text-green-500',
                  item.percent < 0 && 'text-red-500'
                )}>
                {item.percent !== 0 && (
                  <>
                    <Icon icon={item.percent > 0 ? 'mdi:arrow-up' : 'mdi:arrow-down'} size={16} />
                    {Math.abs(item.percent)}%
                  </>
                )}
                {item.percent === 0 && item.label === 'Total Task' && 'New'}
              </span>
            </div>
            <div className="w-full h-10 mt-2">
              <Chart type="bar" height={40} options={options[index]} series={[{ data: item.chart }]} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
