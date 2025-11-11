/**
 * @description 操作 localStorage
 * @author LynasTing
 * @date 2025-10-31
 */

import type { StorageEnum } from '#/enum';

const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';

export const getItem = <T>(key: StorageEnum): T | null => {
  if (!isBrowser) return null;

  let value = null;
  try {
    const result = localStorage.getItem(key);
    if (result) {
      value = JSON.parse(result);
    }
  } catch (error) {
    console.error(error);
  }
  return value;
};

export const getStringItem = (key: StorageEnum): string | null => {
  if (!isBrowser) return null;

  return localStorage.getItem(key);
};
