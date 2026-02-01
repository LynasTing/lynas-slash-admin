import { cva } from 'class-variance-authority';

export const separatorVariants = cva(
  [
    /** 基础样式 / base */
    'bg-border shrink-0'
  ],
  {
    variants: {
      /** 方向 / orientation */
      orientation: {
        horizontal: 'w-full h-px',
        vertical: 'w-px h-full'
      },
      /** 默认值 / default */
      defaultVariants: {
        orientation: 'horizontal'
      }
    }
  }
);
