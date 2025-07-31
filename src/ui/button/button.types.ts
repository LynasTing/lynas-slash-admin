import type { VariantProps } from 'class-variance-authority';
import type { buttonVariants } from './button.css';
import type * as React from 'react';

/**
 * Button 组件的 Props 类型定义
 *
 * 继承了原生 HTML <button> 元素的所有属性，并支持通过 variant 和 size 控制样式变体
 * 同时支持通过 asChild 属性 将 Button 渲染为任意自定义组件 (如 <a>、<Link>、<div> 等)
 *
 *
 * Button component props
 *
 * Inherits all attributes of the native <button> element and supports variant and size control
 * The same time supports rendering as any custom component (such as <a>、<Link>、<div> etc.)
 */
export interface ButtonProps
  /**
   * 继承所有原生 button 属性
   * extends all native button attributes
   */
  extends React.ButtonHTMLAttributes<HTMLElement>,
    /**
     * 根据 buttonVariants 变体系统自动推导 variant 和 size
     * Infer variant and size based on buttonVariants variant system
     */
    VariantProps<typeof buttonVariants> {
  /**
   * 是否将组件作为子元素渲染
   *
   * 默认为false，会渲染成 <button> 标签
   * 如果为true，组件将不会渲染 <button>，而是把子元素包裹，并将 className 和 事件等 props 传递给子元素
   * 常用于将按钮样式和行为应用到自定义组件（如 Link、RouterLink、a 标签等）
   *
   * Whether to render the component as a child element
   *
   * Default to false, will render as <button>
   * If true, the component will not render <button>, but wrap the child element and pass className and event props to the child element
   * Commonly used to apply button styles and behaviors to custom components (such as Link, RouterLink, a tag, etc.)
   *
   * @example
   * ```tsx
   * <Button asChild>
   *   <a href="#">Link...</a>
   * </Button>
   */

  asChild?: boolean;
}
