import { Collapsible as CollapsiblePrimitive } from 'radix-ui';
import { m, type Transition, type Variants } from 'motion/react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/utils';

type NavMotionCollapsibleContentProps = Omit<ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent>, 'children'> & {
  /**
   * 当前折叠内容是否展开。
   * Whether the collapsible content is currently open.
   */
  open: boolean;

  /**
   * 折叠区域内容。
   * Collapsible area content.
   */
  children: ReactNode;
};

/**
 * 高度是折叠菜单的主动画，时长需要覆盖完整的展开/收起过程，避免内容区域突然截断。
 *
 * Height is the primary animation for the collapsible menu, so its duration should cover
 * the full expand/collapse process and avoid abrupt clipping.
 */
const heightTransition: Transition = {
  duration: 0.24,
  ease: [0.4, 0, 0.2, 1]
};

/**
 * 透明度只用于弱化文字在高度压缩时的挤压感，因此使用更短时长让内容更早淡出。
 *
 * Opacity only reduces the visual squeezing while height collapses, so it uses a shorter
 * duration to fade content out earlier.
 */
const opacityTransition: Transition = {
  duration: 0.14,
  ease: [0.4, 0, 0.2, 1]
};

/**
 * 将导航展开状态映射为 Motion 动画状态，集中管理高度和透明度的过渡参数。
 *
 * Maps navigation open state to Motion animation states and keeps height/opacity
 * transition settings in one place.
 */
const navMotionCollapsibleVariants: Variants = {
  open: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: heightTransition,
      opacity: opacityTransition
    }
  },
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      height: heightTransition,
      opacity: opacityTransition
    }
  }
};

/**
 * 侧边栏专用的折叠内容动画组件。
 *
 * 这个组件保留 Radix Collapsible 的状态语义，同时用 Motion 接管高度和透明度动画，
 * 避免继续依赖全局 CSS keyframe 的收起动画。
 *
 * Sidebar-specific animated collapsible content.
 *
 * It keeps Radix Collapsible state semantics while Motion controls height and opacity,
 * so the sidebar no longer relies on global CSS keyframes for the closing animation.
 */
export function NavMotionCollapsibleContent({ open, className, children, ...props }: NavMotionCollapsibleContentProps) {
  return (
    <CollapsiblePrimitive.CollapsibleContent forceMount asChild {...props}>
      <m.div
        initial={false}
        animate={open ? 'open' : 'closed'}
        variants={navMotionCollapsibleVariants}
        className={cn('overflow-hidden will-change-[height,opacity]', className)}>
        {children}
      </m.div>
    </CollapsiblePrimitive.CollapsibleContent>
  );
}
