/**
 * 默认最大图片上传尺寸：3MB。
 *
 * Default maximum image upload size: 3MB.
 */
export const MAX_AVATAR_SIZE = 1024 * 1024 * 3;

/**
 * 默认允许上传的图片 MIME 类型。
 *
 * Default accepted image MIME types.
 */
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'] as const;

export type AcceptedImageTypes = (typeof ACCEPTED_IMAGE_TYPES)[number];

/**
 * 统一维护扩展名到业务文件类型的映射，避免上传和展示逻辑重复分类文件。
 *
 * Keep extension-to-business-type mapping centralized so upload and display logic do not classify files repeatedly.
 */
export const FILE_TYPE_MAP: Record<string, string> = {
  pdf: 'pdf',
  txt: 'txt',
  psd: 'psd',
  doc: 'word',
  docx: 'word',
  xls: 'excel',
  xlsx: 'excel',
  ppt: 'ppt',
  pptx: 'ppt',
  zip: 'zip',
  rar: 'zip',
  iso: 'zip',
  ai: 'ai',
  esp: 'ai',
  mp3: 'audio',
  wav: 'audio',
  aif: 'audio',
  aac: 'audio',
  png: 'img',
  jpg: 'img',
  jpeg: 'img',
  gif: 'img',
  bmp: 'img',
  svg: 'img',
  webp: 'img',
  mp4: 'video',
  mov: 'video',
  m4v: 'video',
  avi: 'video',
  mpg: 'video',
  webm: 'video'
};

/**
 * 业务文件类型与缩略图资源名称一一对应，组件只需要关心最终资源名。
 *
 * Business file types map directly to thumbnail asset names, so components only consume the resolved asset name.
 */
export const FILE_THUMBNAIL_NAME_MAP: Record<string, string> = {
  txt: 'file-txt',
  zip: 'file-zip',
  audio: 'file-audio',
  video: 'file-video',
  word: 'file-word',
  excel: 'file-excel',
  ppt: 'file-ppt',
  pdf: 'file-pdf',
  ai: 'file-ai',
  img: 'file-img',
  folder: 'folder'
};
