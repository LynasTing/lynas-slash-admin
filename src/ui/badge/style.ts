import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  [
    // layout & spacing 布局和间距
    'inline-flex items-center justify-center gap-1 px-2 py-0.5 w-fit whitespace-nowrap shrink-0 overflow-hidden',
    // typography 排版
    'text-xs font-medium',
    // shape & appearance 形状与外观
    'border',
    // icon control 图标控制
    '[&>svg]:size-3 [&>svg]:pointer-events-none',
    // interaction & accessibility 交互与无障碍
    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
    // transition 动效
    'transition-[color,box-shadow]'
  ],
  {
    variants: {
      variant: {
        // 默认
        default:
          'border-transparent bg-primary/20 text-primary-dark [a&]:hover:bg-primary/10 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40 dark:text-primary-light',
        // 次要
        secondary: 'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        // 危险
        destructive:
          'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        // 信息
        info: 'border-transparent bg-info/20 text-info-dark [a&]:hover:bg-info/10 focus-visible:ring-info/20 dark:focus-visible:ring-info/40  dark:text-info-light',
        // 警告
        warning:
          'border-transparent bg-warning/20 text-warning-dark [a&]:hover:bg-warning/10 focus-visible:ring-warning/20 dark:focus-visible:ring-warning/40 dark:text-warning-light',
        // 成功
        success:
          'border-transparent bg-success/20 text-success-dark [a&]:hover:bg-success/10 focus-visible:ring-success/20 dark:focus-visible:ring-success/40 dark:text-success-light',
        // 错误
        error:
          'border-transparent bg-error/20 text-error-dark [a&]:hover:bg-error/10 focus-visible:ring-error/20 dark:focus-visible:ring-error/40 dark:text-error-light',
        // 轮廓
        outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground'
      },
      shape: {
        /**
         * 圆形徽标（数量型）
         * 用于展示简短数值或计数信息，如未读数、消息数量
         * 特点：固定宽高，内容通常为 1–2 位字符
         *
         * Circle badge for numeric values
         * Used to display small numeric counts such as unread messages or notifications
         * Feature: fixed width & height, usually 1–2 characters
         */
        circle: 'rounded-full w-5 h-5 p-0',

        /**
         * 方形徽标（文本型 / 默认形态）
         * 用于展示状态、标签或类型文本，如“已完成”“进行中”
         * 特点：宽度随内容自适应，使用频率最高
         *
         * Square badge for text labels (default)
         * Used for status, labels, or categories such as "Completed" or "In Progress"
         * Feature: width adapts to content, most commonly used shape
         */
        square: 'rounded-md',

        /**
         * 圆点徽标（状态指示）
         * 用于表示状态是否存在，不承载具体文本
         * 常见场景：在线状态、新消息提示、告警提示
         *
         * Dot badge for status indication
         * Used to indicate presence of a state without displaying text
         * Common use cases: online status, new message indicator, alerts
         */
        dot: 'rounded-full w-2 h-2 p-0'
      }
    },
    defaultVariants: {
      variant: 'default',
      shape: 'square'
    }
  }
);
