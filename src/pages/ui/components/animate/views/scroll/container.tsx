import { getVariant, type VariantType } from '@/components/animate/variants';
import MotionViewport from '@/components/animate/motion-viewport';
import { themeVars } from '@/theme/theme.css';
import { Card } from '@/ui/card';
import useLocale from '@/locales/use-locale';

const ANIMATE_PAGE_I18N_PREFIX = 'pages.components.animate';

const scrollItemCount = 40;

type ScrollContainerProps = {
  /**
   * 动画类型名称
   * Animation variant type name
   */
  variant: VariantType;
};

export default function ScrollContainer({ variant }: ScrollContainerProps) {
  const { t } = useLocale();

  /**
   * selectedVariant 是注册表 key，MotionViewport 需要的是实际 Variants 对象。
   * selectedVariant is a registry key, while MotionViewport needs the resolved Variants object.
   */
  const variantKey = getVariant(variant);

  return (
    <div
      key={variant}
      className="flex h-[480px] flex-col gap-y-4 overflow-auto rounded-lg px-4 py-4 md:px-20"
      style={{
        backgroundColor: themeVars.colors.background.neutral
      }}>
      {Array.from({ length: scrollItemCount }, (_, index) => (
        <MotionViewport key={index} variants={variantKey}>
          <Card>
            <span className="text-center">{t(`${ANIMATE_PAGE_I18N_PREFIX}.preview.item`, { index: index + 1 })}</span>
          </Card>
        </MotionViewport>
      ))}
    </div>
  );
}
