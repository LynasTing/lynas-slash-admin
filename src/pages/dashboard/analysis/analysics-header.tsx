import { Title, Text } from '@/ui/typography';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';
import { type TimeRange, timeOptions } from './types';
import useLocale from '@/locales/use-locale';

type AnalysisHeaderProps = {
  /**
   * 当前时间类型
   * Current time type
   */
  timeType: TimeRange;

  /**
   * 设置时间类型
   * Set time type
   */
  setTimeType: (v: TimeRange) => void;
};

// 时间选项（Select 数据源）/ Time options (data source for Select)
const options = timeOptions;

export default function AnalyticsHeader({ timeType, setTimeType }: AnalysisHeaderProps) {
  const { t } = useLocale();
  return (
    <div className="flex flex-col gap-4 border-none shadow-none md:flex-row md:items-center md:justify-between">
      <div>
        <Title as="h4" className="mb-1 text-xl">
          {t('dashboard.analyticsOverview')}
        </Title>
        <Text variant="body2" className="text-muted-foreground">
          {t('dashboard.analyticsOverviewDescription')}
        </Text>
      </div>
      <div className="flex items-center gap-2">
        <Text variant="body2" className="text-muted-foreground">
          {t('dashboard.showBy')}
        </Text>
        <Select value={timeType} onValueChange={(v: TimeRange) => setTimeType(v)}>
          <SelectTrigger className="h-9 w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options.map(opt => (
              <SelectItem key={opt.value} value={opt.value}>
                {t(opt.label)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
