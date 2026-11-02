/**
 * 通用布尔数值。
 * Common numeric boolean values.
 */
export const BOOLEAN_VALUE_MAP = {
  /**
   * 是 / 真，值为 1。
   * Yes / true; represented by 1.
   */
  TRUE: 1,

  /**
   * 否 / 假，值为 0。
   * No / false; represented by 0.
   */
  FALSE: 0
} as const;

export type BooleanValue = (typeof BOOLEAN_VALUE_MAP)[keyof typeof BOOLEAN_VALUE_MAP];

/**
 * 分页查询通用请求参数
 * Common page query request parameters
 */
export interface PageRequest {
  /**
   * 当前页码
   */
  pageNum: number;

  /**
   * 每页数据条数
   */
  pageSize: number;
}
