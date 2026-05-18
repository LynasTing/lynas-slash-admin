import { cva } from 'class-variance-authority';

export const textareaVariants = cva([
  // 基础布局 & 外观
  'flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none',
  // 文本 & 占位符
  'placeholder:text-muted-foreground',
  // 禁用状态
  'disabled:cursor-not-allowed disabled:opacity-50',
  // 响应式
  'md:text-sm',
  // 焦点状态
  'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
  // 错误状态 / 可访问性
  'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
  // 暗色模式
  'dark:bg-input/30'
]);
