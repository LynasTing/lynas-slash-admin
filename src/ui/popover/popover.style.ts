import { cva } from 'class-variance-authority';

export const popoverContentVariants = cva([
  /** 主题 / Theme（背景 + 文字颜色） */
  'bg-popover text-popover-foreground',
  /** 层级 / Z-index */
  'z-50',
  /** 尺寸与外观 / Size and appearance */
  'w-72 rounded-md border p-4 shadow-md outline-hidden',
  /** 变换原点 / Transform origin（Radix Popover 专用） */
  'origin-(--radix-popover-content-transform-origin)',
  /** 动画开关 / Animation lifecycle（进入 / 退出） */
  'data-[state=closed]:animate-out data-[state=open]:animate-in',
  /** 淡入淡出 / Fade in and out */
  'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  /** 缩放 / Scale */
  'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
  /** 位移方向 / Slide direction（根据 side） */
  'data-[side=bottom]:slide-in-from-top-2',
  'data-[side=left]:slide-in-from-right-2',
  'data-[side=right]:slide-in-from-left-2',
  'data-[side=top]:slide-in-from-bottom-2'
]);
