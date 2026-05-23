import { cva } from 'class-variance-authority';

export const radioGroupVariants = cva(['grid gap-3']);

export const radioGroupItemVariants = cva([
  // 布局 / layout
  'aspect-square size-4 shrink-0',
  // 外观 / appearance
  'rounded-full border border-input text-primary shadow-xs dark:bg-input/30',
  // 交互 / interaction
  'transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
  // 状态 / state
  'disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40'
]);

export const radioGroupIndicatorVariants = cva(['relative flex items-center justify-center']);

export const radioGroupIconVariants = cva(['absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 fill-primary']);
