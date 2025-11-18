import { ThemeMode, ThemeColorPresets, StorageEnum } from '#/enum';
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
};

type SettingStore = {
  settings: SettingStateType;
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
        fontSize: Number(typographyTokens.fontSize.sm)
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
