import { cva } from 'class-variance-authority';

export const switchRootVariants = cva([
  /** 布局 */
  'inline-flex h-[1.15rem] w-8 shrink-0 items-center',
  /** 外观 */
  'rounded-full border border-transparent shadow-xs',
  /** 状态 */
  'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80',
  /** 交互 */
  'peer outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
  /** 禁用 */
  'disabled:cursor-not-allowed disabled:opacity-50'
]);

export const switchThumbVariants = cva([
  /** 布局 / layout */
  'pointer-events-none block size-4',
  /** 外观 / appearance */
  'rounded-full bg-background ring-0',
  /** 暗黑模式 / dark */
  'dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground',
  /** 状态 / state */
  'data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0',
  /** 动画 / motion */
  'transition-transform'
]);
