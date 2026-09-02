import { getVariant, type VariantType } from '@/components/animate/variants';
import MotionContainer from '@/components/animate/motion-container';
import Cover3IMG from '@/assets/images/cover/cover_3.jpg';
import { themeVars } from '@/theme/theme.css';
import { m } from 'motion/react';

type BackgroundContainerProps = {
  /**
   * 动画类型名称
   * Animation variant type name
   */
  variant: VariantType;
};

export default function BackgroundContainer({ variant }: BackgroundContainerProps) {
  /**
   * 背景示例同样先把 variant key 解析成 motion 可消费的动画配置。
   * The background demo also resolves the variant key into animation config consumed by motion.
   */
  const variantKey = getVariant(variant);

  /**
   * Kenburns 需要作用在图片元素上，颜色动画则直接把 motion props 展开到背景节点。
   * Kenburns variants target an image element, while color variants are spread directly onto the background node.
   */
  const shouldRenderImage = variant.startsWith('kenburns');

  return (
    <div
      className="h-[480px] overflow-hidden rounded-lg"
      style={{
        backgroundColor: themeVars.colors.background.neutral
      }}>
      <MotionContainer className="size-full">
        {shouldRenderImage ? (
          <m.img src={Cover3IMG} className="size-full object-cover" variants={variantKey} />
        ) : (
          <m.div className="size-full" {...variantKey} />
        )}
      </MotionContainer>
    </div>
  );
}
