import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/ui/sheet';
import Button from '@/ui/button';
import { Icon } from '@/components/icon';
import { useState, type CSSProperties, useCallback, useEffect } from 'react';
import CyanBlurIMG from '@/assets/images/background/cyan_blur.png';
import RedBlurIMG from '@/assets/images/background/red_blur.png';
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
import { fontFamilyPreset } from '@/theme/tokens/typography';
import { Slider } from '@/ui/slider';
import screenfull from 'screenfull';

export default function SettingPanel() {
  const { t } = useTranslation();
  const settingsState = useSettingStoreState();
  const { themeMode, themeLayout, themeStretch, themeColorPresets, fontFamily, fontSize, breadcrumb } = settingsState;
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

  // 是否全屏 / is full screen
  const [isFullScreen, setIsFullScreen] = useState(screenfull.isFullscreen);

  /**
   * 切换全屏按钮点击处理
   * Handle full screen toggle button click
   */
  const handleFullScreenToggle = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  };

  /**
   * 键盘按下事件（Esc 处理退出全屏）
   * Keyboard keydown event (handle Escape to exit full screen)
   */
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && screenfull.isEnabled && screenfull.isFullscreen) {
      // 更新 react 状态，退出全屏
      // Update React state to exit full screen
      setIsFullScreen(false);
    }
  }, []);

  useEffect(() => {
    /**
     * 当全屏状态发生变化时触发
     * Triggerd when full screen status changes
     */
    const onFullScreenChange = () => {
      if (screenfull.isEnabled) {
        // 把当前的全屏状态同步到 react 状态
        // Sync current full screen status to react state
        setIsFullScreen(screenfull.isFullscreen);
      }
    };
    if (screenfull.isEnabled) {
      // 绑定全屏状态变化事件监听
      // Bind event listener for full screen status change
      screenfull.on('change', onFullScreenChange);
    }

    // 全局监听键盘事件（Esc 退出全屏）
    // Globally listen to keyboard events (Escape to exit full screen)
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (screenfull.isEnabled) {
        screenfull.off('change', onFullScreenChange);
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="animate-slow-spin rounded-full">
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
              <div className="flex gap-4">
                <Card
                  className="flex h-20 flex-1 cursor-pointer items-center justify-center"
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
                  className="flex h-20 flex-1 cursor-pointer items-center justify-center"
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
              <div className="grid grid-cols-3 gap-4">
                {/* vertical */}
                <Card
                  className="flex h-16 flex-1 cursor-pointer flex-row gap-1 p-0"
                  onClick={() => updateSettings({ themeLayout: ThemeLayoutEnum.Vertical })}>
                  <div className="flex h-full w-5 flex-col gap-1 p-1">
                    <div
                      className="h-2 w-2 shrink-0 rounded"
                      style={{
                        backgroundColor: layoutBackground(ThemeLayoutEnum.Vertical)
                      }}
                    />
                    <div
                      className="h-1 w-full shrink-0 rounded opacity-50"
                      style={{
                        backgroundColor: layoutBackground(ThemeLayoutEnum.Vertical)
                      }}
                    />
                    <div
                      className="h-1 max-w-[12px] shrink-0 rounded opacity-20"
                      style={{ backgroundColor: layoutBackground(ThemeLayoutEnum.Vertical) }}
                    />
                  </div>
                  <div className="flex h-full w-full flex-1 grow flex-col gap-1 p-1">
                    <div
                      className="h-1.5 w-full rounded opacity-20"
                      style={{ backgroundColor: layoutBackground(ThemeLayoutEnum.Vertical) }}
                    />
                    <div
                      className={cn(
                        'mx-auto w-full flex-1 rounded opacity-20 transition-all duration-300 ease-in-out',
                        !themeStretch && 'w-10'
                      )}
                      style={{ backgroundColor: layoutBackground(ThemeLayoutEnum.Vertical) }}
                    />
                  </div>
                </Card>
                {/* mini */}
                <Card
                  className="h-16 flex-1 cursor-pointer flex-row gap-0 p-0"
                  onClick={() => updateSettings({ themeLayout: ThemeLayoutEnum.Mini })}>
                  <div
                    className="flex h-full w-3 flex-0 flex-col items-center gap-1 p-1"
                    style={{ backgroundColor: layoutBackground(ThemeLayoutEnum.Mini) }}>
                    <div className="h-2 w-2 shrink-0 rounded" style={{ backgroundColor: layoutBackground(ThemeLayoutEnum.Mini) }} />
                    <div
                      className="h-1 w-full shrink-0 rounded opacity-50"
                      style={{ backgroundColor: layoutBackground(ThemeLayoutEnum.Mini) }}
                    />
                    <div
                      className="h-1 w-full shrink-0 rounded opacity-20"
                      style={{ backgroundColor: layoutBackground(ThemeLayoutEnum.Mini) }}
                    />
                  </div>
                  <div className="flex h-full w-full flex-1 grow flex-col gap-1 p-1">
                    <div className="h-1.5 w-full rounded opacity-20" style={{ backgroundColor: layoutBackground(ThemeLayoutEnum.Mini) }} />
                    <div
                      className={cn(
                        'mx-auto w-full flex-1 rounded opacity-20 transition-all duration-300 ease-in-out',
                        !themeStretch && 'w-10'
                      )}
                      style={{ backgroundColor: layoutBackground(ThemeLayoutEnum.Mini) }}
                    />
                  </div>
                </Card>
                {/* horizontal */}
                <Card
                  className="flex h-16 flex-1 cursor-pointer gap-0 p-0"
                  onClick={() =>
                    updateSettings({
                      themeLayout: ThemeLayoutEnum.Horizontal
                    })
                  }>
                  <div className="flex h-full w-full flex-0 items-center gap-1 p-1">
                    <div
                      className="h-2 w-2 shrink-0 rounded"
                      style={{
                        backgroundColor: layoutBackground(ThemeLayoutEnum.Horizontal)
                      }}
                    />
                    <div
                      className="h-1 w-4 shrink-0 rounded opacity-50"
                      style={{
                        backgroundColor: layoutBackground(ThemeLayoutEnum.Horizontal)
                      }}
                    />
                    <div
                      className="h-1 w-3 shrink-0 rounded opacity-20"
                      style={{
                        backgroundColor: layoutBackground(ThemeLayoutEnum.Horizontal)
                      }}
                    />
                  </div>
                  <div
                    className="mx-1 h-1.5 rounded opacity-20"
                    style={{
                      backgroundColor: layoutBackground(ThemeLayoutEnum.Horizontal)
                    }}
                  />
                  <div className="flex h-full w-full flex-1 grow flex-col gap-1 p-1">
                    <div
                      className={cn(
                        'mx-auto h-full w-full rounded opacity-20 transition-all duration-300 ease-in-out',
                        !themeStretch && 'w-10'
                      )}
                      style={{
                        backgroundColor: layoutBackground(ThemeLayoutEnum.Horizontal)
                      }}
                    />
                  </div>
                </Card>
              </div>

              {/* stretch */}
              <div className="flex items-center justify-between">
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
                      'relative flex h-13 w-5 cursor-pointer items-center justify-center rounded p-1 transition-all duration-300 ease-in-out',
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
                        'flex h-full w-full items-center justify-center rounded transition-all duration-300 ease-in-out hover:bg-white/30'
                      )}>
                      {themeColorPresets === preset && <Icon icon="bi:check-all" size={24} color="white" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* font */}
            <div className="flex flex-col gap-2">
              <Text variant="subTitle1">{t('sys.settings.font')}</Text>
              <Text variant="subTitle2">{t('sys.settings.family')}</Text>
              <div className="flex gap-3">
                {Object.entries(fontFamilyPreset).map(([font, family]) => (
                  <Card
                    key={font}
                    className={cn(
                      'flex h-20 w-full cursor-pointer items-center justify-center text-text-disabled',
                      family === fontFamily && 'font-medium text-primary',
                      family === fontFamilyPreset.inter && 'font-inter',
                      family === fontFamilyPreset.openSans && 'font-open-sans'
                    )}
                    onClick={() => updateSettings({ fontFamily: family })}>
                    <div className="text-center text-lg">
                      <span>A</span>
                      <span className="ml-0.5">a</span>
                    </div>
                    <span className="text-sm text-text-primary">{family.replace('Variable', '')}</span>
                  </Card>
                ))}
              </div>
              <Text variant="subTitle2">{t('sys.settings.size')}</Text>
              <Slider
                min={12}
                max={20}
                step={1}
                defaultValue={[fontSize]}
                onValueChange={value => updateSettings({ fontSize: value[0] })}
              />
            </div>

            {/* page config */}
            <div className="flex flex-col gap-2">
              <Text variant="subTitle1">{t('sys.settings.page')}</Text>
              <div className="flex items-center justify-between">
                <Text variant="subTitle2">{t('sys.settings.breadcrumb')}</Text>
                <Switch checked={breadcrumb} onCheckedChange={checked => updateSettings({ breadcrumb: checked })} />
              </div>
            </div>
          </div>
        </ScrollArea>
        <SheetFooter className="shrink-0 border border-t px-6 py-4">
          <Button
            variant="outline"
            className="w-full border-dashed text-text-primary hover:border-primary hover:text-primary"
            onClick={handleFullScreenToggle}>
            <div
              className="flex items-center justify-center"
              aria-label={isFullScreen ? t('sys.settings.exitFullScreen') : t('sys.settings.fullScreen')}>
              {isFullScreen ? (
                <>
                  <Icon icon="local:ic-settings-exit-fullscreen" />
                  <span>{t('sys.settings.exitFullScreen')}</span>
                </>
              ) : (
                <>
                  <Icon icon="local:ic-settings-fullScreen" />
                  <span>{t('sys.settings.fullScreen')}</span>
                </>
              )}
            </div>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
