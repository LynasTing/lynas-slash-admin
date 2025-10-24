/**
 * @file register.ts
 * @description 通过 @iconify/react库 进行本地图标注册
 *
 * 调用时机
 * - 项目启动时 main.tsx 入口文件
 *
 * @author LynasTing
 * @date 2025-10-24
 */
import { addCollection } from '@iconify/react';
import { parseSVGContent } from '@iconify/utils/lib/svg/parse';

interface IconifyIcon {
  /**
   * svg字符串
   */
  body: string;

  /**
   * 图标高度
   */
  height: number;

  /**
   * 图标宽度
   */
  width: number;
}

/**
 * Cache for icon collection
 * 图标缓存
 */
let iconCollection: Record<string, IconifyIcon> | null = null;

/**
 * Parsed SVG content
 * 解析后的 SVG 内容
 * svg属性本身就是字符串
 */
interface ParsedSVG {
  body: string;
  attr?: {
    width: string;
    height: string;
    viewBox: string;
  };
}

/**
 * Auto import all SVG files to Iconify local collection
 * 自动导入所有 SVG 文件到 Iconify 本地集合
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
export default function registerLocalIcons() {
  /**
   * If icons are already registered, return early
   * 如果图标已经注册，返回
   */
  if (iconCollection) {
    return;
  }

  /**
   * Import all SVG files in the assets/icons directory
   * 导入 assets/icons 目录下的所有 SVG 文件
   *
   * query: ?raw       拿原始 SVG 文本，不解析成组件/URL
   * eager: true       立即导入所有匹配文件，不返回懒加载函数
   * import: default   只取模块的 default 导出，方便直接使用
   */
  const svgModules = import.meta.glob('../../assets/icons/*.svg', {
    query: '?raw',
    eager: true,
    import: 'default'
  });

  const icons: Record<string, IconifyIcon> = {};

  for (const [path, svgContent] of Object.entries(svgModules)) {
    try {
      /**
       * Get the icon name by extracting the file name without extension
       * 从文件名中提取图标名称
       */
      const iconName = path.split('/').pop()?.replace('.svg', '');

      if (iconName) {
        const parsedSVG = parseSVGContent(svgContent as string) as ParsedSVG;

        if (!parsedSVG) {
          console.warn(`Failed to parse SVG ::>>`, iconName);
          continue;
        }

        /**
         * Ensure body is valid content
         * 确保 body 是有效的内容
         */
        if (!parsedSVG.body) {
          console.warn(`Failed to get SVG body for ::>>`, iconName);
          continue;
        }

        /**
         * Get the width and height from the SVG attributes
         * 从 SVG 属性中获取宽度和高度
         */
        let width = 24;
        let height = 24;

        /**
         * Extract dimensions from SVG attributes
         * 从 SVG 属性中提取尺寸
         */
        if (parsedSVG.attr?.viewBox) {
          /**
           * viewBox: min-x min-y width height
           * min-x min-y 是图标的左上角坐标，width height 是图标的宽度和高度
           */
          const viewBox = parsedSVG.attr.viewBox.split(' ');
          if (viewBox.length === 4) {
            // parseInt(string, 10) 将字符串转换为十进制整数
            width = Number.parseInt(viewBox[2], 10);
            height = Number.parseInt(viewBox[3], 10);
          }
        }

        icons[iconName] = {
          body: parsedSVG.body,
          height,
          width
        };
      }
    } catch (e) {
      console.error('Error processing SVG:', e);
    }

    /**
     * Cache the icon collection
     * 缓存图标集
     */
    iconCollection = icons;

    /**
     * Add the entire collection at once
     * 一次性添加整个集合
     * result 是addCollection的执行结果，返回 boolean 值，表示是否添加成功
     * @see https://iconify.design
     */
    const result = addCollection({
      prefix: 'local',
      icons,
      width: 24,
      height: 24
    });

    if (!result) {
      console.error('Failed to add local icons');
    }
  }
}
