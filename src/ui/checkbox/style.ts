import { cva } from 'class-variance-authority';

export const checkboxVariants = cva([
  // 基础布局
  'peer size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none',
  // 状态样式（由Radix data-state 自动触发）
  'border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary',
  // 交互反馈
  'focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-50'
]);
