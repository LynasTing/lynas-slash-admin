import { breakpointsTokens } from './breakpoint';

/**
 * 基础主题 Tokens / Base theme tokens
 * - 用于管理全局的基础设计系统值，如间距、圆角、断点、透明度、层级
 */
export const baseThemeTokens = {
  /** 间距 / Spacing (单位 px) */
  spacing: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    7: '28px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
    24: '96px',
    32: '128px'
  },

  /** 圆角 / Border radius */
  borderRadius: {
    // 无圆角 / No radius
    none: '0px',
    // 小圆角 / Small
    sm: '2px',
    // 默认 / Default
    default: '4px',
    // 中等 / Medium
    md: '6px',
    // 大 / Large
    lg: '8px',
    // 特大 / Extra large
    xl: '12px',
    // 完全圆角（圆形） / Full circle
    full: '9999px'
  },

  /** 响应式断点 / Breakpoints for responsive design */
  screens: breakpointsTokens,

  /** 透明度 / Opacity */
  opacity: {
    // 完全透明 / Fully transparent
    0: '0%',
    5: '5%',
    10: '10%',
    20: '20%',
    25: '25%',
    30: '30%',
    35: '35%',
    40: '40%',
    45: '45%',
    50: '50%',
    55: '55%',
    60: '60%',
    65: '65%',
    70: '70%',
    75: '75%',
    80: '80%',
    85: '85%',
    90: '90%',
    95: '95%',
    // 完全不透明 / Fully opaque
    100: '100%',
    // 用于边框 / Border opacity
    border: '20%',
    // 悬停状态 / Hover state
    hover: '8%',
    // 选中状态 / Selected state
    selected: '16%',
    // 聚焦状态 / Focus state
    focus: '24%',
    // 禁用元素 / Disabled element
    disabled: '80%',
    // 禁用背景 / Disabled background
    disabledBackground: '24%'
  },

  /** 层级 / Z-index for stacking context */
  zIndex: {
    // 顶部应用栏 / Top navigation bar
    appBar: '10',
    // 导航栏 / Navigation bar
    nav: '20',
    // 抽屉/侧边菜单 / Drawer / Sidebar
    drawer: '50',
    // 弹窗 / Modal / Dialog
    modal: '50',
    // 通知/提示消息 / Snackbar / Toast
    snackbar: '50',
    // 提示气泡 / Tooltip
    tooltip: '50',
    // 滚动条 / Scrollbar
    scrollbar: '100'
  }
};
