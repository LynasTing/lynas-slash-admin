import { cva } from 'class-variance-authority';

export const otpSlotVariants = cva([
  // 基础布局 & 外观
  'relative flex h-9 w-9 items-center justify-center border-input border-y border-r text-sm shadow-xs transition-all outline-none',
  // 主题 / 暗色模式
  'dark:bg-input/30',
  // 圆角（基于位置）
  'first:rounded-l-md first:border-l last:rounded-r-md',
  // 激活状态（类似 focus-visible）
  'data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:ring-[3px] data-[active=true]:z-10',
  // 错误状态 / 可访问性
  'aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40'
]);
