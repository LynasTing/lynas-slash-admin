// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import numeral from 'numeral';

type InputValue = string | number | null | undefined;

/**
 * 移除小数点后的 0
 * Remove trailing zeros after the decimal point
 *
 * @param value - 输入值
 * @param target - 小数点后的目标值
 *
 * @example 1.00 -> 1
 */
export function removeTrailingZeros(value: string, target = '.00') {
  return value.includes(target) ? value.replace(target, '') : value;
}

/**
 * 格式化字节
 * Format bytes
 *
 * @param number - 输入值
 *
 * @example 1024 -> 1.00 KB
 */
export function formatBytes(number: InputValue) {
  return removeTrailingZeros(number ? numeral(number).format('0.00 b') : '');
}

/**
 * 格式化数字
 * Format number
 *
 * @param number - 输入值
 *
 * @example 1000 -> 1,000
 */
export function formatNumber(number: InputValue) {
  return numeral(number).format();
}
