import { cva } from 'class-variance-authority';

/**
 * cva 用类型安全 + 变体系统，动态生成Tailwind CSS
 * 第一个参数是基础样式，始终存在
 * 第二个参数是变体
 *
 * cva use type-safe + variant system, dynamically generate Tailwind CSS
 * The first parameter is the base style, which always exists
 * The second parameter is the variant
 */
export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        /**
         * 默认
         * default
         */
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',

        /**
         * 危险、破坏性操作
         * danger
         */
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',

        /**
         * 轮廓
         * outline
         */
        outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',

        /**
         * 次要、中等操作
         * secondary
         */
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',

        /**
         * 透明、无背景
         * ghost
         */
        ghost: 'hover:bg-accent hover:text-accent-foreground',

        /**
         * 链接
         * link
         */
        link: 'text-primary underline-offset-4 hover:underline',

        /**
         * 在深色背景上反转、提高对比度
         * in dark background with high contrast reverse
         */
        contrast: 'bg-black text-white dark:bg-white dark:text-black hover:bg-black/80 dark:hover:bg-white/80'
      },
      size: {
        /**
         * 默认
         * default
         */
        default: 'h-9 px-4 py-2',

        /**
         * 小
         * small
         */
        sm: 'h-8 rounded-md px-3 text-xs',

        /**
         * 大
         * large
         */
        lg: 'h-10 rounded-md px-8',

        /**
         * 图标
         * icon
         */
        icon: 'h-9 w-9 cursor-pointer'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);
