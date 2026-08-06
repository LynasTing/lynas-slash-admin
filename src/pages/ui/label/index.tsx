import useLocale from '@/locales/use-locale';
import { Badge } from '@/ui/badge';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import CodeExample from '../components/code-example';

/**
 * 展示 Label 与控件的显式关联和禁用样式。
 * 关联 id 让点击标签能将焦点交给对应控件。
 *
 * Shows explicit Label associations and disabled styling.
 * Matching ids let a label click transfer focus to its control.
 */
export default function LabelPage() {
  const { t } = useLocale();
  const prefix = 'ui.label';
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="gap-0 rounded-none border-border py-0 shadow-none">
        <CardHeader className="gap-2 px-4 py-3 sm:px-5">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-xl tracking-tight sm:text-2xl">{t(`${prefix}.title`)}</CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-5">{t(`${prefix}.description`)}</CardDescription>
          </div>
          <CardAction>
            <Badge className="rounded-none">18</Badge>
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
          <CardContent className="max-w-xl space-y-3 px-4 py-4 sm:px-5">
            <Label htmlFor="label-name">{t(`${prefix}.defaultValue.label`)}</Label>
            <Input id="label-name" placeholder={t(`${prefix}.defaultValue.placeholder`)} />
            <CodeExample code={'<Label htmlFor="label-name">Name</Label>\n<Input id="label-name" placeholder="Enter a name" />'} />
          </CardContent>
        </Card>
        <Card className="rounded-none border-border shadow-none">
          <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
            <div>
              <CardTitle>{t(`${prefix}.disabled.title`)}</CardTitle>
              <CardDescription className="mt-2 leading-6">{t(`${prefix}.disabled.description`)}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="max-w-xl space-y-2 px-4 py-4 sm:px-5">
            <Label htmlFor="label-disabled">{t(`${prefix}.disabled.label`)}</Label>
            <Input id="label-disabled" disabled value={t(`${prefix}.disabled.value`)} readOnly />
            <CodeExample code={'<Label htmlFor="label-disabled">Name</Label>\n<Input id="label-disabled" disabled readOnly />'} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
