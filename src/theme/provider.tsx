import { useSettingStoreState } from '@/store/setting';
import { useEffect } from 'react';
import { HtmlDataAttribute } from '#/enum';
import { UILibraryAdapter } from './type';

interface ThemeProviderProps {
  children: React.ReactNode;
  adapters?: UILibraryAdapter[];
}

export function ThemeProvider({ children, adapters = [] }: ThemeProviderProps) {
  const { themeMode, themeColorPresets, fontFamily, fontSize } = useSettingStoreState();

  /**
   * 当 themeMode 发生变化时， 更新 HTML 根元素的 data-theme-mode 属性
   * When themeMode changes, update the data-theme-mode attribute of the HTML root element
   */
  useEffect(() => {
    document.documentElement.setAttribute(HtmlDataAttribute.ThemeMode, themeMode);
  }, [themeMode]);

  /**
   * 当 themeColorPresets 发生变化时， 更新 HTML 根元素的 data-color-palette 属性
   * When themeColorPresets changes, update the data-color-palette attribute of the HTML root element
   */
  useEffect(() => {
    document.documentElement.setAttribute(HtmlDataAttribute.ColorPalette, themeColorPresets);
  }, [themeColorPresets]);

  /**
   * 当 fontFamily 或 fontSize 发生变化时， 更新 HTML 根元素的 font-family 和 font-size
   * When fontFamily or fontSize changes, update the font-family and font-size of the HTML root element
   */
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    document.body.style.fontFamily = fontFamily;
  }, [fontFamily, fontSize]);

  /**
   * 适配器 用于适配不同的 UI 库
   * Adapter - Used to adapt different UI libraries
   *
   * @example adapters = [AntdAdapter, ChakraAdapter]
   */
  const wrappedWithAdapters = adapters.reduce(
    (children, Adapter) => (
      <Adapter key={Adapter.name} mode={themeMode}>
        {children}
      </Adapter>
    ),
    children
  );

  return wrappedWithAdapters;
}
