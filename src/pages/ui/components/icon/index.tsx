import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/ui/card';
import { Text } from '@/ui/typography';
import Button from '@/ui/button';
import { themeVars } from '@/theme/theme.css';
import { Icon } from '@/components/icon';
import useLocale from '@/locales/use-locale';

const ICON_PAGE_I18N_PREFIX = 'pages.components.icon';

const paletteColors = [
  themeVars.colors.palette.primary.default,
  themeVars.colors.palette.info.default,
  themeVars.colors.palette.success.default,
  themeVars.colors.palette.warning.default,
  themeVars.colors.palette.error.default
];

export default function IconPage() {
  const { t } = useLocale();

  return (
    <>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>{t(`${ICON_PAGE_I18N_PREFIX}.iconify.title`)}</CardTitle>
          <CardDescription>
            <Text className="mr-1">{t(`${ICON_PAGE_I18N_PREFIX}.iconify.description`)}</Text>
            <Button variant="link" asChild>
              <a href="https://iconify.design/" target="_blank" rel="noreferrer">
                {t('common.clickHere')}
              </a>
            </Button>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mt-2 mb-4">
            <code className="text-info">{` <Icon icon="solar:emoji-funny-square-bold-duotone" size={24} color={colorPrimary} /> `}</code>
          </p>
          <div className="flex gap-4">
            {paletteColors.map((item, index) => (
              <Icon key={index} icon="solar:emoji-funny-square-bold-duotone" size={24} color={item} />
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{t(`${ICON_PAGE_I18N_PREFIX}.local.title`)}</CardTitle>
          <CardDescription>
            <Text className="mr-1">{t(`${ICON_PAGE_I18N_PREFIX}.local.description`)}</Text>
            <Button variant="link" asChild>
              <a href="https://iconify.design/docs/icon-components/react/add-icon.html" target="_blank" rel="noreferrer">
                {t('common.clickHere')}
              </a>
            </Button>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mt-2 mb-4">
            <code className="text-info">{` <Icon icon="local:ic-workbench" size={24} color={colorPrimary} /> `}</code>
          </p>
          <div className="flex gap-4">
            {paletteColors.map((item, index) => (
              <Icon key={index} icon="local:ic-workbench" size={24} color={item} />
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
