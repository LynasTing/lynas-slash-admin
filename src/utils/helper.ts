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
