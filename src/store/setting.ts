import { ThemeMode, ThemeColorPresets, StorageEnum, ThemeLayoutEnum } from '#/enum';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { FontFamilyPreset, typographyTokens } from '@/theme/tokens/typography';

export type SettingStateType = {
  /** 主题模式 / Theme mode */
  themeMode: ThemeMode;
  /** 主题色彩预设 / Theme color presets */
  themeColorPresets: ThemeColorPresets;
  /** 字体 / Font */
  fontFamily: string;
  /** 字号 / Font size */
  fontSize: number;
  /** 主题布局 / Theme layout */
  themeLayout: ThemeLayoutEnum;
  /** 是否开启全屏模式 / Whether to enable full screen mode */
  themeStretch: boolean;
  /** 是否开启面包屑导航 / Whether to enable breadcrumb navigation */
  breadCrumb: boolean;
  /** 是否开启折叠菜单 / Whether to enable accordion menu */
  accordion: boolean;
  /** 是否开启多标签页模式 / Whether to enable multi-tab mode */
  multiTab: boolean;
  /** 是否开启侧边栏暗色模式 / Whether to enable dark sidebar mode */
  darkSidebar: boolean;
  /** 文档阅读方向（ltr 左→右 / rtl 右→左），用于整体布局镜像与多语言（如阿拉伯语）适配 / Controls document reading direction, affecting global layout mirroring and RTL language support */
  direction: 'ltr' | 'rtl';
};

type SettingStore = {
  settings: SettingStateType;
  // 使用 actions 命名空间来存放所有的 action
  actions: {
    setSettings: (settings: SettingStateType) => void;
    clearSettings: () => void;
  };
};

const useSettingStore = create<SettingStore>()(
  persist(
    set => ({
      settings: {
        themeMode: ThemeMode.Light,
        themeColorPresets: ThemeColorPresets.Default,
        fontFamily: FontFamilyPreset.openSans,
        fontSize: Number(typographyTokens.fontSize.sm),
        themeLayout: ThemeLayoutEnum.Vertical,
        themeStretch: false,
        breadCrumb: false,
        accordion: false,
        multiTab: false,
        darkSidebar: false,
        direction: 'ltr'
      },
      actions: {
        setSettings: settings => {
          set({
            settings
          });
        },
        clearSettings() {
          useSettingStore.persist.clearStorage();
        }
      }
    }),
    {
      /** 本地存储的 key / Local storage key */
      name: StorageEnum.Settings,
      /**
       * 存储介质是什么（localStorage 或 sessionStorage）
       * 及序列化方式（默认 JSON）
       *
       * Storage medium is what (localStorage or sessionStorage)
       * and serialization method (default JSON)
       */
      storage: createJSONStorage(() => localStorage),
      /** 指定哪些状态需要持久化 / Specify which state needs persistence */
      partialize: state => ({
        [StorageEnum.Settings]: state.settings
      })
    }
  )
);

export const useSettingStoreState = () => useSettingStore(state => state.settings);
export const useSettingStoreActions = () => useSettingStore(state => state.actions);
