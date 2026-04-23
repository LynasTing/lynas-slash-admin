/**
 * 时间筛选选项 / Time filter options
 *
 * @description
 * 用于图表维度切换（天 / 周 / 月）
 * 保证 value 是固定字面量，配合类型推导使用
 *
 * Used for switching chart dimensions (day / week / month)
 * Ensures value is a literal type for type inference safety
 */
export const timeOptions = [
  { label: 'dashboard.time.day', value: 'day' },
  { label: 'dashboard.time.week', value: 'week' },
  { label: 'dashboard.time.month', value: 'month' }
] as const;

/**
 * 时间类型键 / Time type key
 *
 * @description
 * 从 timeOptions 自动推导生成的联合类型
 * 保证 options 与类型永远一致，避免手动维护
 *
 * Derived union type from timeOptions
 * Ensures consistency between options and type definition
 */
export type TimeRange = (typeof timeOptions)[number]['value'];
