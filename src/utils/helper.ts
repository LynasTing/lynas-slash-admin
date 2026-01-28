import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * merge classnames
 * 合并className
 *
 * @param inputs 剩余参数，将多个参数收集成一个数组来处理
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 检查 resourcePool 中是否包含 item
 * Check if item is in resourcePool
 */
export const check = (item: string, resourcePool: string[]) => {
  return resourcePool.some(i => i === item);
};

/**
 * 检查 resourcePool 中是否包含 items
 * Check if items is in resourcePool
 */
export const checkAny = (items: string[], resourcePool: string[]) => items.some(i => check(i, resourcePool));
