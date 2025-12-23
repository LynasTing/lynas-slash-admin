import { cva } from 'class-variance-authority';

export const contentVariants = cva([
  /** 基础布局 / Base layout */
  'w-64 rounded-md border p-4 outline-hidden',
  /** 层级 / Z-index */
  'z-50',
  /** 主题 / Theme（背景 + 文字颜色） */
  'bg-popover text-popover-foreground',
  /** 阴影 / Shadow */
  'shadow-md',
  /** 动画原点 / Transform origin（Radix 计算） */
  'origin-(--radix-hover-card-content-transform-origin)',
  /** 动画开关 / Animation lifecycle（进入 / 退出） */
  'data-[state=open]:animate-in data-[state=closed]:animate-out',
  /** 淡入淡出 / Fade in & out */
  'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
  /** 缩放 / Scale */
  'data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95',
  /** 位移方向 / Slide direction（根据 side） */
  'data-[side=top]:slide-in-from-bottom-2',
  'data-[side=bottom]:slide-in-from-top-2',
  'data-[side=left]:slide-in-from-right-2',
  'data-[side=right]:slide-in-from-left-2'
]);
