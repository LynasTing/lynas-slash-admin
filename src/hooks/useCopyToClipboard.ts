import { useState } from 'react';
import { toast } from 'sonner';
import useLocale from '@/locales/use-locale';

/**
 * 复制内容的状态类型
 * Copied text state type, null means nothing has been copied yet
 */
type CopiedValue = string | null;

/**
 * 复制函数签名
 * Copy function signature, returns whether copy succeeded
 */
type CopyFn = (text: string) => Promise<boolean>;

/**
 * 复制文本到剪贴板
 *
 * - 提供一个复制函数 copyFn
 * - 维护当前已复制的内容 copiedText
 * - 内置成功/失败提示（toast）
 *
 * - Provides a copy function (copyFn)
 * - Maintains the last copied value (copiedText)
 * - Includes success/failure toast feedback
 */
export const useCopyToClipboard = (): {
  copiedText: CopiedValue;
  copyFn: CopyFn;
} => {
  /** 当前复制的文本 / Stores the last successfully copied text */
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);
  const { t } = useLocale();

  const copyFn: CopyFn = async text => {
    /**
     * Clipboard API 是否可用
     * Check if Clipboard API is available
     */
    if (!navigator?.clipboard) {
      toast.error(t('ui.functions.clipboardNotSupported'));
      return false;
    }

    try {
      /** 写入剪贴板 / Write text into clipboard */
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      toast.success(t('ui.functions.copied'));
      return true;
    } catch (err) {
      console.error('copy failed', err);
      setCopiedText(null);
      if (typeof err?.message === 'string') {
        toast.error(err.message);
      }
      return false;
    }
  };

  /**
   * 【返回值】
   * - copiedText: 当前复制的内容
   * - copyFn: 复制方法
   *
   * 【Return values】
   * - copiedText: last copied value
   * - copyFn: copy handler
   */
  return {
    copiedText,
    copyFn
  };
};
