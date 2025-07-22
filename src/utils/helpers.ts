import { type ClassValue , clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * merge class names using clsx and tailwind-merge
 * 合并类名
 * @param inputs - class names to merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
