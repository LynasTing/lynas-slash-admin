import Color from 'color';
import { commonColors, paletteColors } from './color';

/**
 * 浅色主题阴影 Tokens / Light theme shadow tokens
 * - 用于统一管理不同元素和场景下的阴影效果
 * - 值为标准 CSS box-shadow 字符串
 */
export const lightShadowTokens = {
  /** 无阴影 / No shadow */
  none: 'none',

  /** 小阴影 / Small shadow */
  sm: `0 1px 2px 0 ${Color(paletteColors.gray[500]).alpha(0.16)}`,

  /** 默认阴影 / Default shadow */
  default: `0 4px 8px 0 ${Color(paletteColors.gray[500]).alpha(0.16)}`,

  /** 中等阴影 / Medium shadow */
  md: `0 8px 16px 0 ${Color(paletteColors.gray[500]).alpha(0.16)}`,

  /** 大阴影 / Large shadow */
  lg: `0 12px 24px 0 ${Color(paletteColors.gray[500]).alpha(0.16)}`,

  /** 超大阴影 / Extra large shadow */
  xl: `0 16px 32px 0 ${Color(paletteColors.gray[500]).alpha(0.16)}`,

  /** 2x 超大阴影 / 2x Extra large shadow */
  '2xl': `0 20px 40px 0 ${Color(paletteColors.gray[500]).alpha(0.16)}`,

  /** 3x 超大阴影 / 3x Extra large shadow */
  '3xl': `0 24px 48px 0 ${Color(paletteColors.gray[500]).alpha(0.16)}`,

  /** 内阴影 / Inner shadow */
  inner: `inset 0 2px 4px 0 ${Color(paletteColors.gray[500]).alpha(0.16)}`,

  /** Dialog 弹窗阴影 / Dialog shadow */
  dialog: `-40px 40px 80px -8px ${Color(commonColors.black).alpha(0.24)}`,

  /** 卡片阴影 / Card shadow */
  card: `0 0 2px 0 ${Color(paletteColors.gray[500]).alpha(0.2)}, 0 12px 24px -4px ${Color(paletteColors.gray[500]).alpha(0.12)}`,

  /** 下拉菜单阴影 / Dropdown shadow */
  dropdown: `0 0 2px 0 ${Color(paletteColors.gray[500]).alpha(0.24)}, -20px 20px 40px -4px ${Color(paletteColors.gray[500]).alpha(0.24)}`,

  /** 主题色 primary 阴影 / Primary color shadow */
  primary: `0 8px 16px 0 ${Color(paletteColors.primary.default).alpha(0.24)}`,

  /** 信息色 info 阴影 / Info color shadow */
  info: `0 8px 16px 0 ${Color(paletteColors.info.default).alpha(0.24)}`,

  /** 成功色 success 阴影 / Success color shadow */
  success: `0 8px 16px 0 ${Color(paletteColors.success.default).alpha(0.24)}`,

  /** 警告色 warning 阴影 / Warning color shadow */
  warning: `0 8px 16px 0 ${Color(paletteColors.warning.default).alpha(0.24)}`,

  /** 错误色 error 阴影 / Error color shadow */
  error: `0 8px 16px 0 ${Color(paletteColors.error.default).alpha(0.24)}`
};

/**
 * 深色主题阴影 Tokens / Dark theme shadow tokens
 * - 类似 lightShadowTokens，但基础灰色改为黑色以适应深色背景
 */
export const darkShadowTokens = {
  none: 'none',
  sm: `0 1px 2px 0 ${Color(commonColors.black).alpha(0.16)}`,
  default: `0 4px 8px 0 ${Color(commonColors.black).alpha(0.16)}`,
  md: `0 8px 16px 0 ${Color(commonColors.black).alpha(0.16)}`,
  lg: `0 12px 24px 0 ${Color(commonColors.black).alpha(0.16)}`,
  xl: `0 16px 32px 0 ${Color(commonColors.black).alpha(0.16)}`,
  '2xl': `0 20px 40px 0 ${Color(commonColors.black).alpha(0.16)}`,
  '3xl': `0 24px 48px 0 ${Color(commonColors.black).alpha(0.16)}`,
  inner: `inset 0 2px 4px 0 ${Color(commonColors.black).alpha(0.16)}`,

  dialog: `-40px 40px 80px -8px ${Color(commonColors.black).alpha(0.24)}`,
  card: `0 0 2px 0 ${Color(commonColors.black).alpha(0.2)}, 0 12px 24px -4px ${Color(commonColors.black).alpha(0.12)}`,
  dropdown: `0 0 2px 0 ${Color(commonColors.black).alpha(0.24)}, -20px 20px 40px -4px ${Color(commonColors.black).alpha(0.24)}`,

  primary: `0 8px 16px 0 ${Color(paletteColors.primary.default).alpha(0.24)}`,
  info: `0 8px 16px 0 ${Color(paletteColors.info.default).alpha(0.24)}`,
  success: `0 8px 16px 0 ${Color(paletteColors.success.default).alpha(0.24)}`,
  warning: `0 8px 16px 0 ${Color(paletteColors.warning.default).alpha(0.24)}`,
  error: `0 8px 16px 0 ${Color(paletteColors.error.default).alpha(0.24)}`
};
