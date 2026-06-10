import { FILE_THUMBNAIL_NAME_MAP } from '@/constants';
import { getFileFormat } from '@/utils/upload';

/**
 * 根据文件名解析对应的缩略图资源名。
 * @param fileName - 文件名；为空或无法匹配时使用默认文件图标。
 * @returns 缩略图资源名。
 *
 * Resolve the thumbnail asset name from a file name.
 * @param fileName - File name; empty or unmatched values use the default file icon.
 * @returns Thumbnail asset name.
 */
export function getFileThumbnailName(fileName: string | undefined): string {
  // 缩略图表按业务类型组织，需要先把 docx、jpg 等扩展名归类。
  // The thumbnail map is keyed by business type, so raw extensions like docx and jpg must be classified first.
  const fileFormat = getFileFormat(fileName);

  return FILE_THUMBNAIL_NAME_MAP[fileFormat] ?? 'file';
}
