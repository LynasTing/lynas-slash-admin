import { useState } from 'react';
import useLocale from '@/locales/use-locale';
import { Badge } from '@/ui/badge';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { Label } from '@/ui/label';
import { RadioGroup, RadioGroupItem } from '@/ui/radio-group';
import CodeExample from '../components/code-example';

const optionItems = ['small', 'medium', 'large'] as const;

/**
 * 展示 Radio Group 的受控互斥选择与禁用选项。
 * 选项以同一组 name 组织，确保辅助技术可识别其互斥关系。
 *
 * Shows Radio Group controlled exclusive selection and disabled options.
 * Options share a group name so assistive technology can recognize their mutually exclusive relationship.
 */
export default function RadioGroupPage() {
  const { t } = useLocale();
  const prefix = 'ui.radioGroup';
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
            <Badge className="rounded-none">21</Badge>
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
            <RadioGroup value={value} onValueChange={setValue}>
              {optionItems.map(item => (
                <div key={item} className="flex items-center gap-3">
                  <RadioGroupItem value={item} id={`radio-${item}`} />
                  <Label htmlFor={`radio-${item}`}>{t(`${prefix}.options.${item}`)}</Label>
                </div>
              ))}
            </RadioGroup>
            <CodeExample
              code={`<RadioGroup value={value} onValueChange={setValue}>
  <RadioGroupItem value="small" id="small" />
  <Label htmlFor="small">Small</Label>
</RadioGroup>`}
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
            <RadioGroup>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="disabled" id="radio-disabled" disabled />
                <Label htmlFor="radio-disabled">{t(`${prefix}.disabled.label`)}</Label>
              </div>
            </RadioGroup>
            <CodeExample code={'<RadioGroup><RadioGroupItem value="disabled" id="disabled" disabled /></RadioGroup>'} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
