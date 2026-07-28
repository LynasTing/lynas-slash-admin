import { useState } from 'react';
import useLocale from '@/locales/use-locale';
import { Badge } from '@/ui/badge';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { Checkbox } from '@/ui/checkbox';
import { Label } from '@/ui/label';

/**
 * 展示 Checkbox 的选中、未选中与不可用状态。
 *
 * Show Checkbox checked, unchecked, and disabled states.
 */
export default function CheckboxPage() {
  const { t } = useLocale();
  const prefix = 'ui.checkbox';
  const [isChecked, setIsChecked] = useState(false);

  /**
   * 将 Radix 的三态值转换为页面演示所需的布尔状态。
   * indeterminate 不属于本页的展示范围，因此按未选中处理。
   *
   * Convert Radix's tri-state value to the boolean state needed by this page.
   * Indeterminate is outside this page's scope, so it is treated as unchecked.
   */
  const handleCheckedChange = (checked: boolean | 'indeterminate') => setIsChecked(checked === true);

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="gap-0 rounded-none border-border py-0 shadow-none">
        <CardHeader className="gap-2 px-4 py-3 sm:px-5">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-xl tracking-tight sm:text-2xl">{t(`${prefix}.title`)}</CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-5">{t(`${prefix}.description`)}</CardDescription>
          </div>
          <CardAction>
            <Badge className="rounded-none">03</Badge>
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
          <div className="flex items-center gap-3">
            <Checkbox id="checkbox-controlled" checked={isChecked} onCheckedChange={handleCheckedChange} />
            <Label htmlFor="checkbox-controlled">{t(`${prefix}.controlled.label`)}</Label>
          </div>
        </CardContent>
      </Card>
      <Card className="rounded-none border-border shadow-none">
        <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
          <div>
            <CardTitle>{t(`${prefix}.defaultValue.title`)}</CardTitle>
            <CardDescription className="mt-2 leading-6">{t(`${prefix}.defaultValue.description`)}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-4 py-4 sm:px-5">
          <div className="flex items-center gap-3">
            <Checkbox id="checkbox-default" defaultChecked />
            <Label htmlFor="checkbox-default">{t(`${prefix}.defaultValue.label`)}</Label>
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
          <div className="flex items-center gap-3">
            <Checkbox id="checkbox-disabled" disabled />
            <Label htmlFor="checkbox-disabled">{t(`${prefix}.disabled.label`)}</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
