import { cva } from 'class-variance-authority';

export const TabsListVariants = cva([
  /** 布局 / layout */
  'inline-flex items-center justify-center',
  /** 尺寸 / size */
  'h-9 w-fit p-[3px]',
  /** 外观 / appearance */
  'rounded-lg bg-muted text-muted-foreground'
]);

export const TabsTriggerVariants = cva([
  /** 布局 / layout */
  'inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap',
  /** 尺寸 / size */
  'h-[calc(100%-1px)] px-2 py-1',
  /** 排版 / typography */
  'text-sm font-medium',
  /** 外观 / appearance */
  'rounded-md border border-transparent text-foreground dark:text-muted-foreground',
  /** 状态 - 激活 / state - active */
  'data-[state=active]:bg-background data-[state=active]:shadow-sm',
  'dark:data-[state=active]:text-foreground',
  /** 状态 - 禁用 / state - disabled */
  'disabled:pointer-events-none disabled:opacity-50',
  /** 焦点 / focus */
  'focus-visible:border-ring',
  'focus-visible:ring-[3px] focus-visible:ring-ring/50',
  'focus-visible:outline-1 focus-visible:outline-ring',
  /** 动画 / motion */
  'transition-[color,box-shadow]',
  /** 子元素 - 图标 / children - icon */
  '[&_svg]:pointer-events-none',
  '[&_svg]:shrink-0',
  "[&_svg:not([class*='size-'])]:size-4"
]);
