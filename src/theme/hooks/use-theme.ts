import { useSettingStoreState, useSettingStoreActions } from '@/store/setting';
import { ThemeMode } from '#/enum';
import { lightColorTokens, darkColorTokens, presetsColors } from '../tokens/color';
import { themeVars } from '../theme.css';
import { baseThemeTokens } from '../tokens/base';
import { typographyTokens } from '../tokens/typography';

/**
 * 获取当前应用主题配置，并提供修改主题模式的方法
 * Get the current application theme configuration and provide a method to change the theme mode
 */
export function useTheme() {
  /** 从全局 store 中读取当前的主题设置 / Read the current theme settings from the global store  */
  const settings = useSettingStoreState();

  /** 根据当前主题模式选择对应的颜色 tokens / Select color tokens based on the current theme mode */
  let colorTokens = settings.themeMode === ThemeMode.Light ? lightColorTokens : darkColorTokens;

  /**
   * 覆盖主题主色 primary
   * presetsColors 中存储了一组预设主题色，根据 themeColorPresets 选择当前主题色
   *
   * Override the primary theme color
   * presetsColors contains predefined colors, select the current one using themeColorPresets
   */
  colorTokens = {
    ...colorTokens,
    palette: {
      ...colorTokens.palette,
      primary: presetsColors[settings.themeColorPresets]
    }
  };

  /** 获取更新 settings 的 action / Get the action used to update settings  */
  const { setSettings } = useSettingStoreActions();

  return {
    /** 当前主题模式 / Current theme mode */
    mode: settings.themeMode,

    /**
     * 修改主题模式
     * 通过 setSettings 更新 store，并保留其他 settings
     *
     * Change the theme mode
     * Update the store via setSettings while preserving other settings
     */
    setMode: (themeMode: ThemeMode) => {
      setSettings({
        ...settings,
        themeMode
      });
    },

    /**
     * CSS 变量映射对象
     * 通常用于样式系统或 CSS variables 注入
     *
     * CSS variable mapping object
     * Usually used for styling systems or CSS variable injection
     */
    themeVars,

    /**
     * 组合后的主题 tokens
     * 包含基础 tokens、颜色 tokens、阴影 tokens、排版 tokens
     *
     * Combined theme tokens
     * Includes base, color, shadow and typography tokens
     */
    themeTokens: {
      /** 基础设计 tokens / Base design tokens */
      base: baseThemeTokens,
      /** 颜色 tokens（包含 primary 覆盖） / Color tokens with overridden primary color */
      color: colorTokens,
      /** 阴影 tokens 根据主题模式切换 / Switch between light and dark based on theme mode */
      shadow: settings.themeMode === ThemeMode.Light ? lightColorTokens : darkColorTokens,
      /** 排版 tokens / Typography tokens */
      typography: typographyTokens
    }
  };
}
