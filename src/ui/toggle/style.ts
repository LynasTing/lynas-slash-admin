import { cva } from 'class-variance-authority';

export const toggleVariants = cva(
  [
    /** 布局 / layout */
    'inline-flex items-center justify-center gap-2 rounded-md whitespace-nowrap',
    /** 字体 / typography */
    'text-sm font-medium',
    /** 动画 / transition */
    'transition-[color,box-shadow]',
    /** 主题 / theme */
    'hover:bg-muted hover:text-muted-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
    /** 焦点 / focus */
    'outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
    /** 禁用 / disabled */
    'disabled:pointer-events-none disabled:opacity-50',
    /** 错误 / invalid */
    'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
    /** 图标 / icon */
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
  ],
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground'
      },
      size: {
        default: 'h-9 min-w-9 px-2',
        sm: 'h-8 min-w-8 px-1.5',
        lg: 'h-10 min-w-10 px-2.5'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);
