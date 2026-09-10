import { cva } from 'class-variance-authority';

export const inputVariants = cva([
  // 基础布局 & 外观
  'flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none',
  // 文本 & 占位符
  'selection:bg-primary selection:text-primary-foreground file:text-foreground placeholder:text-muted-foreground',
  // 文件选择
  'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
  // 禁用状态
  'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
  // 响应式
  'md:text-sm',
  // 焦点状态
  'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
  // 错误状态 / 可访问性
  'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40'
]);
