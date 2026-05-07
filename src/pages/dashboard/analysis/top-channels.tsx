import { Text, Title } from '@/ui/typography';
import { Card, CardContent, CardAction } from '@/ui/card';
import Button from '@/ui/button';
import { Icon } from '@/components/icon';
import { AnalysisTitle } from './components/analysis-title';
import Trend from './components/trend';
import useLocale from '@/locales/use-locale';
import { useMemo } from 'react';

export type TopChannelItem = {
  /**
   * 图标标识
   * Icon identifier
   */
  icon: string;

  /**
   * 渠道名称
   * Channel name
   */
  name: string;

  /**
   * 占比百分比
   * Percentage value
   */
  percent: number;

  /**
   * 总数
   * Total count
   */
  total: number;
};

export interface TopChannelProps {
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

  channels: TopChannelItem[];
}

export function TopChannels({ topChannels }: { topChannels: TopChannelProps }) {
  const { t } = useLocale();

  const total = useMemo(() => topChannels.channels?.reduce((p, n) => p + n.total, 0), [topChannels?.channels]);

  if (!topChannels) return null;

  return (
    <Card className="col-span-12 xl:col-span-4">
      <AnalysisTitle title={t('dashboard.topChannels.title')}>
        <CardAction>
          <Button size="sm" variant="outline" className="flex space-x-1">
            <Icon icon="mdi:download" size={20} />
            <Text>{t('common.exportData')}</Text>
          </Button>
        </CardAction>
      </AnalysisTitle>
      <CardContent>
        <div className="flex items-center gap-4 mb-2">
          <Title as="h3" className="text-xl">
            {total.toLocaleString()}
          </Title>
          <div className="flex items-center gap-2">
            <Trend value={topChannels.change} />
            <Text variant="caption" className="flex items-center text-muted-foreground">
              {t(topChannels.tip)}
            </Text>
          </div>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left py-1">{t('dashboard.topChannels.channel')}</th>
              <th className="text-right py-1">{t('dashboard.topChannels.views')}</th>
              <th className="text-right py-1">{t('dashboard.topChannels.percent')}</th>
            </tr>
          </thead>
          <tbody>
            {topChannels.channels.map((item, index) => (
              <tr key={`${item.name}-${index}`} className="border-t">
                <td className="py-2">
                  <div className="flex items-center gap-2">
                    <Icon icon={item.icon} size={18} />
                    <span>{item.name}</span>
                  </div>
                </td>
                <td className="py-2 text-right">{item.percent}%</td>
                <td className="py-2 text-right">{item.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
