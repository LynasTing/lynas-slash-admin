import useLocale from '@/locales/use-locale';
import { Badge } from '@/ui/badge';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';

/**
 * 展示 Badge 的颜色语义、形状及轮廓样式。
 * Badge 没有交互状态，因此页面按视觉语义分组对比，而不是模拟表单操作。
 *
 * Show Badge semantic colors, shapes, and outline style.
 * Badge has no interactive state, so the page compares visual semantics instead of simulating form interactions.
 */
export default function BadgePage() {
  const { t } = useLocale();
  const prefix = 'ui.badge';

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="gap-0 rounded-none border-border py-0 shadow-none">
        <CardHeader className="gap-2 px-4 py-3 sm:px-5">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-xl tracking-tight sm:text-2xl">{t(`${prefix}.title`)}</CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-5">{t(`${prefix}.description`)}</CardDescription>
          </div>
          <CardAction>
            <Badge className="rounded-none">02</Badge>
          </CardAction>
        </CardHeader>
      </Card>

      <Card className="rounded-none border-border shadow-none">
        <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
          <div>
            <CardTitle>{t(`${prefix}.variants.title`)}</CardTitle>
            <CardDescription className="mt-2 leading-6">{t(`${prefix}.variants.description`)}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3 px-4 py-4 sm:px-5">
          <Badge>{t(`${prefix}.variants.default`)}</Badge>
          <Badge variant="secondary">{t(`${prefix}.variants.secondary`)}</Badge>
          <Badge variant="success">{t(`${prefix}.variants.success`)}</Badge>
          <Badge variant="warning">{t(`${prefix}.variants.warning`)}</Badge>
          <Badge variant="error">{t(`${prefix}.variants.error`)}</Badge>
        </CardContent>
      </Card>

      <Card className="rounded-none border-border shadow-none">
        <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
          <div>
            <CardTitle>{t(`${prefix}.shapes.title`)}</CardTitle>
            <CardDescription className="mt-2 leading-6">{t(`${prefix}.shapes.description`)}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex items-center gap-3 px-4 py-4 sm:px-5">
          <Badge shape="square">{t(`${prefix}.shapes.label`)}</Badge>
          <Badge shape="circle">12</Badge>
          <Badge variant="success" shape="dot" aria-label={t(`${prefix}.shapes.available`)} />
        </CardContent>
      </Card>

      <Card className="rounded-none border-border shadow-none">
        <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
          <div>
            <CardTitle>{t(`${prefix}.outline.title`)}</CardTitle>
            <CardDescription className="mt-2 leading-6">{t(`${prefix}.outline.description`)}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-4 py-4 sm:px-5">
          <Badge variant="outline">{t(`${prefix}.outline.title`)}</Badge>
        </CardContent>
      </Card>
    </div>
  );
}
