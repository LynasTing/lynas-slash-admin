import Button from '@/ui/button';
import { themeVars } from '@/theme/theme.css';
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/card';
import { RadioGroup, RadioGroupItem } from '@/ui/radio-group';
import { LocalEnum } from '#/enum';
import useLocale from '@/locales/use-locale';
import { Icon } from '@/components/icon';

const MULTI_LANGUAGE_PAGE_I18N_PREFIX = 'pages.components.multiLanguage';

export default function MultiLanguagePage() {
  const {
    t,
    locale,
    language: { icon, label },
    setLocale
  } = useLocale();

  return (
    <>
      <Button variant="link" asChild>
        <a href="https://www.i18next.com" target="_blank" style={{ color: themeVars.colors.palette.primary.default }}>
          https://www.i18next.com
        </a>
      </Button>
      <Button variant="link" asChild>
        <a href="https://ant.design/docs/react/i18n-cn" style={{ color: themeVars.colors.palette.primary.default }}>
          https://ant.design/docs/react/i18n-cn
        </a>
      </Button>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>{t(`${MULTI_LANGUAGE_PAGE_I18N_PREFIX}.title`)}</CardTitle>
          <div className="flex items-center space-x-4 text-2xl">
            <Icon icon={`local:${icon}`} className="rounded-md" size={30} />
            <span>{label}</span>
          </div>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue={locale} onValueChange={(v: LocalEnum) => setLocale(v)} className="flex flex-col gap-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={LocalEnum.en_US} id="en_US" />
              <label htmlFor="en_US">{t(`${MULTI_LANGUAGE_PAGE_I18N_PREFIX}.languages.enUS`)}</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={LocalEnum.zh_CN} id="zh_CN" />
              <label htmlFor="zh_CN">{t(`${MULTI_LANGUAGE_PAGE_I18N_PREFIX}.languages.zhCN`)}</label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </>
  );
}
