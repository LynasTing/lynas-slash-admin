import { useState } from 'react';
import useLocale from '@/locales/use-locale';
import { Badge } from '@/ui/badge';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { Label } from '@/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';

const optionItems = ['small', 'medium', 'large'] as const;

/**
 * 展示 Select 的受控值、触发器尺寸和禁用状态。
 * Select 的关键行为是弹出选项与回填选中值，因此每个演示保留完整的 Root、Trigger 和 Content 结构。
 *
 * Show Select controlled value, trigger sizes, and disabled state.
 * Select relies on opening options and reflecting selection, so each demo keeps the full Root, Trigger, and Content structure.
 */
export default function SelectPage() {
  const { t } = useLocale();
  const prefix = 'ui.select';
  const [value, setValue] = useState('medium');

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="gap-0 rounded-none border-border py-0 shadow-none">
        <CardHeader className="gap-2 px-4 py-3 sm:px-5">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-xl tracking-tight sm:text-2xl">{t(`${prefix}.title`)}</CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-5">{t(`${prefix}.description`)}</CardDescription>
          </div>
          <CardAction>
            <Badge className="rounded-none">05</Badge>
          </CardAction>
        </CardHeader>
      </Card>
      <Card className="rounded-none border-border shadow-none">
        <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
          <div>
            <CardTitle>{t(`${prefix}.controlled.title`)}</CardTitle>
            <CardDescription className="mt-2 leading-6">{t(`${prefix}.controlled.description`)}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-4 py-4 sm:px-5">
          <div className="max-w-xl space-y-2">
            <Label htmlFor="select-controlled">{t(`${prefix}.label`)}</Label>
            <Select value={value} onValueChange={setValue}>
              <SelectTrigger id="select-controlled" className="w-full">
                <SelectValue placeholder={t(`${prefix}.placeholder`)} />
              </SelectTrigger>
              <SelectContent>
                {/* 选项集中维护，避免受控示例与尺寸示例出现不同的可选值。\n\nOptions are centralized so controlled and size examples cannot drift apart. */}
                {optionItems.map(item => (
                  <SelectItem key={item} value={item}>
                    {t(`${prefix}.options.${item}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      <Card className="rounded-none border-border shadow-none">
        <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
          <div>
            <CardTitle>{t(`${prefix}.sizes.title`)}</CardTitle>
            <CardDescription className="mt-2 leading-6">{t(`${prefix}.sizes.description`)}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-4 py-4 sm:px-5">
          <div className="max-w-xl space-y-3">
            <Select defaultValue="small">
              <SelectTrigger size="sm" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">{t(`${prefix}.options.small`)}</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="large">
              <SelectTrigger size="lg" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="large">{t(`${prefix}.options.large`)}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      <Card className="rounded-none border-border shadow-none">
        <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
          <div>
            <CardTitle>{t(`${prefix}.disabled.title`)}</CardTitle>
            <CardDescription className="mt-2 leading-6">{t(`${prefix}.disabled.description`)}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-4 py-4 sm:px-5">
          <Select defaultValue="medium" disabled>
            <SelectTrigger className="w-full max-w-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="medium">{t(`${prefix}.options.medium`)}</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  );
}
