import { useState } from 'react';
import useLocale from '@/locales/use-locale';
import { Badge } from '@/ui/badge';
import Button from '@/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import Progress from '@/ui/progress';
import CodeExample from '../components/code-example';

/**
 * 展示 Progress 的静态进度与受控进度变化。
 * 操作每次增加固定步长，达到上限后回到起点，便于重复检查动画。
 *
 * Shows Progress static values and controlled progress changes.
 * Each action advances a fixed step and returns to the start at the limit so the animation can be checked repeatedly.
 */
export default function ProgressPage() {
  const { t } = useLocale();
  const prefix = 'ui.progress';
  const [value, setValue] = useState(25);
  const handleAdvance = () => setValue(currentValue => (currentValue >= 100 ? 0 : currentValue + 25));
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="gap-0 rounded-none border-border py-0 shadow-none">
        <CardHeader className="gap-2 px-4 py-3 sm:px-5">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-xl tracking-tight sm:text-2xl">{t(`${prefix}.title`)}</CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-5">{t(`${prefix}.description`)}</CardDescription>
          </div>
          <CardAction>
            <Badge className="rounded-none">20</Badge>
          </CardAction>
        </CardHeader>
      </Card>
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        <Card className="rounded-none border-border shadow-none">
          <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
            <div>
              <CardTitle>{t(`${prefix}.defaultValue.title`)}</CardTitle>
              <CardDescription className="mt-2 leading-6">{t(`${prefix}.defaultValue.description`)}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 px-4 py-4 sm:px-5">
            <Progress value={60} aria-label={t(`${prefix}.defaultValue.label`)} />
            <span className="text-sm text-muted-foreground">60%</span>
            <CodeExample code={'<Progress value={60} aria-label="Completion progress" />'} />
          </CardContent>
        </Card>
        <Card className="rounded-none border-border shadow-none">
          <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
            <div>
              <CardTitle>{t(`${prefix}.controlled.title`)}</CardTitle>
              <CardDescription className="mt-2 leading-6">{t(`${prefix}.controlled.description`)}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 px-4 py-4 sm:px-5">
            <Progress value={value} aria-label={t(`${prefix}.controlled.label`, { value })} />
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-muted-foreground">{value}%</span>
              <Button variant="outline" size="sm" onClick={handleAdvance}>
                {t(`${prefix}.controlled.action`)}
              </Button>
            </div>
            <CodeExample code={'<Progress value={value} />'} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
