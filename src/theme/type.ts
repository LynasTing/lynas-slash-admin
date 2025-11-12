import type { ThemeMode } from '#/enum';

export const themeTokens = {
  colors: {
    palette: {
      primary: {
        lighter: null,
        light: null,
        default: null,
        dark: null,
        darker: null
      },
      success: {
        lighter: null,
        light: null,
        default: null,
        dark: null,
        darker: null
      },
      warning: {
        lighter: null,
        light: null,
        default: null,
        dark: null,
        darker: null
      },
      error: {
        lighter: null,
        light: null,
        default: null,
        dark: null,
        darker: null
      },
      info: {
        lighter: null,
        light: null,
        default: null,
        dark: null,
        darker: null
      },
      gray: {
        '100': null,
        '200': null,
        '300': null,
        '400': null,
        '500': null,
        '600': null,
        '700': null,
        '800': null,
        '900': null
      }
    },
    common: {
      white: null,
      black: null
    },
    action: {
      hover: null,
      selected: null,
      focus: null,
      disabled: null,
      active: null
    },
    text: {
      primary: null,
      secondary: null,
      disabled: null
    },
    background: {
      default: null,
      paper: null,
      neutral: null
    }
  },
  typography: {
    fontFamily: {
      openSans: null,
      inter: null
    },
    fontSize: {
      xs: null,
      sm: null,
      default: null,
      lg: null,
      xl: null
    },
    fontWeight: {
      light: null,
      normal: null,
      medium: null,
      semibold: null,
      bold: null
    },
    lineHeight: {
      none: null,
      tight: null,
      normal: null,
      relaxed: null
    }
  },
  spacing: {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    10: null,
    12: null,
    16: null,
    20: null,
    24: null,
    32: null
  },
  borderRadius: {
    none: null,
    sm: null,
    default: null,
    md: null,
    lg: null,
    xl: null,
    full: null
  },
  shadows: {
    none: null,
    sm: null,
    default: null,
    md: null,
    lg: null,
    xl: null,
    '2xl': null,
    '3xl': null,
    inner: null,
    dialog: null,
    card: null,
    dropdown: null,
    primary: null,
    info: null,
    success: null,
    warning: null,
    error: null
  },
  screens: {
    xs: null,
    sm: null,
    md: null,
    lg: null,
    xl: null,
    '2xl': null
  },
  opacity: {
    0: null,
    5: null,
    10: null,
    20: null,
    25: null,
    30: null,
    35: null,
    40: null,
    45: null,
    50: null,
    55: null,
    60: null,
    65: null,
    70: null,
    75: null,
    80: null,
    85: null,
    90: null,
    95: null,
    100: null,
    border: null,
    hover: null,
    selected: null,
    focus: null,
    disabled: null,
    disabledBackground: null
  },
  zIndex: {
    appBar: null,
    drawer: null,
    nav: null,
    modal: null,
    snackbar: null,
    tooltip: null,
    scrollbar: null
  }
};

export type UILibraryAdapterProps = {
  /**
   * 主题模式
   * Theme mode
   */
  mode: ThemeMode;

  /**
   * 子组件
   * Children
   */
  children: React.ReactNode;
};

/**
 * React.FC<P> 定义一个函数式组件类型
 * - P: 组件的 props 类型
 * - 等价于 (props: UILibraryAdapterProps) => React.ReactElement | null
 */
export type UILibraryAdapter = React.FC<UILibraryAdapterProps>;

/**
 * 判断一个对象类型 <T> 是否是 叶子类型 即：
 * - T 必须是对象
 * - T 的所有属性值都只能是 string 或 null
 */
export type IsLeafObject<T> = T extends object ? (T[keyof T] extends null | string ? true : false) : false;

/**
 * 为目标 T 的所有类型为 string | null 属性额外添加一个对应的 Channel 后缀字段，类型为 string
 * - 如果 T 不是对象类型，直接返回原值
 * - 如果 T 是 IsLeafObject（叶子对象），就追加 Channel 字段
 * - 如果 T 不是 sLeafObject（叶子对象），就继续递归处理它的每个子属性
 */
export type AddChannelToLeaf<T> =
  // 如果 T 是对象
  T extends object
    ? // 判断它是不是“叶子对象”
      IsLeafObject<T> extends true
      ? /**
         * T &
         * - 将 T 的类型和添加过 Channel 后缀的类型合并
         */
        T & {
          /**
           * [K in keyof T] 遍历类型 T 的每一个属性键
           * as 遍历的同时 改名
           * ${string & K}Channel 类型约束
           * - 确保 K 是 string 类型的键名
           * - 因为 keyof T 可能是 string | number | symbol
           * - 而模板字面量不支持 symbol，所以要做个类型交集来限定它
           * - 表示把键名 K 拼上 "Channel"
           */
          [K in keyof T as `${string & K}Channel`]: string;
        }
      : //  不是叶子对象 → 继续递归，对里面的每个属性再执行 AddChannelToLeaf
        {
          [K in keyof T]: AddChannelToLeaf<T[K]>;
        }
    : //  如果 T 不是对象（例如 string、number、boolean）
      T;
