import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import useLocale from '@/locales/use-locale';
import { Badge } from '@/ui/badge';
import Button, { type ButtonProps } from '@/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import Separator from '@/ui/separator';

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
}

/**
 * Button 的全部视觉变体。
 * 此配置与 ButtonProps 绑定，组件新增或移除变体时，演示页会在类型检查阶段暴露不一致。
 *
 * Complete visual variants for Button.
 * This configuration is tied to ButtonProps so type checking exposes any mismatch when variants change.
 */
const variantItems = [
  { labelKey: 'default', variant: 'default' },
  { labelKey: 'secondary', variant: 'secondary' },
  { labelKey: 'outline', variant: 'outline' },
  { labelKey: 'ghost', variant: 'ghost' },
  { labelKey: 'link', variant: 'link' },
  { labelKey: 'contrast', variant: 'contrast' },
  { labelKey: 'destructive', variant: 'destructive' }
] as const satisfies ReadonlyArray<ButtonVariantDemoItem>;

/**
 * Button 的文本尺寸变体。
 * 图标尺寸需要图标内容配合展示，因此不与仅含文本的示例混在同一组。
 *
 * Text size variants for Button.
 * Icon size requires icon content, so it is intentionally not mixed into the text-only examples.
 */
const sizeItems = [
  { labelKey: 'small', size: 'sm' },
  { labelKey: 'default', size: 'default' },
  { labelKey: 'large', size: 'lg' }
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
            <div className="flex flex-wrap gap-3">
              {/*
               * 逐项渲染 Button 已公开的 variant，便于直接对照不同操作层级。
               *
               * Render each public Button variant so action hierarchy can be compared directly.
               */}
              {variantItems.map(item => (
                <Button key={item.variant} variant={item.variant}>
                  {t(`${BUTTON_PAGE_I18N_PREFIX}.variants.${item.labelKey}`)}
                </Button>
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
            <div className="flex flex-wrap items-center gap-3">
              {/*
               * 只在此处展示文本按钮尺寸，避免图标按钮的内容结构干扰尺寸对比。
               *
               * Only text button sizes appear here, keeping icon content from distorting size comparison.
               */}
              {sizeItems.map(item => (
                <Button key={item.size} size={item.size}>
                  {t(`${BUTTON_PAGE_I18N_PREFIX}.sizes.${item.labelKey}`)}
                </Button>
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
            <div className="flex flex-wrap items-center gap-3">
              <Button disabled>{t(`${BUTTON_PAGE_I18N_PREFIX}.states.disabled`)}</Button>
              <Button aria-pressed={isLoading} onClick={handleLoadingToggle}>
                {isLoading && <LoaderCircle className="animate-spin" />}
                {t(`${BUTTON_PAGE_I18N_PREFIX}.states.${isLoading ? 'stopLoading' : 'startLoading'}`)}
              </Button>
            </div>
            {isLoading && (
              <>
                <Separator orientation="horizontal" />
                <Button variant="outline" disabled>
                  <LoaderCircle className="animate-spin" />
                  {t(`${BUTTON_PAGE_I18N_PREFIX}.states.loading`)}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
