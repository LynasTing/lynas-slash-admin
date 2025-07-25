import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import en_US from 'antd/locale/en_US';
import zh_CN from 'antd/locale/zh_CN';
import { useTranslation } from 'react-i18next';
import type { Locale as AntdLocale } from 'antd/es/locale';
import { LocalEnum } from '#/enum';

type Locale = keyof typeof LocalEnum;

type Language = {
  locale: Locale;
  icon: string;
  label: string;
  antdLocale: AntdLocale;
};

export const LANGUAGE_MAP: Record<Locale, Language> = {
  [LocalEnum.en_US]: {
    locale: LocalEnum.en_US,
    label: 'English',
    icon: 'flag-us',
    antdLocale: en_US
  },
  [LocalEnum.zh_CN]: {
    locale: LocalEnum.zh_CN,
    label: 'Chinese',
    icon: 'flag-cn',
    antdLocale: zh_CN
  }
};

export default function useLocale() {
  const { t, i18n } = useTranslation();

  // 当前语言，默认为英文
  // current locale, default to English
  const locale = (i18n.resolvedLanguage || LocalEnum.en_US) as Locale;

  // 从 LANGUAGE_MAP 中获取当前语言的详细信息
  // Get the current language details from LANGUAGE_MAP
  const language = LANGUAGE_MAP[locale];

  const setLocale = (locale: Locale) => {
    i18n.changeLanguage(locale);

    // 设置html的lang属性
    // set html lang attribute
    document.documentElement.lang = locale;

    // 设置dayjs的语言
    // set dayjs locale
    dayjs.locale(locale);
  };

  return {
    t,
    locale,
    language,
    setLocale
  };
}
