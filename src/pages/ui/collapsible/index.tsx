import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import useLocale from '@/locales/use-locale';
import { Badge } from '@/ui/badge';
import Button from '@/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/ui/collapsible';
import { cn } from '@/utils';
import CodeExample from '../components/code-example';

/**
 * 展示 Collapsible 的受控、默认展开和禁用状态。
 * 触发器使用完整宽度，保证触控设备也有稳定的可点击区域。
 *
 * Shows Collapsible controlled, default-open, and disabled states.
 * Triggers use the full available width to provide reliable tap targets on touch devices.
 */
export default function CollapsiblePage() {
  const { t } = useLocale();
  const prefix = 'ui.collapsible';
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="gap-0 rounded-none border-border py-0 shadow-none">
        <CardHeader className="gap-2 px-4 py-3 sm:px-5">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-xl tracking-tight sm:text-2xl">{t(`${prefix}.title`)}</CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-5">{t(`${prefix}.description`)}</CardDescription>
          </div>
          <CardAction>
            <Badge className="rounded-none">11</Badge>
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
          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="max-w-xl border border-border">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between rounded-none px-3">
                {t(`${prefix}.controlled.trigger`)}
                <ChevronDown className={cn('transition-transform', isOpen && 'rotate-180')} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="border-t border-border px-3 py-3 text-sm text-muted-foreground">{t(`${prefix}.controlled.content`)}</div>
            </CollapsibleContent>
          </Collapsible>
          <CodeExample
            code={`<Collapsible open={isOpen} onOpenChange={setIsOpen}>
  <CollapsibleTrigger asChild><Button>Show details</Button></CollapsibleTrigger>
  <CollapsibleContent>Details</CollapsibleContent>
</Collapsible>`}
          />
        </CardContent>
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
            <Collapsible defaultOpen className="border border-border">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between rounded-none px-3">
                  {t(`${prefix}.defaultValue.trigger`)}
                  <ChevronDown />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="border-t border-border px-3 py-3 text-sm text-muted-foreground">{t(`${prefix}.defaultValue.content`)}</div>
              </CollapsibleContent>
            </Collapsible>
            <CodeExample
              code={
                '<Collapsible defaultOpen><CollapsibleTrigger asChild><Button>Show details</Button></CollapsibleTrigger><CollapsibleContent>Details</CollapsibleContent></Collapsible>'
              }
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
            <Collapsible disabled className="border border-border">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between rounded-none px-3" disabled>
                  {t(`${prefix}.disabled.trigger`)}
                  <ChevronDown />
                </Button>
              </CollapsibleTrigger>
            </Collapsible>
            <CodeExample
              code={
                '<Collapsible disabled><CollapsibleTrigger asChild><Button disabled>Show details</Button></CollapsibleTrigger></Collapsible>'
              }
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
