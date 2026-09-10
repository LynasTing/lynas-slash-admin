import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  [
    // layout & spacing 布局和间距
    'inline-flex items-center justify-center gap-2 whitespace-nowrap',
    // shape & typography 形状和排版
    'rounded-md text-sm font-medium',
    // interaction 交互
    'transition-colors focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden',
    // disabled & SVG child 禁用和 SVG 子元素
    'disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'
  ],
  {
    variants: {
      variant: {
        // 默认
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        // 危险
        destructive: 'text-destructive-foreground bg-destructive shadow-sm hover:bg-destructive/90',
        // 轮廓
        outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        // 次要
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        // 幽灵
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        // 文本链接
        link: 'text-primary underline-offset-4 hover:underline',
        // 黑白对比
        contrast: 'bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80'
      },
      size: {
        // 默认
        default: 'h-9 px-4 py-2',
        // 小
        sm: 'h-8 rounded-md px-3 text-xs',
        // 大
        lg: 'h-10 rounded-md px-8',
        // 图标
        icon: 'h-9 w-9 cursor-pointer'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);
