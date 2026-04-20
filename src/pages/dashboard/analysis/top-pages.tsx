import { Card, CardContent, CardAction } from '@/ui/card';
import { Text } from '@/ui/typography';
import { Icon } from '@/components/icon';
import Button from '@/ui/button';
import Trend from './components/trend';
import { AnalysisTitle } from './components/analysis-title';
import useLocale from '@/locales/use-locale';

/**
 * 单条页面统计数据
 * Single page statistics
 */
export type TopPagesProps = {
  /**
   * 页面地址
   * Page URL
   */
  url: string;

  /**
   * 浏览量
   * Page views
   */
  views: number;

  /**
   * 浏览量变化
   * Page views change
   */
  viewsChange: number;

  /**
   * 独立访客数
   * Unique visitors
   */
  unique: number;

  /**
   * 独立访客变化
   * Unique visitors change
   */
  uniqueChange: number;
};

export function TopPages({ topPages }: { topPages: TopPagesProps[] }) {
  const { t } = useLocale();

  if (!topPages.length) return null;

  return (
    <Card className="col-span-12 md:col-span-6 xl:col-span-4">
      <AnalysisTitle title={t('dashboard.topPages.title')}>
        <CardAction>
          <Button size="sm" variant="outline" className="flex space-x-1">
            <Icon icon="mdi:download" size={20} />
            <Text>{t('common.exportData')}</Text>
          </Button>
        </CardAction>
      </AnalysisTitle>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="py-1 text-left">{t('dashboard.pageUrl')}</th>
                <th className="py-1 text-right">{t('dashboard.views')}</th>
                <th className="py-1 text-right">{t('dashboard.uniqueVisitors')}</th>
              </tr>
            </thead>
            <tbody>
              {topPages.map(item => (
                <tr key={item.url} className="border-t">
                  <td className="text-left py-2">{item.url}</td>
                  <td className="py-2">
                    <div className="flex justify-end items-center gap-2">
                      {item.views.toLocaleString()}
                      <Trend value={item.viewsChange} />
                    </div>
                  </td>
                  <td className="py-2">
                    <div className="flex justify-end items-center gap-2">
                      {item.unique} <Trend value={item.uniqueChange} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
