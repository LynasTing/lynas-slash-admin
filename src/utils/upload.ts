import { ACCEPTED_IMAGE_TYPES, FILE_TYPE_MAP, MAX_AVATAR_SIZE, type AcceptedImageTypes } from '@/constants';
import { t } from '@/locales/i18n';
import { toast } from 'sonner';
import { formatBytes } from './format-number';

/**
 * 为本地文件创建可预览的 blob URL。
 * @param file - 需要生成预览地址的文件对象。
 * @returns 浏览器生成的临时 blob URL。
 *
 * Create a previewable blob URL for a local file.
 * @param file - File object used to generate the preview URL.
 * @returns Temporary blob URL created by the browser.
 */
export function createBlobUrl(file: File): string {
  return URL.createObjectURL(file);
}

/**
 * 判断 URL 是否为浏览器生成的 blob URL。
 * @param url - 需要判断的 URL。
 * @returns 如果是 blob URL，返回 true。
 *
 * Check whether a URL is a browser-generated blob URL.
 * @param url - URL to check.
 * @returns True when the URL is a blob URL.
 */
export function isBlobUrl(url: string): boolean {
  return url.startsWith('blob:');
}

/**
 * 回收浏览器生成的 blob URL，避免本地预览资源泄漏。
 * @param url - 需要回收的 URL；非 blob URL 会被忽略。
 * @returns 无返回值。
 *
 * Revoke a browser-generated blob URL to avoid leaking local preview resources.
 * @param url - URL to revoke; non-blob URLs are ignored.
 * @returns No return value.
 */
export function revokeBlobUrl(url: string): void {
  if (isBlobUrl(url)) {
    URL.revokeObjectURL(url);
  }
}

/**
 * 校验头像文件是否满足图片类型和大小限制。
 * @param file - 需要校验的头像文件。
 * @returns 校验通过返回 true，否则提示错误并返回 false。
 *
 * Validate whether an avatar file satisfies image type and size limits.
 * @param file - Avatar file to validate.
 * @returns True when validation passes; otherwise shows an error and returns false.
 */
export function validateAvatarFile(file: File): boolean {
  const { type, size } = file;

  // 头像上传只允许配置内的图片 MIME 类型，避免把非图片文件提交到后端。
  // Avatar upload only accepts configured image MIME types to avoid sending non-image files to the backend.
  const isAcceptedType = ACCEPTED_IMAGE_TYPES.includes(type as AcceptedImageTypes);

  // 前端提前拦截超大文件，减少无效上传请求。
  // Oversized files are rejected on the client to reduce invalid upload requests.
  const isAcceptedSize = size <= MAX_AVATAR_SIZE;

  if (!isAcceptedType) {
    toast.error(t('common.upload.avatarAcceptedTypes'));
    return false;
  }

  if (!isAcceptedSize) {
    toast.error(t('common.upload.avatarMaxSize', { size: formatBytes(MAX_AVATAR_SIZE) }));
    return false;
  }

  return true;
}

/**
 * 从文件名中解析文件扩展名。
 * @param fileName - 文件名；缺省或无法解析时按文件夹类型处理。
 * @returns 小写文件扩展名；没有扩展名时返回 folder。
 *
 * Parse the file extension from a file name.
 * @param fileName - File name; defaults to folder type when omitted or unresolvable.
 * @returns Lowercase file extension; returns folder when no extension exists.
 */
export function getFileExtension(fileName = ''): string {
  // 上传列表会混合文件和文件夹，folder 作为兜底值可以让后续映射保持稳定。
  // Upload lists can contain both files and folders, so folder keeps downstream mapping stable as a fallback.
  return fileName?.split('.').pop()?.toLowerCase() || 'folder';
}

/**
 * 根据文件名获取业务文件格式。
 * @param fileName - 文件名；未知扩展名会原样返回。
 * @returns 业务文件格式分类或原始扩展名。
 *
 * Resolve the business file format from a file name.
 * @param fileName - File name; unknown extensions are returned as-is.
 * @returns Business file format category or the original extension.
 */
export function getFileFormat(fileName: string | undefined): string {
  // 展示层依赖 word、excel、img 等业务分类；未知类型保留扩展名，避免丢失原始信息。
  // The UI relies on categories like word, excel, and img; unknown types keep their extension to avoid losing source information.
  const ext = getFileExtension(fileName);

  return FILE_TYPE_MAP[ext] ?? ext;
}
