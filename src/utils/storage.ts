/**
 * @description 操作 localStorage
 * @author LynasTing
 * @date 2025-10-31
 */

import type { StorageEnum } from '#/enum';

export const getItem = <T>(key: StorageEnum): T | null => {
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
  return localStorage.getItem(key);
};
