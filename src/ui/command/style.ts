import { cva } from 'class-variance-authority';

export const commandVriants = cva(['bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md']);

export const commandDialogVriants = cva([
  /** 布局 / Layout */
  'data-[slot=command-input-wrapper]:h-12',
  '[&_cmdk-group]:px-2',
  '[&_cmdk-group]:not([hidden])_~[cmdk-group]:pt-0',
  '[&_cmdk-input]:h-12',
  '[&_cmdk-item]:px-2',
  '[&_cmdk-item]:py-3',
  /** 文本 / Text */
  '[&_cmdk-group-heading]:text-muted-foreground',
  '[&_cmdk-group-heading]:font-medium',
  /** 图标 / SVG */
  '[&_cmdk-input-wrapper]_svg:h-5',
  '[&_cmdk-input-wrapper]_svg:w-5',
  '[&_cmdk-item]_svg:h-5',
  '[&_cmdk-item]_svg:w-5'
]);

export const commandInputVriants = cva([
  /** 布局 / Layout */
  'flex h-10 w-full py-3',
  /** 外观 / Appearance */
  'rounded-md bg-transparent',
  /** 文本 / Text */
  'text-sm placeholder:text-muted-foreground',
  /** 交互与可访问性 / Interaction & Accessibility */
  'outline-hidden disabled:cursor-not-allowed disabled:opacity-50'
]);

export const commandGroupVriants = cva([
  /** 基础文本颜色 / Base text color */
  'text-foreground',
  /** 布局与溢出控制 / Layout & overflow */
  'overflow-hidden p-1',
  /** Group heading 文本样式 / Group heading text style */
  '[&_cmdk-group-heading]:text-muted-foreground',
  '[&_cmdk-group-heading]:text-xs',
  '[&_cmdk-group-heading]:font-medium',
  /** Group heading 间距 / Group heading spacing */
  '[&_cmdk-group-heading]:px-2',
  '[&_cmdk-group-heading]:py-1.5'
]);

export const commandItemVriants = cva([
  /** 选中状态 / Selected state */
  'data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground',
  /** 禁用状态 / Disabled state */
  'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
  /** 基础布局 / Base layout */
  'relative flex items-center gap-2 px-2 py-1.5 rounded-sm',
  /** 文本样式 / Text style */
  'text-sm cursor-default select-none',
  /** 轮廓与可访问性 / Outline & accessibility */
  'outline-hidden',
  /** 图标基础行为 / Icon base behavior */
  '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  /** 图标尺寸 / Icon size */
  '[&_svg:not([class*="size-"])]:size-4',
  /** 图标默认颜色 / Icon default color */
  '[&_svg:not([class*="text-"])]:text-muted-foreground'
]);
