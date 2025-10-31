/**
 * @description i18next 的配置文件
 * @author LynasTing
 * @date 2025-10-31
 */

import { getStringItem } from '@/utils/storage';
import { StorageEnum, LocalEnum } from '#/enum';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en_US from './lang/en_US';
import zh_CN from './lang/zh_CN';

const defaultLng = getStringItem(StorageEnum.I18N) || (LocalEnum.en_US as string);

/**
 * 初始化时设置 HTML lang 属性，否则系统语言和设定不同时会弹出浏览器的翻译错误
 * Initialize HTML lang, otherwise the browser will pop up a translation error when the system language and settings are different
 */
document.documentElement.lang = defaultLng;

i18n
  /**
   * 检测用户语言
   * Detect user language
   */
  .use(LanguageDetector)

  /**
   * 初始化 react-i18next
   * Pass the i18n instance to react-i18next.
   * @see https://react.i18next.com/latest/using-with-hooks
   */
  .use(initReactI18next)
  .init({
    /**
     * 是否开启调试模式 true 时会在控制台打印 i18next 的加载与翻译日志
     * Whether to enable debug mode
     */
    debug: true,

    /**
     * 当前语言（默认语言）可以是 'en_US'、'zh_CN' 等，根据 defaultLng 的值决定初始语言
     * Current language (default language) can be 'en_US'、'zh_CN' and so on, depending on the value of defaultLng
     */
    lng: defaultLng,

    /**
     * 备用语言 当找不到当前语言的翻译内容时，会回退到该语言
     * Fallback language
     */
    fallbackLng: LocalEnum.en_US,

    /**
     * 插值配置 用于处理翻译文本中的变量插值，例如：'Hello, {{name}}‘
     * Interpolation configuration is used to handle variable interpolation in translated text, such as 'Hello, {{name}}
     */
    interpolation: {
      /**
       * 禁用 HTML 转义
       * React 自身会自动转义字符串，因此这里设为 false 避免重复转义
       * Not needed for react as it escapes by default
       */
      escapeValue: false
    },
    resources: {
      en_US: { translation: en_US },
      zh_CN: { translation: zh_CN }
    }
  });

export const { t } = i18n;
export default i18n;
