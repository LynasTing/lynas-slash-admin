import { cva } from 'class-variance-authority';

export const dialogOverlayVriants = cva([
  /** 状态动画 / State-based animation (open / close) */
  'data-[state=open]:animate-in data-[state=closed]:animate-out',
  /** 透明度动画 / Opacity transition */
  'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
  /** 基础布局 / Base layout (full-screen overlay) */
  'fixed inset-0',
  /** 层级 / Z-index */
  'z-50',
  /** 背景遮罩 / Backdrop */
  'bg-black/50'
]);

export const dialogContentVriants = cva([
  /** 主题 / Theme (text & background) */
  'text-text-primary bg-background',
  /** 状态动画 / State-based animation (open / close) */
  'data-[state=open]:animate-in data-[state=closed]:animate-out',
  /** 透明度动画 / Opacity transition */
  'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
  /** 缩放动画 / Scale transition */
  'data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95',
  /** 动画时长 / Animation duration */
  'duration-200',
  /** 定位方式 / Positioning (centered modal) */
  'fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]',
  /** 层级 / Z-index */
  'z-50',
  /** 布局 / Layout */
  'grid gap-4',
  /** 尺寸限制 / Size constraints */
  'w-full max-w-[calc(100%-2rem)] sm:max-w-lg',
  /** 外观 / Appearance */
  'rounded-lg border p-6 shadow-lg'
]);

export const dialogCloseVriants = cva([
  /** 定位与布局 / Position & layout */
  'absolute top-4 right-4 rounded-xs',
  /** 可见性与动画 / Visibility & transition */
  'opacity-70 transition-opacity hover:opacity-100',
  /** 打开状态 / Open state */
  'data-[state=open]:bg-accent data-[state=open]:text-muted-foreground',
  /** 焦点与环形样式 / Focus & ring */
  'focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background',
  /** 禁用状态 / Disabled state */
  'disabled:pointer-events-none',
  /** 图标基础行为 / Icon base behavior */
  '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  /** 图标尺寸 / Icon size */
  '[&_svg:not([class*="size-"])]:size-4'
]);
