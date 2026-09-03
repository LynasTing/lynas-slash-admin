/**
 * HTTP 基础状态码
 *
 * Basic HTTP status codes
 */
export const HTTP_BASIC_STATUS_MAP = {
  /**
   * 成功
   *
   * Success
   */
  SUCCESS: 200,

  /**
   * 通用失败（除特定场景外的失败）
   *
   * Generic failure
   */
  FAIL: 500
} as const;

/**
 * HTTP 基础状态码类型
 *
 * 最终得到的类型：
 *
 * 200 | 500
 *
 * 下面这段类型表达式可以拆成三步理解：
 *
 * 第一步：
 *
 * typeof HTTP_BASIC_STATUS_MAP
 *
 * 获取 `HTTP_BASIC_STATUS_MAP` 这个变量对应的 TypeScript 类型：
 *
 * {
 *   readonly SUCCESS: 200;
 *   readonly FAIL: 500;
 * }
 *
 * 第二步：
 *
 * keyof typeof HTTP_BASIC_STATUS_MAP
 *
 * `keyof` 用来获取对象类型中所有属性名，
 * 因此得到：
 *
 * "SUCCESS" | "FAIL"
 *
 * 第三步：
 *
 * (typeof HTTP_BASIC_STATUS_MAP)[keyof typeof HTTP_BASIC_STATUS_MAP]
 *
 * 使用索引访问类型，根据：
 *
 * "SUCCESS" | "FAIL"
 *
 * 去读取对象类型中对应属性的 value 类型，
 * 最终得到：
 *
 * 200 | 500
 *
 * 所以：
 *
 * const status: HttpBasicStatus = 200; // 正确
 * const status: HttpBasicStatus = 500; // 正确
 * const status: HttpBasicStatus = 404; // 类型错误
 *
 * 可以简单记忆：
 *
 * typeof obj
 * -> 获取对象类型
 *
 * keyof typeof obj
 * -> 获取对象所有 key 的联合类型
 *
 * (typeof obj)[keyof typeof obj]
 * -> 获取对象所有 value 的联合类型
 */
export type HttpBasicStatus = (typeof HTTP_BASIC_STATUS_MAP)[keyof typeof HTTP_BASIC_STATUS_MAP];

export interface Api<T = unknown> {
  /**
   * 业务状态码
   *
   * Business status code
   */
  code: HttpBasicStatus;

  /**
   * 响应消息
   *
   * Response message
   */
  message: string;

  /**
   * 响应数据
   *
   * Response data
   */
  data: T;
}

export interface Page<T> {
  /**
   * 当前页记录
   *
   * Records on the current page
   */
  records: T[];

  /**
   * 总数
   *
   * Total number of matching records
   */
  total: number;
}
