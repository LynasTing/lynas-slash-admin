import { useState } from 'react';
import useLocale from '@/locales/use-locale';
import { Badge } from '@/ui/badge';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { Slider } from '@/ui/slider';
import CodeExample from '../components/code-example';

export default function SliderPage() {
  const { t } = useLocale();
  const prefix = 'ui.slider';
  const [value, setValue] = useState([40]);
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="gap-0 rounded-none border-border py-0 shadow-none">
        <CardHeader className="gap-2 px-4 py-3 sm:px-5">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-xl tracking-tight sm:text-2xl">{t(`${prefix}.title`)}</CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-5">{t(`${prefix}.description`)}</CardDescription>
          </div>
          <CardAction>
            <Badge className="rounded-none">25</Badge>
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
          <CardContent className="space-y-4 px-4 py-4 sm:px-5">
            <Slider value={value} onValueChange={setValue} tooltipMode="always" aria-label={t(`${prefix}.controlled.label`)} />
            <span className="text-sm text-muted-foreground">{t(`${prefix}.controlled.value`, { value: value[0] })}</span>
            <CodeExample
              code={`const [value, setValue] = useState([40]);

<Slider
  value={value}
  onValueChange={setValue}
  tooltipMode="always"
  aria-label="Current value"
/>`}
            />
          </CardContent>
        </Card>
        <Card className="rounded-none border-border shadow-none">
          <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
            <div>
              <CardTitle>{t(`${prefix}.range.title`)}</CardTitle>
              <CardDescription className="mt-2 leading-6">{t(`${prefix}.range.description`)}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 px-4 py-4 sm:px-5">
            <Slider defaultValue={[25, 75]} tooltipMode="always" aria-label={t(`${prefix}.range.label`)} />
            <CodeExample code={'<Slider defaultValue={[25, 75]} tooltipMode="always" aria-label="Range value" />'} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
