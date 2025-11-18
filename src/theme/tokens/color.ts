import { ThemeColorPresets } from '#/enum';
import { rgbAlpha } from '@/utils';

/**
 * 主题色彩预设值集合
 * Predefined color palettes for each {@link ThemeColorPresets}.
 *
 * 每种配色方案都包含从浅到深的五个层级：
 * - lighter: 最浅色，用于 hover、背景或浅层渐变
 * - light: 较浅色，用于边框、标签背景等
 * - default: 主色（核心主题色）
 * - dark: 深色，用于文字、深色按钮背景等
 * - darker: 最深色，用于强调或悬停状态
 *
 * These values are used to generate CSS variables
 * for dynamic theme switching and palette customization.
 */
export const presetsColors = {
  [ThemeColorPresets.Default]: {
    lighter: '#C8FAD6',
    light: '#5BE49B',
    default: '#00A76F',
    dark: '#007867',
    darker: '#004B50'
  },
  [ThemeColorPresets.Cyan]: {
    lighter: '#CCF4FE',
    light: '#68CDF9',
    default: '#078DEE',
    dark: '#0351AB',
    darker: '#012972'
  },
  [ThemeColorPresets.Purple]: {
    lighter: '#EBD6FD',
    light: '#B985F4',
    default: '#7635DC',
    dark: '#431A9E',
    darker: '#200A69'
  },
  [ThemeColorPresets.Blue]: {
    lighter: '#D1E9FC',
    light: '#76B0F1',
    default: '#2065D1',
    dark: '#103996',
    darker: '#061B64'
  },
  [ThemeColorPresets.Orange]: {
    lighter: '#FEF4D4',
    light: '#FED680',
    default: '#FDA92D',
    dark: '#B66816',
    darker: '#793908'
  },
  [ThemeColorPresets.Red]: {
    lighter: '#FFE3D5',
    light: '#FF9882',
    default: '#FF3030',
    dark: '#B71833',
    darker: '#7A0930'
  }
};

/**
 * 基础调色板 / Base palette
 *
 * 包含整个设计系统常用的颜色：
 * - primary: 主色，用于品牌、按钮、链接等核心元素
 * - success: 成功状态颜色，用于成功提示、勾选、状态标识等
 * - warning: 警告状态颜色，用于警告提示、警告标签等
 * - error: 错误状态颜色，用于错误提示、错误边框等
 * - info: 信息状态颜色，用于信息提示、辅助状态等
 * - gray: 灰阶颜色，用于文本、边框、背景、分隔线等
 *
 * This palette provides a unified color system for UI components,
 * including primary brand colors, status colors (success, warning, error, info),
 * and grayscale for neutral elements like text, borders, and backgrounds.
 */
export const paletteColors = {
  /** 主色 / Primary brand color */
  primary: presetsColors[ThemeColorPresets.Default],

  /** 成功状态 / Success color */
  success: {
    lighter: '#D8FBDE',
    light: '#86E8AB',
    default: '#36B37E',
    dark: '#1B806A',
    darker: '#0A5554'
  },

  /** 警告状态 / Warning color */
  warning: {
    lighter: '#FFF5CC',
    light: '#FFD666',
    default: '#FFAB00',
    dark: '#B76E00',
    darker: '#7A4100'
  },

  /** 错误状态 / Error color */
  error: {
    lighter: '#FFE9D5',
    light: '#FFAC82',
    default: '#FF5630',
    dark: '#B71D18',
    darker: '#7A0916'
  },

  /** 信息状态 / Info color */
  info: {
    lighter: '#CAFDF5',
    light: '#61F3F3',
    default: '#00B8D9',
    dark: '#006C9C',
    darker: '#003768'
  },

  /** 灰阶颜色 / Grayscale colors */
  gray: {
    '100': '#F9FAFB',
    '200': '#F4F6F8',
    '300': '#DFE3E8',
    '400': '#C4CDD5',
    '500': '#919EAB',
    '600': '#637381',
    '700': '#454F5B',
    '800': '#1C252E',
    '900': '#141A21'
  }
};

export const commonColors = {
  white: '#FFFFFF',
  black: '#09090B'
};

export const actionColors = {
  hover: rgbAlpha(paletteColors.gray[500], 0.1),
  selected: rgbAlpha(paletteColors.gray[500], 0.1),
  focus: rgbAlpha(paletteColors.gray[500], 0.12),
  disabled: rgbAlpha(paletteColors.gray[500], 0.48),
  active: rgbAlpha(paletteColors.gray[500], 1)
};

/**
 * 浅色主题的颜色 Token
 * Color tokens for the light theme
 *
 * 将全局调色板、通用颜色和动作颜色组合成 Light 模式下的完整颜色配置。
 * 这些 token 会被注入到 CSS 变量中，供组件和主题系统统一使用。
 */
export const lightColorTokens = {
  /** 主题色板 / Theme palette */
  palette: paletteColors,

  /** 通用颜色 / Common colors */
  common: commonColors,

  /** 交互动作颜色 / Action colors (hover, active, focus) */
  action: actionColors,

  /** 文本颜色 / Text colors */
  text: {
    /** 主文本 / Primary text */
    primary: paletteColors.gray[800],

    /** 次要文本 / Secondary text */
    secondary: paletteColors.gray[600],

    /** 禁用文本 / Disabled text */
    disabled: paletteColors.gray[500]
  },

  /** 背景颜色 / Background colors */
  background: {
    /** 页面默认背景 / Default page background */
    default: commonColors.white,

    /** 卡片或面板背景 / Paper background */
    paper: commonColors.white,

    /** 中性色背景 / Neutral background (常用于表格行、分隔背景) */
    neutral: paletteColors.gray[200]
  }
};

/**
 * 深色主题的颜色 Token
 * Color tokens for the dark theme
 */
export const darkColorTokens = {
  palette: paletteColors,
  common: commonColors,
  action: actionColors,
  text: {
    primary: commonColors.white,
    secondary: paletteColors.gray[500],
    disabled: paletteColors.gray[600]
  },
  background: {
    default: commonColors.black,
    paper: commonColors.black,
    neutral: '#27272A'
  }
};
