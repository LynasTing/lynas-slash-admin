import './line.css';
import { useSettingStoreState } from '@/store/setting';
import { commonColors, paletteColors } from '@/theme/tokens/color';

export function LineLoading() {
  const { themeMode } = useSettingStoreState();
  return (
    <div className="flex flex-col justify-center items-center w-full h-full min-h-screen ">
      <div
        className="relative w-96 h-1.5 rounded overflow-hidden"
        style={{
          backgroundColor: paletteColors.gray['500']
        }}>
        <div
          className="absolute left-0 top-0 w-1/3 h-full animate-loading"
          style={{
            backgroundColor: themeMode === 'light' ? commonColors.black : commonColors.white
          }}
        />
      </div>
    </div>
  );
}
