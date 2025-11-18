import { ThemeMode, HtmlDataAttribute, ThemeColorPresets } from '#/enum';
import { createThemeContract, createGlobalTheme, globalStyle, assignVars } from '@vanilla-extract/css';
import { themeTokens } from './type';
import { addColorChannels } from '@/utils';
import { darkColorTokens, lightColorTokens, presetsColors } from './tokens/color';
import { typographyTokens } from './tokens/typography';
import { lightShadowTokens, darkShadowTokens } from './tokens/shadow';
import { baseThemeTokens } from './tokens/base';

/**
 * 获取完整主题 Tokens / Get full theme tokens
 * - 根据 themeMode 返回不同的颜色、阴影和基础设计系统
 *
 * @param theme 当前主题模式 / Current theme mode
 * @returns 返回完整主题对象 / Returns complete theme object
 */
const getThemeTokens = (theme: ThemeMode) => {
  // 根据主题模式选择颜色 Tokens / Select color tokens based on theme mode
  const themeToken = theme === ThemeMode.Light ? lightColorTokens : darkColorTokens;

  return {
    // 颜色（带 RGB 通道） / Colors with RGB channels
    colors: addColorChannels(themeToken),

    // 排版 / Typography
    typography: typographyTokens,

    // 阴影 / Shadows
    shadows: theme === ThemeMode.Light ? lightShadowTokens : darkShadowTokens,

    // 基础设计：间距、圆角、透明度、z-index / Base design: spacing, borderRadius, opacity, zIndex
    ...baseThemeTokens
  };
};

/**
 * 创建 Vanilla Extract 主题 Contract / Create Vanilla Extract theme contract
 * - 用于全局 CSS 变量绑定 / Used for global CSS variable binding
 */
export const themeVars = createThemeContract({
  ...themeTokens,

  // 颜色 Tokens 带 RGB 通道 / Color tokens with RGB channels
  colors: addColorChannels(themeTokens.colors)
});

/**
 * 创建全局主题 / Create global theme for each ThemeMode
 * - 根据 HTML data-theme-mode 属性动态切换 / Dynamically switch based on HTML data-theme-mode attribute
 */
for (const themeMode of Object.values(ThemeMode)) {
  createGlobalTheme(`:root[${HtmlDataAttribute.ThemeMode}=${themeMode}]`, themeVars, getThemeTokens(themeMode));
}

/**
 * 动态颜色调色板 / Dynamic color palette
 * - 用于根据 ThemeColorPresets 设置 primary 调色板 / Sets primary palette based on color presets
 */
for (const preset of Object.values(ThemeColorPresets)) {
  globalStyle(`:root[${HtmlDataAttribute.ColorPalette}=${preset}]`, {
    vars: assignVars(themeVars.colors.palette.primary, {
      ...addColorChannels(presetsColors[preset])
    })
  });
}
