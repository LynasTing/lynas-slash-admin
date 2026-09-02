import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import useLocale from '@/locales/use-locale';
import { Badge } from '@/ui/badge';
import Button, { type ButtonProps } from '@/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import CodeExample from '../components/code-example';

const BUTTON_PAGE_I18N_PREFIX = 'ui.button';

type ButtonVariant = NonNullable<ButtonProps['variant']>;
type ButtonSize = NonNullable<ButtonProps['size']>;

interface ButtonVariantDemoItem {
  /**
   * 变体名称对应的国际化键名，用于渲染组件真实的视觉语义。
   *
   * Translation key for the variant name. It renders the component's actual visual meaning.
   */
  labelKey: string;

  /**
   * 传递给 Button 的样式变体，值必须受 Button 公开 API 约束。
   *
   * Visual variant passed to Button. The value is constrained by Button's public API.
   */
  variant: ButtonVariant;

  /**
   * 与当前示例完全对应的 JSX 代码，用于紧邻演示结果展示。
   *
   * JSX source that exactly matches the current example and is displayed next to it.
   */
  code: string;
}

interface ButtonSizeDemoItem {
  /**
   * 尺寸名称对应的国际化键名，用于保持演示页与当前语言同步。
   *
   * Translation key for the size name, keeping the showcase aligned with the active locale.
   */
  labelKey: string;

  /**
   * 传递给 Button 的尺寸变体，展示组件支持的固定尺寸集合。
   *
   * Size variant passed to Button. It represents the component's supported fixed size set.
   */
  size: ButtonSize;

  /**
   * 与当前尺寸示例完全对应的 JSX 代码。
   *
   * JSX source that exactly matches the current size example.
   */
  code: string;
}

/**
 * Button 的全部视觉变体。
 * 此配置与 ButtonProps 绑定，组件新增或移除变体时，演示页会在类型检查阶段暴露不一致。
 *
 * Complete visual variants for Button.
 * This configuration is tied to ButtonProps so type checking exposes any mismatch when variants change.
 */
const variantItems = [
  { labelKey: 'default', variant: 'default', code: '<Button>Default</Button>' },
  { labelKey: 'secondary', variant: 'secondary', code: '<Button variant="secondary">Secondary</Button>' },
  { labelKey: 'outline', variant: 'outline', code: '<Button variant="outline">Outline</Button>' },
  { labelKey: 'ghost', variant: 'ghost', code: '<Button variant="ghost">Ghost</Button>' },
  { labelKey: 'link', variant: 'link', code: '<Button variant="link">Link</Button>' },
  { labelKey: 'contrast', variant: 'contrast', code: '<Button variant="contrast">Contrast</Button>' },
  { labelKey: 'destructive', variant: 'destructive', code: '<Button variant="destructive">Delete</Button>' }
] as const satisfies ReadonlyArray<ButtonVariantDemoItem>;

/**
 * Button 的文本尺寸变体。
 * 图标尺寸需要图标内容配合展示，因此不与仅含文本的示例混在同一组。
 *
 * Text size variants for Button.
 * Icon size requires icon content, so it is intentionally not mixed into the text-only examples.
 */
const sizeItems = [
  { labelKey: 'small', size: 'sm', code: '<Button size="sm">Small</Button>' },
  { labelKey: 'default', size: 'default', code: '<Button>Default</Button>' },
  { labelKey: 'large', size: 'lg', code: '<Button size="lg">Large</Button>' }
] as const satisfies ReadonlyArray<ButtonSizeDemoItem>;

/**
 * 展示 Button 的视觉变体、尺寸和交互状态。
 * 加载状态保留触发按钮可点击，便于在文档页中同时验证进入与退出状态。
 *
 * Show Button variants, sizes, and interactive states.
 * The loading trigger stays clickable so the documentation page can verify both entering and leaving the state.
 */
export default function ButtonPage() {
  const { t } = useLocale();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * 切换加载演示状态。
   * 演示按钮不能被 disabled，否则页面进入加载状态后无法回到初始状态。
   *
   * Toggle the loading demonstration state.
   * The trigger cannot be disabled, otherwise the page cannot return to its initial state after loading begins.
   */
  const handleLoadingToggle = () => {
    setIsLoading(value => !value);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="gap-0 rounded-none border-border py-0 shadow-none">
        <CardHeader className="gap-2 px-4 py-3 sm:px-5">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-xl tracking-tight sm:text-2xl">{t(`${BUTTON_PAGE_I18N_PREFIX}.title`)}</CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-5">{t(`${BUTTON_PAGE_I18N_PREFIX}.description`)}</CardDescription>
          </div>
          <CardAction>
            <Badge className="rounded-none">01</Badge>
          </CardAction>
        </CardHeader>
      </Card>

      <div className="space-y-4 sm:space-y-6">
        <Card className="rounded-none border-border shadow-none">
          <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
            <div className="min-w-0">
              <CardTitle>{t(`${BUTTON_PAGE_I18N_PREFIX}.variants.title`)}</CardTitle>
              <CardDescription className="mt-2 leading-6">{t(`${BUTTON_PAGE_I18N_PREFIX}.variants.description`)}</CardDescription>
            </div>
            <CardAction>
              <Badge variant="outline" className="rounded-none">
                01
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-3 px-4 py-4 sm:px-5">
            <div className="grid gap-3">
              {/*
               * 逐项渲染 Button 已公开的 variant，便于直接对照不同操作层级。
               *
               * Render each public Button variant so action hierarchy can be compared directly.
               */}
              {variantItems.map(item => (
                <div key={item.variant} className="grid items-center gap-3 border border-border p-3 sm:grid-cols-[minmax(9rem,auto)_1fr]">
                  <Button variant={item.variant}>{t(`${BUTTON_PAGE_I18N_PREFIX}.variants.${item.labelKey}`)}</Button>
                  <CodeExample code={item.code} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none border-border shadow-none">
          <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
            <div className="min-w-0">
              <CardTitle>{t(`${BUTTON_PAGE_I18N_PREFIX}.sizes.title`)}</CardTitle>
              <CardDescription className="mt-2 leading-6">{t(`${BUTTON_PAGE_I18N_PREFIX}.sizes.description`)}</CardDescription>
            </div>
            <CardAction>
              <Badge variant="outline" className="rounded-none">
                02
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-3 px-4 py-4 sm:px-5">
            <div className="grid gap-3">
              {/*
               * 只在此处展示文本按钮尺寸，避免图标按钮的内容结构干扰尺寸对比。
               *
               * Only text button sizes appear here, keeping icon content from distorting size comparison.
               */}
              {sizeItems.map(item => (
                <div key={item.size} className="grid items-center gap-3 border border-border p-3 sm:grid-cols-[minmax(9rem,auto)_1fr]">
                  <Button size={item.size}>{t(`${BUTTON_PAGE_I18N_PREFIX}.sizes.${item.labelKey}`)}</Button>
                  <CodeExample code={item.code} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none border-border shadow-none">
          <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
            <div className="min-w-0">
              <CardTitle>{t(`${BUTTON_PAGE_I18N_PREFIX}.states.title`)}</CardTitle>
              <CardDescription className="mt-2 leading-6">{t(`${BUTTON_PAGE_I18N_PREFIX}.states.description`)}</CardDescription>
            </div>
            <CardAction>
              <Badge variant="outline" className="rounded-none">
                03
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-3 px-4 py-4 sm:px-5">
            <div className="grid gap-3">
              <div className="grid items-center gap-3 border border-border p-3 sm:grid-cols-[minmax(9rem,auto)_1fr]">
                <Button disabled>{t(`${BUTTON_PAGE_I18N_PREFIX}.states.disabled`)}</Button>
                <CodeExample code={'<Button disabled>Disabled</Button>'} />
              </div>
              <div className="grid items-center gap-3 border border-border p-3 sm:grid-cols-[minmax(9rem,auto)_1fr]">
                <Button aria-pressed={isLoading} onClick={handleLoadingToggle}>
                  {isLoading && <LoaderCircle className="animate-spin" />}
                  {t(`${BUTTON_PAGE_I18N_PREFIX}.states.${isLoading ? 'stopLoading' : 'startLoading'}`)}
                </Button>
                <CodeExample
                  code={`<Button onClick={handleLoadingToggle}>
  {isLoading && <LoaderCircle className="animate-spin" />}
  {isLoading ? 'Stop loading' : 'Start loading'}
</Button>`}
                />
              </div>
            </div>
            {isLoading && (
              <div className="grid items-center gap-3 border border-border p-3 sm:grid-cols-[minmax(9rem,auto)_1fr]">
                <Button variant="outline" disabled>
                  <LoaderCircle className="animate-spin" />
                  {t(`${BUTTON_PAGE_I18N_PREFIX}.states.loading`)}
                </Button>
                <CodeExample code={'<Button variant="outline" disabled><LoaderCircle className="animate-spin" />Loading</Button>'} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
