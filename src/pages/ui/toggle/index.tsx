import { useState } from 'react';
import { Bold, Italic } from 'lucide-react';
import useLocale from '@/locales/use-locale';
import { Badge } from '@/ui/badge';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { Toggle } from '@/ui/toggle';
import CodeExample from '../components/code-example';

export default function TogglePage() {
  const { t } = useLocale();
  const prefix = 'ui.toggle';
  const [pressed, setPressed] = useState(false);
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="gap-0 rounded-none border-border py-0 shadow-none">
        <CardHeader className="gap-2 px-4 py-3 sm:px-5">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-xl tracking-tight sm:text-2xl">{t(`${prefix}.title`)}</CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-5">{t(`${prefix}.description`)}</CardDescription>
          </div>
          <CardAction>
            <Badge className="rounded-none">28</Badge>
          </CardAction>
        </CardHeader>
      </Card>
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        <Card className="rounded-none border-border shadow-none">
          <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
            <div>
              <CardTitle>{t(`${prefix}.controlled.title`)}</CardTitle>
              <CardDescription className="mt-2 leading-6">{t(`${prefix}.controlled.description`)}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 px-4 py-4 sm:px-5">
            <Toggle pressed={pressed} onPressedChange={setPressed} aria-label={t(`${prefix}.controlled.label`)}>
              <Bold />
              {t(`${prefix}.controlled.label`)}
            </Toggle>
            <CodeExample
              code={`const [pressed, setPressed] = useState(false);

<Toggle pressed={pressed} onPressedChange={setPressed} aria-label="Bold">
  <Bold />
  Bold
</Toggle>`}
            />
          </CardContent>
        </Card>
        <Card className="rounded-none border-border shadow-none">
          <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
            <div>
              <CardTitle>{t(`${prefix}.variants.title`)}</CardTitle>
              <CardDescription className="mt-2 leading-6">{t(`${prefix}.variants.description`)}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 px-4 py-4 sm:px-5">
            <div className="flex gap-2">
              <Toggle variant="outline" aria-label={t(`${prefix}.variants.italic`)}>
                <Italic />
              </Toggle>
              <Toggle size="lg">{t(`${prefix}.variants.large`)}</Toggle>
            </div>
            <CodeExample
              code={`<div className="flex gap-2">
  <Toggle variant="outline" aria-label="Italic"><Italic /></Toggle>
  <Toggle size="lg">Large</Toggle>
</div>`}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
