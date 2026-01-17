/**
 * 存储类型
 * Storage type
 */
export enum StorageEnum {
  UserInfo = 'userInfo',
  UserToken = 'userToken',
  Settings = 'settings',
  User = 'user',
  I18N = 'i18nextLng'
}

/**
 * 语言类型
 * Language type
 */
export enum LocalEnum {
  en_US = 'en_US',
  zh_CN = 'zh_CN'
}

/**
 * 基础状态
 * Basic status
 */
export enum BasicStatusEnum {
  /**
   * 禁用
   * Disabled
   */
  DISABLE = 0,

  /**
   * 启用
   * Enabled
   */
  ENABLE = 1
}

/**
 * 权限类型枚举
 * Permission type enumeration
 *
 * 用于区分不同层级或类型的权限节点
 * Used to distinguish between different levels or types of permission nodes
 */
export enum PermissionTypeEnum {
  /**
   * 分组（最高层，用于逻辑分类）
   * Group (top-level logical category)
   */
  GROUP = 0,

  /**
   * 目录（可包含子菜单或页面）
   * Catalogue (can contain submenus or pages)
   */
  CATALOGUE = 1,

  /**
   * 菜单（具体的页面入口）
   * Menu (a specific page entry)
   */
  MENU = 2,

  /**
   * 组件 / 功能点（页面内部的按钮或操作权限）
   * Component / Action (button or operation permission within a page)
   */
  COMPONENT = 3
}

/**
 * 主题模式
 * Theme mode
 */
export enum ThemeMode {
  /**
   * 浅色
   * Light
   */
  Light = 'light',

  /**
   * 深色
   * Dark
   */
  Dark = 'dark'
}

/**
 * HTML 自定义属性枚举
 * Enum for HTML data attributes used to control global theme behavior.
 *
 * 用于在 HTML 根节点上标识主题相关状态（如主题模式、配色方案）的枚举。
 * These attributes are dynamically added to the <html> or <body> element
 * to control global CSS variables and theme behavior.
 */
export enum HtmlDataAttribute {
  /**
   * 主题配色方案（如：default、blue、green...）
   * Color palette attribute (e.g. default, blue, green...)
   *
   * 应用于 <html data-color-palette="blue"> 这种形式，
   * 用来指定当前主题的主色系。
   */
  ColorPalette = 'data-color-palette',

  /**
   * 主题模式（浅色 / 深色）
   * Theme mode attribute (light / dark)
   *
   * 应用于 <html data-theme-mode="dark"> 这种形式，
   * 用来切换全局浅色或深色模式。
   */
  ThemeMode = 'data-theme-mode'
}

/**
 * 主题色彩预设枚举
 * Enum for predefined theme color palettes.
 *
 * 用于定义全局主题的主色调类型，例如默认、蓝色、紫色、红色等。
 * Each preset represents a primary color scheme used across the application.
 */
export enum ThemeColorPresets {
  /** 默认配色 / Default color palette */
  Default = 'default',

  /** 青色配色 / Cyan color palette */
  Cyan = 'cyan',

  /** 紫色配色 / Purple color palette */
  Purple = 'purple',

  /** 蓝色配色 / Blue color palette */
  Blue = 'blue',

  /** 橙色配色 / Orange color palette */
  Orange = 'orange',

  /** 红色配色 / Red color palette */
  Red = 'red'
}

/**
 * 结果状态
 * Result status
 */
export enum ResultStatusEnum {
  /** 成功 / Success */
  SUCCESS = 0,
  /** 失败 / Failure */
  ERROR = -1,
  /** */
  TIMEOUT = 401
}

/**
 * 主题布局
 * Theme layout
 */
export enum ThemeLayoutEnum {
  /** 垂直 / Vertical */
  Vertical = 'vertical',
  /** 水平 / Horizontal */
  Horizontal = 'horizontal',
  /** 小型 / Mini */
  Mini = 'mini'
}
