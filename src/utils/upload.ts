import { ACCEPTED_IMAGE_TYPES, MAX_AVATAR_SIZE, type AcceptedImageTypes } from '@/constants';
import { t } from '@/locales/i18n';
import { toast } from 'sonner';
import { formatBytes } from './format-number';

/**
 * 创建 blob URL
 * Create blob URL
 */
export function createBlobUrl(file: File): string {
  return URL.createObjectURL(file);
}

/**
 * 判断 URL 是否为 blob URL
 * Determine whether the URL is a blob URL
 */
export function isBlobUrl(url: string): boolean {
  return url.startsWith('blob:');
}

/**
 * 回收 blob URL
 * Recycle blob URL
 */
export function revokeBlobUrl(url: string): void {
  if (isBlobUrl(url)) {
    URL.revokeObjectURL(url);
  }
}

/**
 * 校验头像文件
 * Validate avatar file
 */
export function validateAvatarFile(file: File): boolean {
  const { type, size } = file;

  // 是否为允许的图片类型 / Whether the image type is accepted
  const isAcceptedType = ACCEPTED_IMAGE_TYPES.includes(type as AcceptedImageTypes);

  // 是否小于头像上传大小限制 / Whether the avatar size is within the upload limit
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
