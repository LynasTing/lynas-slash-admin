import { useState } from 'react';
import useLocale from '@/locales/use-locale';
import { Badge } from '@/ui/badge';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { Label } from '@/ui/label';
import { Switch } from '@/ui/switch';
import CodeExample from '../components/code-example';

/**
 * 展示 Switch 的受控、初始和不可用状态。
 * Switch 表示即时生效的设置，因此每项演示都使用紧凑的设置行。
 *
 * Show Switch controlled, initial, and disabled states.
 * Switch represents an immediate setting, so every demo uses a compact setting row.
 */
export default function SwitchPage() {
  const { t } = useLocale();
  const prefix = 'ui.switch';
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="gap-0 rounded-none border-border py-0 shadow-none">
        <CardHeader className="gap-2 px-4 py-3 sm:px-5">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-xl tracking-tight sm:text-2xl">{t(`${prefix}.title`)}</CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-5">{t(`${prefix}.description`)}</CardDescription>
          </div>
          <CardAction>
            <Badge className="rounded-none">06</Badge>
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
        <CardContent className="space-y-3 px-4 py-4 sm:px-5">
          <div className="flex items-center gap-3">
            <Switch id="switch-controlled" checked={isEnabled} onCheckedChange={setIsEnabled} />
            <Label htmlFor="switch-controlled">{t(`${prefix}.controlled.label`)}</Label>
          </div>
          <CodeExample code={'<Switch checked={isEnabled} onCheckedChange={setIsEnabled} />'} />
        </CardContent>
      </Card>
      <Card className="rounded-none border-border shadow-none">
        <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
          <div>
            <CardTitle>{t(`${prefix}.defaultValue.title`)}</CardTitle>
            <CardDescription className="mt-2 leading-6">{t(`${prefix}.defaultValue.description`)}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 px-4 py-4 sm:px-5">
          <div className="flex items-center gap-3">
            <Switch id="switch-default" defaultChecked />
            <Label htmlFor="switch-default">{t(`${prefix}.defaultValue.label`)}</Label>
          </div>
          <CodeExample code={'<Switch defaultChecked />'} />
        </CardContent>
      </Card>
      <Card className="rounded-none border-border shadow-none">
        <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
          <div>
            <CardTitle>{t(`${prefix}.disabled.title`)}</CardTitle>
            <CardDescription className="mt-2 leading-6">{t(`${prefix}.disabled.description`)}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 px-4 py-4 sm:px-5">
          <div className="flex items-center gap-3">
            <Switch id="switch-disabled" disabled />
            <Label htmlFor="switch-disabled">{t(`${prefix}.disabled.label`)}</Label>
          </div>
          <CodeExample code={'<Switch disabled />'} />
        </CardContent>
      </Card>
    </div>
  );
}
