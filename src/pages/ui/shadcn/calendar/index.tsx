import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import useLocale from '@/locales/use-locale';
import { Badge } from '@/ui/badge';
import { Calendar } from '@/ui/calendar';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import CodeExample from '../components/code-example';

/**
 * 展示 Calendar 的单日与日期范围选择。
 * 两个实例分别保留独立状态，避免不同选择模式互相覆盖。
 *
 * Shows Calendar single-date and date-range selection.
 * The two examples keep independent state so their selection modes cannot overwrite each other.
 */
export default function CalendarPage() {
  const { locale, t } = useLocale();
  const prefix = 'ui.calendar';
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedRange, setSelectedRange] = useState<DateRange>();
  const dateLocale = locale === 'zh_CN' ? 'zh-CN' : 'en-US';

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="gap-0 rounded-none border-border py-0 shadow-none">
        <CardHeader className="gap-2 px-4 py-3 sm:px-5">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-xl tracking-tight sm:text-2xl">{t(`${prefix}.title`)}</CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-5">{t(`${prefix}.description`)}</CardDescription>
          </div>
          <CardAction>
            <Badge className="rounded-none">09</Badge>
          </CardAction>
        </CardHeader>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        <Card className="rounded-none border-border shadow-none">
          <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
            <div>
              <CardTitle>{t(`${prefix}.single.title`)}</CardTitle>
              <CardDescription className="mt-2 leading-6">{t(`${prefix}.single.description`)}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 overflow-x-auto px-4 py-4 sm:px-5">
            <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="mx-auto w-fit" />
            <p className="mt-3 text-sm text-muted-foreground">
              {selectedDate ? selectedDate.toLocaleDateString(dateLocale) : t(`${prefix}.single.empty`)}
            </p>
            <CodeExample code={'<Calendar mode="single" selected={date} onSelect={setDate} />'} />
          </CardContent>
        </Card>

        <Card className="rounded-none border-border shadow-none">
          <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
            <div>
              <CardTitle>{t(`${prefix}.range.title`)}</CardTitle>
              <CardDescription className="mt-2 leading-6">{t(`${prefix}.range.description`)}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 overflow-x-auto px-4 py-4 sm:px-5">
            <Calendar mode="range" selected={selectedRange} onSelect={setSelectedRange} numberOfMonths={1} className="mx-auto w-fit" />
            <p className="mt-3 text-sm text-muted-foreground">
              {selectedRange?.from
                ? `${selectedRange.from.toLocaleDateString(dateLocale)}${selectedRange.to ? ` – ${selectedRange.to.toLocaleDateString(dateLocale)}` : ''}`
                : t(`${prefix}.range.empty`)}
            </p>
            <CodeExample code={'<Calendar mode="range" selected={range} onSelect={setRange} />'} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
