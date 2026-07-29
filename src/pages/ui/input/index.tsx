import useLocale from '@/locales/use-locale';
import { Badge } from '@/ui/badge';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';

/**
 * 展示 Input 的文本、原生类型和禁用状态。
 * 每个分组保持真实表单字段结构，便于观察 Label、Input 与状态的组合方式。
 *
 * Show Input text, native types, and disabled state.
 * Each group keeps a real form field structure to demonstrate how Label, Input, and states work together.
 */
export default function InputPage() {
  const { t } = useLocale();
  const prefix = 'ui.input';

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="gap-0 rounded-none border-border py-0 shadow-none">
        <CardHeader className="gap-2 px-4 py-3 sm:px-5">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-xl tracking-tight sm:text-2xl">{t(`${prefix}.title`)}</CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-5">{t(`${prefix}.description`)}</CardDescription>
          </div>
          <CardAction>
            <Badge className="rounded-none">04</Badge>
          </CardAction>
        </CardHeader>
      </Card>
      <Card className="rounded-none border-border shadow-none">
        <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
          <div>
            <CardTitle>{t(`${prefix}.defaultValue.title`)}</CardTitle>
            <CardDescription className="mt-2 leading-6">{t(`${prefix}.defaultValue.description`)}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-4 py-4 sm:px-5">
          <div className="max-w-xl space-y-2">
            <Label htmlFor="input-default">{t(`${prefix}.label`)}</Label>
            <Input id="input-default" placeholder={t(`${prefix}.defaultValue.placeholder`)} />
          </div>
        </CardContent>
      </Card>
      <Card className="rounded-none border-border shadow-none">
        <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
          <div>
            <CardTitle>{t(`${prefix}.types.title`)}</CardTitle>
            <CardDescription className="mt-2 leading-6">{t(`${prefix}.types.description`)}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-4 py-4 sm:px-5">
          <div className="max-w-xl space-y-3">
            <Input type="email" placeholder={t(`${prefix}.types.email`)} />
            <Input type="password" placeholder={t(`${prefix}.types.password`)} />
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
          <div className="max-w-xl space-y-2">
            <Label htmlFor="input-disabled">{t(`${prefix}.label`)}</Label>
            <Input id="input-disabled" value={t(`${prefix}.disabled.value`)} disabled readOnly />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
