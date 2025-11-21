import { getLazyComponent } from './load';

/**
 * 动态加载组件
 * Dynamic load component
 *
 * @param path - 组件路径 / component path
 * @param props - 组件属性 / component props
 */
export const Component = (path: string, props?: Record<string, unknown>) => {
  const Element = getLazyComponent(path);
  if (!Element) return null;

  return <Element {...props} />;
};
