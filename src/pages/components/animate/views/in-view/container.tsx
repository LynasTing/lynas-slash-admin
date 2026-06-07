import { getVariant, type VariantType } from '@/components/animate/variants';
import Cover3IMG from '@/assets/images/cover/cover_3.jpg';
import { GLOBAL_CONFIG } from '@/config/global';
import { themeVars } from '@/theme/theme.css';
import MotionContainer from '@/components/animate/motion-container';
import { m } from 'motion/react';

export type InViewContainerProps = {
  /**
   * 是否渲染文本
   * Whether to render text
   */
  isText: boolean;

  /**
   * 是否渲染多个
   * Whether to render multiple
   */
  isMulti: boolean;

  /**
   * 动画类型名称
   * Animation variant type name
   */
  variant: VariantType;
};

export default function InViewContainer({ isText, isMulti, variant }: InViewContainerProps) {
  /**
   * 控制面板传入的是动画 key，motion 子节点需要解析后的 Variants 对象。
   * The control panel passes an animation key; motion children need the resolved Variants object.
   */
  const variantKey = getVariant(variant);

  /**
   * 多图片模式复用同一张图，只用于观察 stagger 动画，不表达不同内容。
   * Multi-image mode reuses the same image to demonstrate staggered animation, not distinct content.
   */
  const imgs = isMulti ? Array(5).fill(Cover3IMG) : [Cover3IMG];

  return (
    <div
      key={variant}
      className="flex h-[480px] items-center justify-center overflow-auto"
      style={{
        backgroundColor: themeVars.colors.background.neutral
      }}>
      {isText ? (
        /**
         * 文本模式拆成单字符节点，让容器级 stagger 可以逐字触发。
         * Text mode splits the app name into character nodes so container-level stagger can animate each one.
         */
        <MotionContainer className="flex items-center justify-center font-bold md:text-6xl">
          {GLOBAL_CONFIG.appName.split('').map((item, index) => (
            <m.div key={index} variants={variantKey}>
              {item}
            </m.div>
          ))}
        </MotionContainer>
      ) : (
        /**
         * 图片模式保留固定尺寸，避免切换动画时尺寸变化干扰动效判断。
         * Image mode keeps fixed dimensions so size changes do not obscure the animation behavior.
         */
        <MotionContainer className="flex flex-col items-center justify-center gap-6">
          {imgs.map((item, index) => (
            <m.img
              key={index}
              src={item}
              style={{
                objectFit: 'cover',
                width: '240px',
                height: isMulti ? '36px' : '240px',
                margin: 'auto',
                borderRadius: '8px'
              }}
              variants={variantKey}
            />
          ))}
        </MotionContainer>
      )}
    </div>
  );
}
