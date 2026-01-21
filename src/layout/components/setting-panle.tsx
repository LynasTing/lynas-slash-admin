import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/ui/sheet';
import Button from '@/ui/button';
import { Icon } from '@/components/icon';
import { type CSSProperties } from 'react';
import CyanBlurIMG from '@/assets/images/background/cyan-blur.png';
import RedBlurIMG from '@/assets/images/background/red-blur.png';
import { useTranslation } from 'react-i18next';
import { ScrollArea } from '@/ui/scroll-area';
import { Text } from '@/ui/typography';
import { Card } from '@/ui/card';
import { type SettingStateType, useSettingStoreState, useSettingStoreActions } from '@/store/setting';
import { ThemeMode } from '#/enum';
import { themeVars } from '@/theme/theme.css';

export default function SettingPanel() {
  const { t } = useTranslation();
  const settingsState = useSettingStoreState();
  const { themeMode } = settingsState;
  const { setSettings } = useSettingStoreActions();

  const updateSettings = (partialSettings: Partial<SettingStateType>) => {
    setSettings({
      ...settingsState,
      ...partialSettings
    });
  };

  /**
   * 玻璃拟态背景：双重模糊色光（右上青、左下红）叠加强烈背景模糊
   * Glassmorphism background with dual blurred color glows (cyan top-right, red bottom-left) + heavy backdrop blur
   */
  const sheetContentBgStyle: CSSProperties = {
    backdropFilter: `blur(20px)`,
    backgroundImage: `url("${CyanBlurIMG}), url("${RedBlurIMG}")`,
    backgroundRepeat: `no-repeat, no-repeat`,
    backgroundPosition: `right top, left bottom`,
    backgroundSize: `50%, 50%`
  };

  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full animate-slow-spin">
          <Icon icon="local:ic-setting" size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent className="gap-0" style={sheetContentBgStyle} onOpenAutoFocus={e => e.preventDefault()}>
        <SheetHeader>
          <SheetTitle>{t('sys.settings.title')}</SheetTitle>
        </SheetHeader>
        <SheetDescription />
        <ScrollArea>
          <div className="flex flex-col gap-6 px-6 py-2">
            {/* theme mode */}
            <div className="flex flex-col gap-2">
              <Text>{t('sys.settings.mode')}</Text>
              <div className="flex  gap-4">
                <Card
                  className="flex-1 h-20 flex justify-center items-center cursor-pointer"
                  onClick={() =>
                    updateSettings({
                      themeMode: ThemeMode.Light
                    })
                  }>
                  <Icon
                    icon="local:ic-settings-mode-sun"
                    size={24}
                    color={themeMode === ThemeMode.Light ? themeVars.colors.palette.primary.default : ''}
                  />
                </Card>
                <Card
                  className="flex-1 h-20 flex justify-center items-center cursor-pointer"
                  onClick={() =>
                    updateSettings({
                      themeMode: ThemeMode.Dark
                    })
                  }>
                  <Icon
                    icon="local:ic-settings-mode-moon"
                    size={24}
                    color={themeMode === ThemeMode.Dark ? themeVars.colors.palette.primary.default : ''}
                  />
                </Card>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
