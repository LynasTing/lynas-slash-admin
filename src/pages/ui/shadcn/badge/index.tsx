import { type ComponentProps } from 'react';
import useLocale from '@/locales/use-locale';
import { Badge } from '@/ui/badge';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import CodeExample from '../components/code-example';

type BadgeVariant = NonNullable<ComponentProps<typeof Badge>['variant']>;

interface BadgeVariantDemoItem {
  /**
   * 变体名称对应的国际化键名，用于渲染实际视觉语义。
   *
   * Translation key for the variant name. It renders the actual visual meaning.
   */
  labelKey: string;

  /**
   * 传递给 Badge 的视觉变体，受组件公开 API 约束。
   *
   * Visual variant passed to Badge. It is constrained by the component's public API.
   */
  variant: BadgeVariant;

  /**
   * 与当前变体一一对应的 JSX 源码。
   *
   * JSX source that maps one-to-one with the current variant.
   */
  code: string;
}

/**
 * Badge 的公开视觉变体及其对应代码。
 * 每个项目单独渲染，避免多种视觉结果共用一段无法准确对照的代码。
 *
 * Public Badge variants and their corresponding source code.
 * Each item renders independently so multiple visual results do not share ambiguous source code.
 */
const variantItems = [
  { labelKey: 'default', variant: 'default', code: '<Badge>Default</Badge>' },
  { labelKey: 'secondary', variant: 'secondary', code: '<Badge variant="secondary">Secondary</Badge>' },
  { labelKey: 'success', variant: 'success', code: '<Badge variant="success">Success</Badge>' },
  { labelKey: 'warning', variant: 'warning', code: '<Badge variant="warning">Warning</Badge>' },
  { labelKey: 'error', variant: 'error', code: '<Badge variant="error">Error</Badge>' }
] as const satisfies ReadonlyArray<BadgeVariantDemoItem>;

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
        <CardContent className="space-y-3 px-4 py-4 sm:px-5">
          {variantItems.map(item => (
            <div key={item.variant} className="grid items-center gap-3 border border-border p-3 sm:grid-cols-[minmax(9rem,auto)_1fr]">
              <Badge variant={item.variant}>{t(`${prefix}.variants.${item.labelKey}`)}</Badge>
              <CodeExample code={item.code} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="rounded-none border-border shadow-none">
        <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
          <div>
            <CardTitle>{t(`${prefix}.shapes.title`)}</CardTitle>
            <CardDescription className="mt-2 leading-6">{t(`${prefix}.shapes.description`)}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 px-4 py-4 sm:px-5">
          <div className="grid items-center gap-3 border border-border p-3 sm:grid-cols-[minmax(9rem,auto)_1fr]">
            <Badge shape="square">{t(`${prefix}.shapes.label`)}</Badge>
            <CodeExample code={'<Badge shape="square">New</Badge>'} />
          </div>
          <div className="grid items-center gap-3 border border-border p-3 sm:grid-cols-[minmax(9rem,auto)_1fr]">
            <Badge shape="circle">12</Badge>
            <CodeExample code={'<Badge shape="circle">12</Badge>'} />
          </div>
          <div className="grid items-center gap-3 border border-border p-3 sm:grid-cols-[minmax(9rem,auto)_1fr]">
            <Badge variant="success" shape="dot" aria-label={t(`${prefix}.shapes.available`)} />
            <CodeExample code={'<Badge variant="success" shape="dot" aria-label="Available" />'} />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-none border-border shadow-none">
        <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
          <div>
            <CardTitle>{t(`${prefix}.outline.title`)}</CardTitle>
            <CardDescription className="mt-2 leading-6">{t(`${prefix}.outline.description`)}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 px-4 py-4 sm:px-5">
          <Badge variant="outline">{t(`${prefix}.outline.title`)}</Badge>
          <CodeExample code={'<Badge variant="outline">Outline</Badge>'} />
        </CardContent>
      </Card>
    </div>
  );
}
