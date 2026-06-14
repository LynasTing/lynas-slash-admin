import type { ItemRender } from 'antd/es/upload/interface';
import { Card } from '@/ui/card';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/ui/tooltip';
import { getFileFormat, createBlobUrl, formatBytes, revokeBlobUrl } from '@/utils';
import { FILE_THUMBNAIL_NAME_MAP } from '@/constants';
import { useEffect, useState } from 'react';
import { Icon } from '@/components/icon';
import Button from '@/ui/button';
import { m } from 'motion/react';
import { varFade } from '@/components/animate/variants';

/**
 * 根据文件名解析对应的缩略图资源名。
 * @param fileName - 文件名；为空或无法匹配时使用默认文件图标。
 * @returns 缩略图资源名。
 *
 * Resolve the thumbnail asset name from a file name.
 * @param fileName - File name; empty or unmatched values use the default file icon.
 * @returns Thumbnail asset name.
 */
function getFileThumbnailName(fileName: string | undefined): string {
  // 缩略图表按业务类型组织，需要先把 docx、jpg 等扩展名归类。
  // The thumbnail map is keyed by business type, so raw extensions like docx and jpg must be classified first.
  const fileFormat = getFileFormat(fileName);

  return FILE_THUMBNAIL_NAME_MAP[fileFormat] ?? 'file';
}

export type UploadListItemProps = {
  /**
   * Ant Design Upload 当前渲染的文件对象。
   * Parameters<T> 会把函数类型 T 的参数列表提取成元组类型。
   * 例如 ItemRender 的参数可理解为 [originNode, file, fileList, actions]，
   * 因此 Parameters<ItemRender>[1] 表示第二个参数 file 的类型。
   *
   * Current file object rendered by Ant Design Upload.
   * Parameters<T> extracts the parameter list of function type T as a tuple.
   * For example, ItemRender parameters can be understood as [originNode, file, fileList, actions],
   * so Parameters<ItemRender>[1] represents the type of the second parameter, file.
   */
  file: Parameters<ItemRender>[1];

  /**
   * Ant Design Upload 提供的列表项操作集合。
   * Parameters<ItemRender>[3] 直接复用 ItemRender 第四个参数 actions 的类型，
   * 避免手写 remove、download、preview 等操作类型后与 Ant Design 升级脱节。
   *
   * List item actions provided by Ant Design Upload.
   * Parameters<ItemRender>[3] reuses the type of the fourth ItemRender parameter, actions,
   * avoiding manually maintained remove, download, and preview action types that can drift after Ant Design upgrades.
   */
  actions: Parameters<ItemRender>[3];

  /**
   * 文件列表项的显示模式。
   *
   * Display mode for the upload list item.
   */
  viewMode?: 'thumbnail' | 'list';
};

/**
 * 渲染上传列表中的单个文件项，支持缩略图模式和列表模式。
 * @param props - 文件项渲染参数。
 * @returns 上传文件列表项。
 *
 * Render a single file item in the upload list with thumbnail and list modes.
 * @param props - File item rendering props.
 * @returns Upload file list item.
 */
export default function UploadListItem({ file, actions, viewMode }: UploadListItemProps) {
  const { name: fileName, size } = file;
  // 文件格式 / File format
  const format = getFileFormat(fileName);
  // 根据文件名解析对应的缩略图资源名 / Resolve the thumbnail asset name from a file name
  const thumbName = getFileThumbnailName(fileName);
  // 缩略图预览地址 / Thumbnail preview URL
  const [thumbImgUrl, setThumbImgUrl] = useState('');

  /**
   * 图片预览地址按稳定性从高到低取值：已上传文件地址、Ant Design 生成的缩略图、本地 Blob 地址。
   * 这样可以兼容受控 fileList、默认 fileList，以及 beforeUpload 返回 false 的本地文件场景。
   *
   * Image preview URLs are resolved by stability: uploaded file URL, Ant Design thumbnail URL, then local Blob URL.
   * This supports controlled fileList, default fileList, and local files kept by beforeUpload returning false.
   */
  const previewUrl = file.url || file.thumbUrl || thumbImgUrl;

  /**
   * 只有图片文件缺少现成预览地址时，才为 originFileObj 创建本地 Blob URL。
   * 外部 URL 和 Ant Design 缩略图不需要手动释放，只有本地创建的 Blob URL 需要在清理阶段释放。
   *
   * Create a local Blob URL only when an image file has no existing preview URL.
   * External URLs and Ant Design thumbnails do not need manual cleanup; only locally created Blob URLs are revoked.
   */
  useEffect(() => {
    if (file.url || file.thumbUrl || format !== 'img' || !file.originFileObj) {
      setThumbImgUrl('');
      return;
    }

    const nextThumbImgUrl = createBlobUrl(file.originFileObj);
    setThumbImgUrl(nextThumbImgUrl);

    return () => {
      revokeBlobUrl(nextThumbImgUrl);
    };
  }, [file.url, file.thumbUrl, format, file.originFileObj]);

  /**
   * 删除按钮由两种视图共享，保证上传列表的移除行为一致。
   *
   * The remove button is shared by both views to keep upload item removal behavior consistent.
   */
  const closeButton = (
    <Button variant="ghost" size="icon" className="ml-auto rounded-full" onClick={actions.remove}>
      <Icon icon="mingcute:close-line" size={16} />
    </Button>
  );

  /**
   * 图片文件使用真实预览地址，其他文件类型使用本地图标资源。
   *
   * Image files use the real preview URL, while other file types use local icon assets.
   */
  const previewImg = previewUrl ? <img src={previewUrl} alt={fileName} className="size-8" /> : null;

  /**
   * 缩略图模式只保留图标和悬浮信息，适合紧凑型上传区域。
   *
   * Thumbnail mode keeps only the icon and tooltip, which fits compact upload areas.
   */
  const thumbItem = (
    <Card className="relative mt-2 mr-2 flex size-20 items-center justify-center">
      <Tooltip>
        <TooltipTrigger>{format === 'img' && previewImg ? previewImg : <Icon icon={`local:${thumbName}`} size={40} />}</TooltipTrigger>
        <TooltipContent>{fileName}</TooltipContent>
      </Tooltip>
      <div className="absolute top-0 right-0">{closeButton}</div>
    </Card>
  );

  /**
   * 列表模式展示文件名和体积，适合需要扫读文件明细的上传区域。
   *
   * List mode shows file name and size, which fits upload areas that need scannable details.
   */
  const cardItem = (
    <Card className="mt-2 flex flex-row! items-center gap-2 px-4 py-2">
      {format === 'img' && previewImg ? previewImg : <Icon icon={`local:${thumbName}`} size={32} />}
      <div className="ml-4 flex flex-col">
        <p className="text-sm font-semibold">{fileName}</p>
        <p className="text-xs">{formatBytes(size)}</p>
      </div>
      {closeButton}
    </Card>
  );

  // 使用统一动画包装两种视图，避免切换展示模式时出现突兀的列表变化。
  // Wrap both views with the same animation to avoid abrupt list changes when the display mode switches.
  return (
    <m.div initial="initial" animate="animate" exit="exit" variants={varFade().inUp}>
      {viewMode === 'thumbnail' ? thumbItem : cardItem}
    </m.div>
  );
}
