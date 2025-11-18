/**
 * 字体家族预设 / Font family presets
 * - 用于统一管理项目中使用的字体名称
 */
export const FontFamilyPreset = {
  /** Open Sans 字体 / Open Sans font */
  openSans: 'Open Sans Variable',

  /** Inter 字体 / Inter font */
  inter: 'Inter Variable'
};

/**
 * 排版主题 Tokens / Typography theme tokens
 * - 用于统一管理文字样式：字体、字号、字体粗细、行高
 */
export const typographyTokens = {
  /** 字体族 / Font family */
  fontFamily: {
    openSans: FontFamilyPreset.openSans, // "Open Sans Variable"
    inter: FontFamilyPreset.inter // "Inter Variable"
  },

  /** 字体大小 / Font size (单位 px，可按需转换 rem) */
  fontSize: {
    xs: '12', // 极小字体 / Extra small
    sm: '14', // 小字体 / Small
    default: '16', // 默认字体 / Default
    lg: '18', // 大字体 / Large
    xl: '20' // 特大字体 / Extra large
  },

  /** 字体粗细 / Font weight */
  fontWeight: {
    light: '300', // 细 / Light
    normal: '400', // 正常 / Normal
    medium: '500', // 中等 / Medium
    semibold: '600', // 半粗 / Semi-bold
    bold: '700' // 粗 / Bold
  },

  /** 行高 / Line height */
  lineHeight: {
    none: '1', // 紧凑 / None
    tight: '1.25', // 紧 / Tight
    normal: '1.375', // 默认 / Normal
    relaxed: '1.5' // 宽松 / Relaxed
  }
};
