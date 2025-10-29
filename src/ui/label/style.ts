import { cva } from 'class-variance-authority';

export const labelVariants = cva([
  // 布局
  'flex items-center gap-2',
  // 文本
  'text-sm leading-none font-medium',
  // 交互
  'select-none',
  // group 状态相关（父元素禁用状态）
  'group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50',
  // peer 状态相关（相邻元素禁用状态）
  'peer-disabled:cursor-not-allowed peer-disabled:opacity-50'
]);
