import { AlignCenter, AlignLeft, AlignRight } from 'lucide-react';
import { useState } from 'react';
import useLocale from '@/locales/use-locale';
import { Badge } from '@/ui/badge';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/ui/toggle-group';
import CodeExample from '../components/code-example';

export default function ToggleGroupPage() {
  const { t } = useLocale();
  const prefix = 'ui.toggleGroup';
  const [value, setValue] = useState('left');
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="gap-0 rounded-none border-border py-0 shadow-none">
        <CardHeader className="gap-2 px-4 py-3 sm:px-5">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-xl tracking-tight sm:text-2xl">{t(`${prefix}.title`)}</CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-5">{t(`${prefix}.description`)}</CardDescription>
          </div>
          <CardAction>
            <Badge className="rounded-none">29</Badge>
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
          <ToggleGroup
            type="single"
            variant="outline"
            value={value}
            onValueChange={nextValue => nextValue && setValue(nextValue)}
            aria-label={t(`${prefix}.controlled.label`)}>
            <ToggleGroupItem value="left" aria-label={t(`${prefix}.items.left`)}>
              <AlignLeft />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label={t(`${prefix}.items.center`)}>
              <AlignCenter />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label={t(`${prefix}.items.right`)}>
              <AlignRight />
            </ToggleGroupItem>
          </ToggleGroup>
          <CodeExample
            code={`const [value, setValue] = useState('left');

<ToggleGroup
  type="single"
  variant="outline"
  value={value}
  onValueChange={nextValue => nextValue && setValue(nextValue)}
  aria-label="Text alignment"
>
  <ToggleGroupItem value="left" aria-label="Align left"><AlignLeft /></ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Align center"><AlignCenter /></ToggleGroupItem>
  <ToggleGroupItem value="right" aria-label="Align right"><AlignRight /></ToggleGroupItem>
</ToggleGroup>`}
          />
        </CardContent>
      </Card>
    </div>
  );
}
