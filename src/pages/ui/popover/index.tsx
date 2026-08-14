import useLocale from '@/locales/use-locale';
import { Badge } from '@/ui/badge';
import Button from '@/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import CodeExample from '../components/code-example';

/**
 * 展示 Popover 的点击触发与浮层内容。
 * Popover 适合承载紧邻触发器的补充操作，不应用于阻塞性的确认流程。
 *
 * Shows Popover click activation and floating content.
 * Popover suits supporting actions adjacent to a trigger and should not be used for blocking confirmations.
 */
export default function PopoverPage() {
  const { t } = useLocale();
  const prefix = 'ui.popover';
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="gap-0 rounded-none border-border py-0 shadow-none">
        <CardHeader className="gap-2 px-4 py-3 sm:px-5">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-xl tracking-tight sm:text-2xl">{t(`${prefix}.title`)}</CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-5">{t(`${prefix}.description`)}</CardDescription>
          </div>
          <CardAction>
            <Badge className="rounded-none">19</Badge>
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
        <CardContent className="space-y-3 px-4 py-4 sm:px-5">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">{t(`${prefix}.defaultValue.trigger`)}</Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-72">
              <p className="text-sm font-medium">{t(`${prefix}.content.title`)}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t(`${prefix}.content.description`)}</p>
            </PopoverContent>
          </Popover>
          <CodeExample
            code={`<Popover>
  <PopoverTrigger asChild><Button variant="outline">Open popover</Button></PopoverTrigger>
  <PopoverContent>Supporting content</PopoverContent>
</Popover>`}
          />
        </CardContent>
      </Card>
    </div>
  );
}
