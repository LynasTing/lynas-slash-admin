import { cva } from 'class-variance-authority';

export const overlayVariants = cva([
  'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50'
]);

export const closeVariantse = cva([
  'ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none'
]);

export const contentVariants = cva(
  [
    /** 主题 颜色 / theme color */
    'bg-background text-text-primary',
    /** 定位 / position */
    'fixed z-50 ',
    /** 布局 / layout */
    'flex flex-col gap-4',
    /** 基础动画属性 / basic animation */
    'transition ease-in-out',
    /** 阴影 / shadow */
    'shadow-lg',
    /** 动画状态（由Radix data-state 自动触发） / animation state (triggered automatically by Radix data-state */
    'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500'
  ],
  {
    variants: {
      side: {
        top: 'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b',
        right:
          'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
        bottom: 'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t',
        left: 'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm'
      }
    },
    defaultVariants: {
      side: 'right'
    }
  }
);
