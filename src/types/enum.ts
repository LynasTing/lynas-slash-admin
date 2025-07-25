export enum BasicStatus {
  DISABLE = 0,
  ENABLE = 1
}

export enum ResultStatus {
  SUCCESS = 1,
  FAIL = 0
}

export enum LocalEnum {
  en_US = 'en_US',
  zh_CN = 'zh_CN'
}

export enum PermissionEnum {
  /**
   * 分组权限
   * Group permission
   */
  GROUP = 0,

  /**
   * 目录权限
   * Catalogue permission
   */
  CATALOGUE = 1,

  /**
   * 菜单权限
   * Menu permission
   */
  MENU = 2,

  /**
   * 组件权限
   * Component permission
   */
  COMPONENT = 3
}

export enum StorageEnum {
  /**
   * 用户信息
   * User information
   */
  UserInfo = 'userInfo',

  /**
   * 用户 token
   * User token
   */
  UserToken = 'userToken',

  /**
   * 系统设置
   * System settings
   */
  Settings = 'settings',

  /**
   * 国际化语言
   * Internationalization language
   */
  I18N = 'i18nextLang'
}
