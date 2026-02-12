import { themeTokens, type AddChannelToLeaf } from '../theme/type';
import color from 'color';

/**
 * 任意键值对象，但值类型未知（安全替代 any）
 * Any key-value object where the value type is unknown (safely replace any)
 */
type UnknowRecord = Record<string, unknown>;

type StringRecord = Record<string, string>;

/**
 * - 获取指定路径下的主题 Token，例如 "colors.palette.primary"
 * - 并返回该层对象的所有键名，如 ['light', 'dark', 'default]
 *
 * - Retrieve all variant keys of a given token path (e.g., "colors.palette.primary"),
 * - returning the object's keys at that level (e.g., ["light", "dark", "default"]).
 *
 * @param propertyPath - Token 属性路径，例如 "colors.palette.primary"
 * @returns string[] - 指定路径下对象的键数组 / Array of keys under the given path
 */
const getThemeTokenVariants = (propertyPath: string) => {
  /** 将 string 路径分割成数组 */
  const keys = propertyPath.split('.');

  /**
   * 从 themeTokens 根对象中逐层取值
   *
   * - obj 的初始值为 themeTokens
   * - 每次迭代取下一层的 key
   * - 如果当前层存在并且是对象，则继续深入
   * - 否则返回 undefined 并终止循环
   *
   * Retrieve values from themeTokens at each level using reduce
   *
   * - obj's initial value is themeTokens
   * - Each iteration retrieves the next level's key
   * - If the current level exists and is an object, continue to the next level
   * - Otherwise, return undefined and terminate the loop
   */
  const val = keys.reduce<UnknowRecord | undefined>((obj, key) => {
    if (obj && typeof obj === 'object' && key in obj) {
      return obj[key] as UnknowRecord | undefined;
    }
    return;
  }, themeTokens);

  /** 如果最终取道的值是一个对象，则返回它的所有键名 / If the final value is an object, return its keys */
  return val ? Object.keys(val) : [];
};

/**
 * get varints in {@link themeTokens}
 *
 * 根据点分路径字符串，获取 themeTokens 对象中对应层级的属性键
 * Create an array of keys for a nested object inside themeTokens based on a dot-separated path.
 *
 * @param propertyPath - 点分路径字符串，例如 "color.primary"
 * @returns 返回该路径对应对象的所有键，如果路径无效返回空数组
 */
export const createColorChannel = (propertyPath: string) => {
  const variants = getThemeTokenVariants(propertyPath);

  const result = variants.reduce((acc, variant) => {
    const variantKey = variant === 'default' ? 'DEFAULT' : variant;

    acc[variantKey] = `rgb(var(${toCssVar(`${propertyPath}-${variant}Channel`)}))`;
    return acc;
  }, {} as StringRecord);
  return result;
};

/**
 * 添加颜色属性
 * Add color channels to an object
 */
export const addColorChannels = <T extends UnknowRecord>(obj: T): AddChannelToLeaf<T> => {
  const result: UnknowRecord = {};

  /**
   * 判断传入对象是否是 ”叶子类型“
   * Whether the passed object is a leaf type
   */
  const IsLeafObject = Object.values(obj).every(v => v === null || typeof v === 'string');

  if (IsLeafObject) {
    for (const [key, value] of Object.entries(obj)) {
      result[key] = value;
      result[`${key}Channel`] = color(value as string)
        .rgb()
        .array()
        .join(' ');
    }
  } else {
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object' && value !== null) {
        result[key] = addColorChannels(value as UnknowRecord);
      } else {
        result[key] = value;
      }
    }
  }

  return result as AddChannelToLeaf<T>;
};

/**
 * 给颜色值添加透明度（alpha）
 * Apply alpha (opacity) to a given color value.
 *
 * @param colorVal - 颜色值，字符串或数组形式
 *                   Color value as string or array of strings/numbers
 *
 * @param alpha - 透明度 0~1
 *                Alpha value between 0 and 1
 *
 * @returns 带透明度的 CSS rgba 字符串 / RGBA string with alpha
 */
export function rgbAlpha(colorVal: string | Array<string> | Array<number>, alpha: number) {
  /**
   * 确保 alpha 的值在 0-1 之间
   */
  const safeAlpha = Math.max(0, Math.min(1, alpha));

  if (typeof colorVal === 'string') {
    /**
     * 如果颜色值以 # 开头，表示为十六进制颜色值
     * If the color value starts with #, it is a hexadecimal color value
     *
     * @example #ffffff
     * @returns rgba(255, 255, 255, 1)
     */
    if (colorVal.startsWith('#')) {
      return color(colorVal).alpha(safeAlpha).toString();
    }

    /**
     * 如果颜色值以 rgb 开头，表示为 RGB 颜色值
     * If the color value starts with rgb, it is an RGB color value
     *
     * @example rgb(255, 255, 255)
     * @returns rgba(255, 255, 255, 1)
     */
    if (colorVal.includes('var(')) {
      return `rgba(${colorVal} / ${safeAlpha})`;
    }

    /**
     * 如果颜色值以 -- 开头，表示为 CSS 变量
     * If the color value starts with --, it is a CSS variable
     *
     * @example --colors-palette-primary-main
     * @returns rgba(var(--colors-palette-primary-main) / 1)
     */
    if (colorVal.startsWith('--')) {
      return `rgba(var(${colorVal}) / ${safeAlpha})`;
    }

    /**
     * 如果颜色值包含逗号或空格，表示为 RGB 颜色值
     * If the color value contains commas or spaces, it is an RGB color value
     *
     * @example 255, 255, 255
     * @returns rgba(255, 255, 255, 1)
     */
    if (colorVal.includes(',') || colorVal.includes(' ')) {
      const rgb = colorVal
        /** 以逗号或空格分隔颜色值 / Separate color values by commas or spaces */
        .split(/[,\s]+/)
        /** 将分隔后的字符串转换为数字 / Convert separated strings to numbers */
        .map(n => Number(n.trim()))
        /** 过滤掉非数字的元素 / Filter out non-numeric elements */
        .filter(n => !isNaN(n));

      return `rgba(${rgb.join(', ')}, ${safeAlpha})`;
    }
  }

  /**
   * 处理数组颜色值
   * Handle array color values
   *
   * @example [255, 255, 255]
   * @returns rgba(255, 255, 255, 1)
   */
  if (Array.isArray(colorVal)) {
    return `rgba(${colorVal.join(', ')}, ${safeAlpha})`;
  }

  throw new Error('Invalid color value');
}

/**
 * 将属性路径转换为 CSS 变量名称
 * Convert property path to CSS variable name
 *
 * @param propertyPath example: `colors.palette.primary`
 * @returns example: `--colors-palette-primary`
 *
 */
function toCssVar(propertyPath: string) {
  return `--${propertyPath.split('.').join('-')}`;
}

/**
 * 根据指定的主题属性路径生成 Tailwind 配置对象
 * Generate a Tailwind configuration object based on the specified theme property path
 *
 * @param propertyPath - 主题属性路径，例如 "color.primary"
 */
export function createTailwindConfig(propertyPath: string) {
  /** 获取该路径下的所有可用变体 */
  const variants = getThemeTokenVariants(propertyPath);

  /**
   * 构建一个对象
   */
  const result = variants.reduce((acc, variant) => {
    acc[variant] = `var(${toCssVar(`${propertyPath}-${variant}`)})`;
    return acc;
  }, {} as StringRecord);

  return result;
}

/**
 * 去除 px 单位
 * remove px unit
 *
 * @example 10px -> 10
 */
export const removePx = (value: string | number): number => {
  // 如果已经是 number 了，直接返回 / Return if it's already a number
  if (typeof value === 'number') return value;

  // 空值抛错 / Throw error for empty value
  if (!value) {
    throw new Error('Invalid value: empty string');
  }

  // 去掉首尾空格 / Trim leading and trailing spaces
  const trimed = value.trim();

  // 检查是否以 px 结尾 / Check if it ends with px
  const hasPx = /px$/i.test(trimed);

  // 提取数字部分 / Extract the numeric part
  const num = hasPx ? trimed.slice(0, -2) : trimed;

  // 转为 number / Convert to number
  const result = Number.parseFloat(num);

  // 是否是有效数字 / Check if it's a valid number
  if (Number.isNaN(result)) {
    throw new Error(`Invalid value: ${value}`);
  }

  return result;
};
