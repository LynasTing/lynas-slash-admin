import { cva } from 'class-variance-authority';

export const separatorVariants = cva(
  [
    /** 基础样式 / base */
    'shrink-0 bg-border'
  ],
  {
    variants: {
      /** 方向 / orientation */
      orientation: {
        horizontal: 'h-px w-full',
        vertical: 'h-full w-px'
      },
      /** 默认值 / default */
      defaultVariants: {
        orientation: 'horizontal'
      }
    }
  }
);
