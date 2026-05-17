/**
 * 默认最大图片上传尺寸：3MB
 * Default maximum image upload size: 3MB
 */
export const MAX_AVATAR_SIZE = 1024 * 1024 * 3;

/**
 * 默认允许上传的图片 MIME 类型
 * Default accepted image MIME types
 */
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'] as const;

export type AcceptedImageTypes = (typeof ACCEPTED_IMAGE_TYPES)[number];
