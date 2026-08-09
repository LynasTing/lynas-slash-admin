import useLocale from '@/locales/use-locale';
import { Badge } from '@/ui/badge';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import Separator from '@/ui/separator';
import CodeExample from '../components/code-example';

export default function SeparatorPage() {
  const { t } = useLocale();
  const prefix = 'ui.separator';
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="gap-0 rounded-none border-border py-0 shadow-none">
        <CardHeader className="gap-2 px-4 py-3 sm:px-5">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-xl tracking-tight sm:text-2xl">{t(`${prefix}.title`)}</CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-5">{t(`${prefix}.description`)}</CardDescription>
          </div>
          <CardAction>
            <Badge className="rounded-none">23</Badge>
          </CardAction>
        </CardHeader>
      </Card>
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        <Card className="rounded-none border-border shadow-none">
          <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
            <div>
              <CardTitle>{t(`${prefix}.horizontal.title`)}</CardTitle>
              <CardDescription className="mt-2 leading-6">{t(`${prefix}.horizontal.description`)}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 px-4 py-4 sm:px-5">
            <div className="space-y-3">
              <p className="text-sm">{t(`${prefix}.horizontal.first`)}</p>
              <Separator />
              <p className="text-sm">{t(`${prefix}.horizontal.second`)}</p>
            </div>
            <CodeExample
              code={`<div className="space-y-3">
  <p className="text-sm">Content above</p>
  <Separator />
  <p className="text-sm">Content below</p>
</div>`}
            />
          </CardContent>
        </Card>
        <Card className="rounded-none border-border shadow-none">
          <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
            <div>
              <CardTitle>{t(`${prefix}.vertical.title`)}</CardTitle>
              <CardDescription className="mt-2 leading-6">{t(`${prefix}.vertical.description`)}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 px-4 py-4 sm:px-5">
            <div className="flex h-10 items-center gap-3 text-sm">
              <span>{t(`${prefix}.vertical.first`)}</span>
              <Separator orientation="vertical" />
              <span>{t(`${prefix}.vertical.second`)}</span>
            </div>
            <CodeExample
              code={`<div className="flex h-10 items-center gap-3 text-sm">
  <span>Left content</span>
  <Separator orientation="vertical" />
  <span>Right content</span>
</div>`}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
