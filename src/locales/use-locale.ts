/**
 * dayjs 默认只加载了英文语言包，需要单独加载中文语言包
 * Dayjs only loads the English locale by default, Chinese locale needs to be imported separately
 */
import 'dayjs/locale/zh-cn';

import { LocalEnum } from '#/enum';
import type { Locale as AntdLocal } from 'antd/es/locale';
import en_US from 'antd/locale/en_US';
import zh_CN from 'antd/locale/zh_CN';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

/**
 * 获取对象的键名类型
 * typeof 获取对象的结构类型
 * keyof 获取对象类型的键名组成的联合类型
 *
 * Locale = "zh_CN" | "en_US"
 */
type Locale = keyof typeof LocalEnum;

/**
 * 语言信息结构体
 * Language type definition
 */
type Language = {
  /** 当前语言枚举值 / Current locale */
  locale: Locale;

  /** 语言图标标识 / Icon identifier */
  icon: string;

  /** 语言名称 / Display label */
  label: string;

  /** 对应 Ant Design 的 locale 配置 / Ant Design locale config */
  antdLocal: AntdLocal;
};

/**
 * 多语言映射表
 * Key: Locale 枚举
 * Value: Language 对象
 */
export const LANGUAGE_MAP: Record<Locale, Language> = {
  [LocalEnum.zh_CN]: {
    locale: LocalEnum.zh_CN,
    label: 'Chinese', // 中文 / Chinese
    icon: 'flag-cn', // 图标标识 / Icon
    antdLocal: zh_CN // Antd locale 配置 / Ant Design locale config
  },
  [LocalEnum.en_US]: {
    locale: LocalEnum.en_US,
    label: 'English', // 英文 / English
    icon: 'flag-us', // 图标标识 / Icon
    antdLocal: en_US // Antd locale 配置 / Ant Design locale config
  }
};

/**
 * 自定义 Hook：多语言处理
 * Custom Hook: Locale management
 */
export default function useLocale() {
  /**
   * useTranslation Hook，用于获取 t 函数和 i18n 实例
   * t: 翻译函数 / i18n: 国际化实例
   */
  const { t, i18n } = useTranslation();

  /**
   * 获取当前语言
   * 如果 i18n.resolvedLanguage 未定义，则默认使用 LocalEnum.en_US
   * Get the current locale, fallback to English if not resolved
   */
  const locale = (i18n.resolvedLanguage || LocalEnum.en_US) as Locale;

  /** 根据当前语言获取对应语言信息 / Get language info from LANGUAGE_MAP */
  const language = LANGUAGE_MAP[locale];

  /**
   * 设置当前语言
   * 1. 修改 i18next 当前语言
   * 2. 修改 HTML 根节点 lang 属性
   * 3. 设置 dayjs 本地化
   *
   * Set the current locale:
   * 1. change i18next language
   * 2. change <html lang="...">
   * 3. set dayjs locale
   */
  const setLocale = (payload: Locale) => {
    i18n.changeLanguage(payload);

    // 设置 HTML 根节点 lang 属性
    document.documentElement.lang = payload;

    // 设置 dayjs 本地化
    dayjs.locale(payload);
  };

  /**
   * 返回多语言相关工具
   * Return locale tools
   */
  return {
    t, // 翻译函数 / translation function
    locale, // 当前语言 / current locale
    language, // 当前语言信息 / current language info
    setLocale // 设置语言方法 / function to change locale
  };
}
