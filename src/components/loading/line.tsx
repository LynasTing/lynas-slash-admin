import './line.css';
import { useSettingStoreState } from '@/store/setting';
import { commonColors, paletteColors } from '@/theme/tokens/color';

export function LineLoading() {
  const { themeMode } = useSettingStoreState();
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center">
      <div
        className="relative h-1.5 w-96 overflow-hidden rounded"
        style={{
          backgroundColor: paletteColors.gray['500']
        }}>
        <div
          className="animate-loading absolute top-0 left-0 h-full w-1/3"
          style={{
            backgroundColor: themeMode === 'light' ? commonColors.black : commonColors.white
          }}
        />
      </div>
    </div>
  );
}
