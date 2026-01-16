import { cva } from 'class-variance-authority';

export const sliderRootVariants = cva([
  /** 定位 / position */
  'relative',
  /** 布局 / layout */
  'flex w-full items-center',
  /** 触控 / touch */
  'touch-none select-none',
  /** 禁用 / disabled */
  'data-[disabled]:opacity-50',
  /** 垂直方向 / vertical */
  'data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col'
]);

export const sliderTrackVariants = cva([
  /** 主题 / theme */
  'bg-muted',
  /** 定位 / position */
  'relative',
  /** 布局 / layout */
  'grow overflow-hidden rounded-full',
  /** 水平方向 / horizontal */
  'data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full',
  /** 垂直方向 / vertical */
  'data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5'
]);

export const sliderRangeVariants = cva([
  /** 主题 / theme */
  'bg-primary',
  /** 定位 / position */
  'absolute',
  /** 水平方向 / horizontal */
  'data-[orientation=horizontal]:h-full',
  /** 垂直方向 / vertical */
  'data-[orientation=vertical]:w-full'
]);

export const sliderThumbVariants = cva([
  /** 主题 / theme */
  'border-primary bg-background ring-ring/50',
  /** 布局 / layout */
  'block size-4 shrink-0 rounded-full border shadow-sm',
  /** 动画 / transition */
  'transition-[color,box-shadow]',
  /** 交互 / interaction */
  'hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden',
  /** 禁用 / disabled */
  'disabled:pointer-events-none disabled:opacity-50'
]);
