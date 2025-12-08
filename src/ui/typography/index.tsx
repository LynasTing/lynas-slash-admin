import { VariantProps } from 'class-variance-authority';
import { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import { titleVariants, textVariants } from './style';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type TitleVariantProps = VariantProps<typeof titleVariants>;

/**
 * Omit 从类型中删除一些属性，剩下的组成一个新的类型
 * - 支持一次删除多个属性 Omit<Type, key1 | key2>
 *
 * Omit from a type to remove one or more properties, resulting in a new type
 * - Supports removing multiple properties at once Omit<Type, key1 | key2>
 */
export interface TitleProps extends Omit<HTMLAttributes<HTMLHeadingElement>, 'color'> {
  as?: HeadingTag;
  color?: TitleVariantProps['color'];
  align?: TitleVariantProps['align'];
}

/**
 * 为什么要把 forwardRef 中解构出的 as 重命名为 Component？
 * - TSX 里组件必须是大写开头，小写会被认为是 HTML 元素
 *
 * Why do we need to rename the as prop in the forwardRef component?
 * - TSX components must start with a capital letter, lowercase letters are considered HTML elements
 */
const Title = forwardRef<HTMLHeadingElement, TitleProps>(({ className, color, align, as: Component = 'h1', ...props }, ref) => {
  return <Component className={cn(titleVariants({ as: Component, color, align, className }))} ref={ref} {...props} />;
});

type textVariants = VariantProps<typeof textVariants>;

export interface TextProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  variant?: textVariants['variant'];
  color?: textVariants['color'];
  align?: textVariants['align'];
}

const Text = forwardRef<HTMLSpanElement, TextProps>(({ className, variant, color, align, ...props }, ref) => {
  return <span className={cn(textVariants({ variant, color, align, className }))} ref={ref} {...props} />;
});

Title.displayName = 'Title';
Text.displayName = 'Text';

export { Title, Text };
