import { cva } from 'class-variance-authority';

export const toggleGroupVariants = cva([
  /** 布局 / layout */
  'group/toggle-group flex w-fit items-center rounded-md',
  /** 轮廓变体 / outline variant */
  'data-[variant=outline]:shadow-xs'
]);

export const toggleGroupItemVariants = cva([
  /** 布局 / layout */
  'min-w-0 flex-1 shrink-0',
  /** 圆角 / radius */
  'rounded-none first:rounded-l-md last:rounded-r-md',
  /** 阴影 / shadow */
  'shadow-none',
  /** 焦点 / focus */
  'focus:z-10 focus-visible:z-10',
  /** 轮廓变体 / outline variant */
  'data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l'
]);
