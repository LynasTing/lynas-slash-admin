import { Card, CardContent, CardAction } from '@/ui/card';
import { AnalysisTitle } from './components/analysis-title';
import Button from '@/ui/button';
import { Icon } from '@/components/icon';
import { Text } from '@/ui/typography';
import { cn } from '@/utils';
import Trend from './components/trend';
import Progress from '@/ui/progress';
import useLocale from '@/locales/use-locale';

/**
 * 流量来源统计项
 * Traffic source statistics
 */
export interface TrafficDataProps {
  /**
   * 来源名称
   * Source name
   */
  source: string;

  /**
   * 访问量
   * Number of visits
   */
  visits: number;

  /**
   * 独立访客数
   * Unique visitors
   */
  unique: number;

  /**
   * 跳出率（百分比）
   * Bounce rate (percentage)
   */
  bounce: number;

  /**
   * 平均停留时长
   * Average session duration
   */
  duration: string;

  /**
   * 进度值（用于进度条展示）
   * Progress value (for progress bar display)
   */
  progress: number;
}

export function TrafficData({ trafficData }: { trafficData: TrafficDataProps[] }) {
  const { t } = useLocale();
  const titles = [
    { label: t('dashboard.trafficData.source'), className: 'text-left' },
    { label: t('dashboard.trafficData.visits'), className: 'text-right' },
    { label: t('dashboard.trafficData.uniqueVisitors'), className: 'text-right' },
    { label: t('dashboard.trafficData.bounceRate'), className: 'text-right' },
    { label: t('dashboard.trafficData.avgSessionDuration'), className: 'text-right' },
    { label: t('dashboard.trafficData.progressToGoal'), className: 'text-left' }
  ];

  if (!trafficData.length) return null;

  return (
    <Card>
      <AnalysisTitle title={t('dashboard.trafficData.title')}>
        <CardAction>
          <Button size="sm" variant="outline" className="flex space-x-1">
            <Icon icon="mdi:download" size={20} />
            <Text>{t('common.exportData')}</Text>
          </Button>
        </CardAction>
      </AnalysisTitle>
      <CardContent>
        <table className="w-full text-sm">
          <thead>
            <tr>
              {titles.map(item => (
                <th key={item.label} className={cn('p-2', item.className)}>
                  {item.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {trafficData.map(item => (
              <tr key={item.source} className="border-t">
                <td className="p-2">{item.source}</td>
                <td className="p-2 text-right">{item.visits.toLocaleString()}</td>
                <td className="p-2 text-right">{item.unique.toLocaleString()}</td>
                <td className="p-2 text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <Trend value={item.bounce} />
                  </div>
                </td>
                <td className="p-2 text-right">{item.duration}</td>
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    <Progress value={item.progress} />
                    <span className="text-xs ml-2 align-middle">{item.progress}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
