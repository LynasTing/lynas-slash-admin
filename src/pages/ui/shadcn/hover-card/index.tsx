import useLocale from '@/locales/use-locale';
import { Badge } from '@/ui/badge';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/ui/hover-card';
import CodeExample from '../components/code-example';

/**
 * 展示 Hover Card 的悬停与键盘聚焦触发方式。
 * 触发器保留为链接语义，浮层仅补充上下文而不替代主内容。
 *
 * Shows Hover Card activation by pointer hover and keyboard focus.
 * The trigger remains a semantic link while the panel only adds context instead of replacing primary content.
 */
export default function HoverCardPage() {
  const { t } = useLocale();
  const prefix = 'ui.hoverCard';
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="gap-0 rounded-none border-border py-0 shadow-none">
        <CardHeader className="gap-2 px-4 py-3 sm:px-5">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-xl tracking-tight sm:text-2xl">{t(`${prefix}.title`)}</CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-5">{t(`${prefix}.description`)}</CardDescription>
          </div>
          <CardAction>
            <Badge className="rounded-none">16</Badge>
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
        <CardContent className="space-y-3 px-4 py-8 sm:px-5">
          <HoverCard>
            <HoverCardTrigger asChild>
              <a className="text-primary underline underline-offset-4" href="/ui/hover-card">
                {t(`${prefix}.defaultValue.trigger`)}
              </a>
            </HoverCardTrigger>
            <HoverCardContent className="w-72">
              <p className="text-sm font-medium">{t(`${prefix}.content.title`)}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t(`${prefix}.content.description`)}</p>
            </HoverCardContent>
          </HoverCard>
          <CodeExample
            code={`<HoverCard>
  <HoverCardTrigger asChild><a href="/ui">More information</a></HoverCardTrigger>
  <HoverCardContent>Additional information</HoverCardContent>
</HoverCard>`}
          />
        </CardContent>
      </Card>
    </div>
  );
}
