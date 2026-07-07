import { BasicStatusEnum } from '#/enum';

/**
 * 基础状态国际化键映射。
 * 常量层只保存稳定的翻译键，避免在非 React 模块里调用 Hook，也避免语言切换后文案不更新。
 *
 * Basic status i18n key map.
 * The constants layer stores stable translation keys only, avoiding Hook usage outside React modules and stale labels after language changes.
 */
export const BASIC_STATUS_LABEL_KEY_MAP: Record<BasicStatusEnum, string> = {
  [BasicStatusEnum.ENABLE]: 'common.status.enable',
  [BasicStatusEnum.DISABLE]: 'common.status.disable'
};
