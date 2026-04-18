import { cva } from 'class-variance-authority';

export const selectTriggerVariants = cva(
  [
    /** 基础外观 / Base appearance */
    'border border-input bg-transparent shadow-xs rounded-md',

    /** 布局 / Layout */
    'flex w-fit items-center justify-between gap-2 whitespace-nowrap',

    /** 文本 / Typography */
    'text-sm',

    /** 内边距 / Spacing */
    'px-3 py-2',

    /** 状态控制 / State styles */
    'data-[placeholder]:text-muted-foreground',
    'disabled:cursor-not-allowed disabled:opacity-50',

    /** focus / invalid 状态 / Focus & invalid */
    'outline-none transition-[color,box-shadow]',
    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    'aria-invalid:border-destructive',
    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',

    /** 暗黑模式 / Dark mode */
    'dark:bg-input/30 dark:hover:bg-input/50',

    /** SVG 控制 / SVG handling */
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    "[&_svg:not([class*='size-'])]:size-4",
    "[&_svg:not([class*='text-'])]:text-muted-foreground",

    /** Value slot 控制 / Value slot layout */
    '*:data-[slot=select-value]:line-clamp-1',
    '*:data-[slot=select-value]:flex',
    '*:data-[slot=select-value]:items-center',
    '*:data-[slot=select-value]:gap-2'
  ],
  {
    variants: {
      size: {
        sm: 'h-8 px-2 text-xs',
        md: 'h-9 px-3 text-sm',
        lg: 'h-10 px-4 text-base',
        xl: 'h-11 px-5 text-lg'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
);

const selectVariants = {
  position: {
    popper: {
      content:
        'data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1',
      viewport: 'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1'
    },

    'item-aligned': {
      content: '',
      viewport: ''
    }
  }
};

export const selectContentVariants = cva(
  [
    /** 基础外观 / Base appearance */
    'bg-popover text-popover-foreground rounded-md border shadow-md',

    /** 布局与定位 / Layout & positioning */
    'relative z-50 min-w-[8rem] overflow-x-hidden overflow-y-auto',
    'max-h-(--radix-select-content-available-height)',
    'origin-(--radix-select-content-transform-origin)',

    /** 状态动画 / State-based animations */
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
    'data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95',

    /** 方向动画 / Directional slide animations */
    'data-[side=bottom]:slide-in-from-top-2',
    'data-[side=top]:slide-in-from-bottom-2',
    'data-[side=left]:slide-in-from-right-2',
    'data-[side=right]:slide-in-from-left-2'
  ],
  {
    variants: {
      position: {
        popper: selectVariants.position.popper.content,
        'item-aligned': selectVariants.position['item-aligned'].content
      }
    },
    defaultVariants: {
      position: 'popper'
    }
  }
);

export const selectViewportVariants = cva(['p-1'], {
  variants: {
    position: {
      popper: selectVariants.position.popper.viewport,
      'item-aligned': selectVariants.position['item-aligned'].viewport
    }
  },
  defaultVariants: {
    position: 'popper'
  }
});

export const selectItemVariants = cva([
  /** 聚焦状态 / Focus state */
  'focus:bg-accent focus:text-accent-foreground',

  /** SVG 图标 / Icons */
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg:not([class*='size-'])]:size-4",

  /** 布局与基础 / Layout & base */
  'relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm select-none outline-hidden',

  /** 禁用状态 / Disabled state */
  'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',

  /** 子元素 span 排列 / Last span alignment */
  '*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2'
]);
