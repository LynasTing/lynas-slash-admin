import { cva } from 'class-variance-authority';

export const commandVariants = cva(['flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground']);

export const commandDialogVariants = cva([
  /** 布局 / Layout */
  '*:data-[slot=command-input-wrapper]:h-12',
  '[&_[cmdk-group]]:px-2',
  '[&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0',
  '[&_[cmdk-input]]:h-12',
  '[&_[cmdk-item]]:px-2',
  '[&_[cmdk-item]]:py-3',
  /** 文本 / Text */
  '[&_[cmdk-group-heading]]:text-muted-foreground',
  '[&_[cmdk-group-heading]]:font-medium',
  /** 图标 / SVG */
  '[&_[cmdk-input-wrapper]_svg]:h-5',
  '[&_[cmdk-input-wrapper]_svg]:w-5',
  '[&_[cmdk-item]_svg]:h-5',
  '[&_[cmdk-item]_svg]:w-5'
]);

export const commandInputVariants = cva([
  /** 布局 / Layout */
  'flex h-10 w-full py-3',
  /** 外观 / Appearance */
  'rounded-md bg-transparent',
  /** 文本 / Text */
  'text-sm placeholder:text-muted-foreground',
  /** 交互与可访问性 / Interaction & Accessibility */
  'outline-hidden disabled:cursor-not-allowed disabled:opacity-50'
]);

export const commandGroupVariants = cva([
  /** 基础文本颜色 / Base text color */
  'text-foreground',
  /** 布局与溢出控制 / Layout & overflow */
  'overflow-hidden p-1',
  /** Group heading 文本样式 / Group heading text style */
  '[&_[cmdk-group-heading]]:text-muted-foreground',
  '[&_[cmdk-group-heading]]:text-xs',
  '[&_[cmdk-group-heading]]:font-medium',
  /** Group heading 间距 / Group heading spacing */
  '[&_[cmdk-group-heading]]:px-2',
  '[&_[cmdk-group-heading]]:py-1.5'
]);

export const commandItemVariants = cva([
  /** 选中状态 / Selected state */
  'data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground',
  /** 禁用状态 / Disabled state */
  'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
  /** 基础布局 / Base layout */
  'relative flex items-center gap-2 rounded-sm px-2 py-1.5',
  /** 文本样式 / Text style */
  'cursor-default text-sm select-none',
  /** 轮廓与可访问性 / Outline & accessibility */
  'outline-hidden',
  /** 图标基础行为 / Icon base behavior */
  '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  /** 图标尺寸 / Icon size */
  '[&_svg:not([class*="size-"])]:size-4',
  /** 图标默认颜色 / Icon default color */
  '[&_svg:not([class*="text-"])]:text-muted-foreground'
]);
