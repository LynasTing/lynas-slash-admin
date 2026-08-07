import useLocale from '@/locales/use-locale';
import { Badge } from '@/ui/badge';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { Label } from '@/ui/label';
import { Textarea } from '@/ui/textarea';
import CodeExample from '../components/code-example';

export default function TextareaPage() {
  const { t } = useLocale();
  const prefix = 'ui.textarea';
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="gap-0 rounded-none border-border py-0 shadow-none">
        <CardHeader className="gap-2 px-4 py-3 sm:px-5">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-xl tracking-tight sm:text-2xl">{t(`${prefix}.title`)}</CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-5">{t(`${prefix}.description`)}</CardDescription>
          </div>
          <CardAction>
            <Badge className="rounded-none">27</Badge>
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
            <div className="max-w-xl space-y-2">
              <Label htmlFor="textarea-default">{t(`${prefix}.defaultValue.label`)}</Label>
              <Textarea id="textarea-default" placeholder={t(`${prefix}.defaultValue.placeholder`)} />
            </div>
            <CodeExample
              code={`<div className="max-w-xl space-y-2">
  <Label htmlFor="textarea-default">Message</Label>
  <Textarea id="textarea-default" placeholder="Write a message" />
</div>`}
            />
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
            <Textarea value={t(`${prefix}.disabled.value`)} disabled readOnly />
            <CodeExample code={'<Textarea value="Currently unavailable" disabled readOnly />'} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
