import { Collapsible as CollapsiblePrimitive } from 'radix-ui';
import { cn } from '@/utils';
import { forwardRef, ComponentRef, ComponentPropsWithoutRef } from 'react';

/**
 * Collapsible 根组件
 * Root component of Collapsible from Radix
 */
const Collapsible = CollapsiblePrimitive.Root;

/**
 * 触发器组件（用于控制展开/收起）
 * Trigger component used to toggle open/close state
 */
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

/**
 * Collapsible 内容区域组件
 * Collapsible content wrapper component
 *
 * 类型说明：
 * Type explanation:
 *
 * ComponentRef<typeof ...>
 * → 推导出该 Radix 组件的 ref 实例类型
 * → Infers the underlying ref instance type of the Radix component
 *
 * ComponentPropsWithoutRef<typeof ...>
 * → 获取该组件的所有 props（不包含 ref）
 * → Gets all props of the component (excluding ref)
 */
const CollapsibleContent = forwardRef<
  ComponentRef<typeof CollapsiblePrimitive.CollapsibleContent>,
  ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent>
>(
  /**
   * className：允许外部传入额外样式类
   * className: allows external custom class names
   *
   * children：内容区域的子元素
   * children: nested content inside collapsible
   *
   * ...props：其余所有传递给 Radix 原始组件的属性
   * ...props: all other props forwarded to Radix primitive
   *
   * ref：透传给底层 DOM 节点
   * ref: forwarded to the underlying DOM element
   */
  ({ className, children, ...props }, ref) => (
    <CollapsiblePrimitive.CollapsibleContent
      ref={ref}
      /**
       * overflow-hidden：
       * 防止动画展开/收起时内容溢出
       * Prevents overflow during open/close animation
       *
       * data-[state=open]:
       * 当组件处于展开状态时触发动画
       * Apply animation when state is open
       *
       * data-[state=closed]:
       * 当组件处于收起状态时触发动画
       * Apply animation when state is closed
       */
      className={cn('overflow-hidden', 'data-[state=open]:animate-collapsible-down', 'data-[state=closed]:animate-accordion-up', className)}
      {...props}>
      {children}
    </CollapsiblePrimitive.CollapsibleContent>
  )
);

CollapsibleContent.displayName = CollapsiblePrimitive.CollapsibleContent.displayName;

/**
 * 导出封装后的组件
 * Export wrapped components
 */
export { Collapsible, CollapsibleTrigger, CollapsibleContent };
