import { lazy } from 'react';

type LazyImport = () => Promise<{
  default: React.ComponentType<unknown>;
}>;
/** 明确 glob 的类型 / confirm the type of glob */
const Pages = import.meta.glob('/src/pages/**/*.tsx') as Record<string, LazyImport>;

type lazyComponent = React.LazyExoticComponent<React.ComponentType<unknown>>;
/** 缓存 / cache */
const lazyComponentCache = new Map<string, lazyComponent>();

/**
 * 根据路径加载组件
 * load component by path
 *
 * @param path - 组件路径
 */
export const loadComponentFormPath = (path: string) => {
  const pathArr = path.split('/');
  pathArr.unshift('/src');

  /** 自动补全 .tsx 后缀 / automatically add .tsx suffix */
  if (!pathArr.some(i => i.endsWith('.tsx'))) {
    pathArr.push('index.tsx');
  }

  return Pages[pathArr.join('/')];
};

/**
 * 根据路径字符串，返回对应的 React.lazy 组件
 * get React.lazy component by path
 *
 * @example /user/profile.tsx
 * @example /user/profile/index.tsx
 */
export const getLazyComponent = (path: string) => {
  const importFunc = Pages[`/src${path}.tsx`] ?? Pages[`/src${path}/index.tsx`];
  if (!importFunc) {
    console.warn(`getLazyComponent not found for path + ::>>`, path);
    return null;
  }

  let Element = lazyComponentCache.get(path);
  if (!Element) {
    Element = lazy(importFunc);
    lazyComponentCache.set(path, Element);
  }

  return Element;
};
