import { addCollection } from '@iconify/react';
import { parseSVGContent } from '@iconify/utils/lib/svg/parse';

interface IconifyIcon {
  body: string;
  width: number;
  height: number;
}

interface ParsedSvg {
  body: string;
  attribs?: Record<string, string>;
}

// 图标集合缓存
// Cache for icon collections
let iconCollection: Record<string, IconifyIcon> | null = null;

/**
 * 自动导入所有SVG文件
 * Auto import all SVG files to Iconify local collection
 *
 * @example
 * ├── src
 * │   ├── assets
 * │   │   └── icons
 * │   │       └── icon-name.svg
 *
 * @usage
 * import { Icon } from "@/components/icon";
 * <Icon icon="local:icon-name" />
 */
export default async function registerIcons() {
  // 如果图标集合已经注册过了，直接返回
  // If icon collection is already registered, return early
  if (iconCollection) {
    return;
  }

  const svgModules = import.meta.glob('@/assets/icons/**/*.svg', { query: '?raw', import: 'default', eager: true });
  const icons: Record<string, IconifyIcon> = {};

  for (const [path, content] of Object.entries(svgModules)) {
    try {
      const name = path.split('/').pop()?.replace('.svg', '');

      if (name) {
        // 解析SVG内容
        // Parse the SVG content
        const parsed = parseSVGContent(content as string) as ParsedSvg;
        if (!parsed) {
          console.warn(`Failed to parse SVG + ::>>`, name);
          continue;
        }

        // 确保body是有效的
        // Ensure the body is valid
        if (!parsed.body) {
          console.warn(`SVG body is empty for + ::>>`, name);
          continue;
        }

        // 获取SVG宽高
        // Get SVG width and height
        let width = 24;
        let height = 24;

        if (parsed.attribs?.viewBox) {
          const viewBox = parsed.attribs.viewBox.split(' ');
          if (viewBox.length === 4) {
            width = Number.parseInt(viewBox[2], 10);
            height = Number.parseInt(viewBox[3], 10);
          }
        }
        // 添加到图标集合
        // Add to icon collection
        icons[name] = {
          body: parsed.body,
          width: width,
          height: height
        };
      }
    } catch (error) {
      console.error(`Error parsing SVG at ${path}:`, error);
      continue;
    }
  }

  // 注册图标集合到Iconify
  // Cache the icon collection
  iconCollection = icons;

  const result = addCollection({
    prefix: 'local',
    icons,
    width: 24,
    height: 24
  });

  if (!result) {
    console.error('Failed to register local icon collection');
  }
}
