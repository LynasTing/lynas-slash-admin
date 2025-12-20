import { cva } from 'class-variance-authority';

export const contentVariants = cva([
  /** 主题 / Theme（背景 + 文字颜色） */
  'bg-popover-foreground text-popover',
  /** 层级 / Z-index */
  'z-50',
  /** 尺寸 / Size */
  'w-fit',
  /** 布局 / Layout */
  'rounded-md px-3 py-1.5 text-xs text-balance',
  /** 变换原点 / Transform origin（Radix Tooltip 专用） */
  'origin-(--radix-tooltip-content-transform-origin)',
  /** 基础动画（进入） / Enter animation */
  'animate-in fade-in-0 zoom-in-95',
  /** 基础动画（退出） / Exit animation */
  'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
  /** 方向动画（根据 Tooltip 出现方向） / Directional animation (Radix side) */
  'data-[side=bottom]:slide-in-from-top-2',
  'data-[side=left]:slide-in-from-right-2',
  'data-[side=right]:slide-in-from-left-2',
  'data-[side=top]:slide-in-from-bottom-2'
]);

export const arrowVariants = cva([
  /** 主题 / Theme（背景色 + SVG 填充色） */
  'bg-popover-foreground fill-popover-foreground',
  /** 层级 / Z-index */
  'z-50',
  /** 尺寸 / Size */
  'size-2.5',
  /** 位置微调 / Position offset（对齐 Tooltip 气泡） */
  'translate-y-[calc(-50%_-_2px)]',
  /** 形状 / Shape（旋转成菱形，作为箭头） */
  'rotate-45 rounded-[2px]'
]);
