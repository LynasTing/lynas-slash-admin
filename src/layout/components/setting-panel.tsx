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
import { ThemeLayoutEnum, ThemeMode } from '#/enum';
import { themeVars } from '@/theme/theme.css';
import { cn } from '@/utils';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/ui/tooltip';
import { Switch } from '@/ui/switch';
import { presetsColors } from '@/theme/tokens/color';
import { type ThemeColorPresets } from '#/enum';

export default function SettingPanel() {
  const { t } = useTranslation();
  const settingsState = useSettingStoreState();
  const { themeMode, themeLayout, themeStretch, themeColorPresets } = settingsState;
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

  /**
   * 布局的背景颜色
   * background color of the current layout
   */
  const layoutBackground = (layout: ThemeLayoutEnum) =>
    themeLayout === layout ? themeVars.colors.palette.primary.light : themeVars.colors.palette.gray[500];

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

            {/* theme layout */}
            <div className="flex flex-col gap-2">
              <Text variant="subTitle1">{t('sys.settings.layout')}</Text>
              {/* vertical */}
              <Card
                className="flex-1 h-16 flex flex-row p-0 gap-1 cursor-pointer"
                onClick={() => updateSettings({ themeLayout: ThemeLayoutEnum.Vertical })}>
                <div className="flex flex-col w-5 h-full gap-1 p-1">
                  <div
                    className="w-2 h-2 shrink-0 rounded"
                    style={{
                      backgroundColor: layoutBackground(ThemeLayoutEnum.Vertical)
                    }}
                  />
                  <div
                    className="w-full h-1 shrink-0 rounded opacity-50"
                    style={{
                      backgroundColor: layoutBackground(ThemeLayoutEnum.Vertical)
                    }}
                  />
                  <div
                    className="max-w-[12px] h-1 shrink-0 rounded opacity-20"
                    style={{ backgroundColor: layoutBackground(ThemeLayoutEnum.Vertical) }}
                  />
                </div>
                <div className="flex-1 flex flex-col w-full h-full grow gap-1 p-1">
                  <div
                    className="w-full h-1.5 rounded opacity-20"
                    style={{ backgroundColor: layoutBackground(ThemeLayoutEnum.Vertical) }}
                  />
                  <div
                    className={cn(
                      'flex-1 w-full rounded mx-auto opacity-20 transition-all duration-300 ease-in-out',
                      !themeStretch && 'w-10'
                    )}
                    style={{ backgroundColor: layoutBackground(ThemeLayoutEnum.Vertical) }}
                  />
                </div>
              </Card>
              {/* mini */}
              <Card
                className="flex-1 flex-row h-16 gap-0 p-0 cursor-pointer"
                onClick={() => updateSettings({ themeLayout: ThemeLayoutEnum.Mini })}>
                <div
                  className="flex-0 flex flex-col items-center w-3 h-full gap-1 p-1"
                  style={{ backgroundColor: layoutBackground(ThemeLayoutEnum.Mini) }}>
                  <div className="shrink-0 w-2 h-2 rounded" style={{ backgroundColor: layoutBackground(ThemeLayoutEnum.Mini) }} />
                  <div
                    className="shrink-0 w-full h-1 rounded opacity-50"
                    style={{ backgroundColor: layoutBackground(ThemeLayoutEnum.Mini) }}
                  />
                  <div
                    className="shrink-0 w-full h-1 rounded opacity-20"
                    style={{ backgroundColor: layoutBackground(ThemeLayoutEnum.Mini) }}
                  />
                </div>
                <div className="flex-1 flex flex-col grow w-full h-full gap-1 p-1">
                  <div className="w-full h-1.5 rounded opacity-20" style={{ backgroundColor: layoutBackground(ThemeLayoutEnum.Mini) }} />
                  <div
                    className={cn(
                      'flex-1 w-full mx-auto rounded opacity-20 transition-all duration-300 ease-in-out',
                      !themeStretch && 'w-10'
                    )}
                    style={{ backgroundColor: layoutBackground(ThemeLayoutEnum.Mini) }}
                  />
                </div>
              </Card>
              {/* horizontal */}
              <Card className="flex-1 flex h-16 gap-0 p-0 cursor-pointer">
                <div className="flex-0 flex items-center w-full h-full gap-1 p-1">
                  <div
                    className="w-2 h-2 shrink-0 rounded"
                    style={{
                      backgroundColor: layoutBackground(ThemeLayoutEnum.Horizontal)
                    }}
                  />
                  <div
                    className="shrink-0 w-4 h-1 rounded opacity-50"
                    style={{
                      backgroundColor: layoutBackground(ThemeLayoutEnum.Horizontal)
                    }}
                  />
                  <div
                    className="shrink-0 w-3 h-1 rounded opacity-20"
                    style={{
                      backgroundColor: layoutBackground(ThemeLayoutEnum.Horizontal)
                    }}
                  />
                </div>
                <div
                  className="h-1.5 mx-1 rounded opacity-20 "
                  style={{
                    backgroundColor: layoutBackground(ThemeLayoutEnum.Horizontal)
                  }}
                />
                <div className="flex-1 flex flex-col grow w-full h-full gap-1 p-1">
                  <div
                    className={cn(
                      'w-full h-full mx-auto rounded opacity-20 transition-all duration-300 ease-in-out',
                      !themeStretch && 'w-10'
                    )}
                    style={{
                      backgroundColor: layoutBackground(ThemeLayoutEnum.Horizontal)
                    }}
                  />
                </div>
              </Card>
              {/* stretch */}
              <div className="flex justify-between items-center">
                <Tooltip delayDuration={700} defaultOpen={false} disableHoverableContent>
                  <TooltipTrigger>
                    <Text variant="subTitle2">{t('sys.settings.stretch')}</Text>
                    <Icon icon="solar:question-circle-linear" className="ml-1" />
                  </TooltipTrigger>
                  <TooltipContent>{t('sys.settings.stretchTip')}</TooltipContent>
                </Tooltip>
                <Switch checked={themeStretch} onCheckedChange={checked => updateSettings({ themeStretch: checked })} />
              </div>
            </div>

            {/* theme presets */}
            <div className="flex flex-col gap-2">
              <Text variant="subTitle1">{t('sys.settings.presetThemes')}</Text>
              <div className="flex flex-wrap gap-1">
                {Object.entries(presetsColors).map(([preset, color]) => (
                  <div
                    key={preset}
                    className={cn(
                      'relative flex justify-center itemc w-5 h-13 rounded p-1 cursor-pointer transition-all duration-300 ease-in-out',
                      themeColorPresets === preset && 'w-13'
                    )}
                    style={{ backgroundColor: color.default }}
                    onClick={() =>
                      updateSettings({
                        themeColorPresets: preset as ThemeColorPresets
                      })
                    }>
                    <div
                      className={cn(
                        'flex justify-center items-center w-full h-full rounded hover:bg-white/30 transition-all duration-300 ease-in-out'
                      )}>
                      {themeColorPresets === preset && <Icon icon="bi:check-all" size={24} color="white" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
