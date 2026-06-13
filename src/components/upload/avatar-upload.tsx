import type { UploadProps, UploadChangeParam } from 'antd/es/upload';
import { useEffect, useState, type ReactNode } from 'react';
import { createBlobUrl, formatBytes, revokeBlobUrl, validateAvatarFile } from '@/utils';
import { Upload } from 'antd';
import { toast } from 'sonner';
import { Text } from '@/ui/typography';
import { ACCEPTED_IMAGE_TYPES, MAX_AVATAR_SIZE } from '@/constants';
import { Icon } from '@/components/icon';
import { StyledAvatarUpload } from './styles';

interface AvatarUploadProps extends Omit<UploadProps, 'accept' | 'beforeUpload' | 'onChange' | 'showUploadList' | 'listType'> {
  /**
   * 默认头像
   * Default avatar
   */
  defaultAvatar?: string;

  /**
   * 上传头像回调
   * Callback for uploading avatars
   */
  onAvatarChange?: (file: File, previewUrl: string) => void;

  /**
   * 自定义辅助说明
   * Custom helper text
   */
  helperText?: ReactNode;
}

/**
 * 头像上传组件，负责校验头像文件、展示本地预览，并把原始文件和预览地址交给业务层处理。
 * @param props - 头像上传配置、默认头像和头像变化回调。
 * @returns 头像上传视图。
 *
 * Avatar upload component that validates avatar files, renders local previews, and exposes the source file plus preview URL to the business layer.
 * @param props - Avatar upload options, default avatar, and avatar change callback.
 * @returns Avatar upload view.
 */
export function AvatarUpload({ defaultAvatar, onAvatarChange, helperText, ...props }: AvatarUploadProps) {
  // 预览地址可能来自远程默认头像，也可能来自用户选择文件后生成的本地 blob URL。
  // The preview URL can come from a remote default avatar or a local blob URL generated from the selected file.
  const [previewUrl, setPreviewUrl] = useState(defaultAvatar);
  const [isHovering, setIsHovering] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  /**
   * 当外部默认头像变化时同步预览，避免表单回填后仍显示旧头像。
   * @returns 无返回值。
   *
   * Sync the preview when the external default avatar changes, so form backfills do not keep showing a stale avatar.
   * @returns No return value.
   */
  useEffect(() => {
    if (defaultAvatar) setPreviewUrl(defaultAvatar);
  }, [defaultAvatar]);

  /**
   * 组件卸载或预览地址切换时回收当前 blob URL，避免本地预览资源泄漏。
   * @returns 清理当前预览地址的回调。
   *
   * Revoke the current blob URL when the component unmounts or the preview URL changes to avoid leaking local preview resources.
   * @returns Callback that cleans up the current preview URL.
   */
  useEffect(() => {
    return () => {
      if (previewUrl) revokeBlobUrl(previewUrl);
    };
  }, [previewUrl]);

  /**
   * 上传前校验头像文件，失败时阻止文件进入 antd 上传列表。
   * @param file - 待上传的头像文件。
   * @returns 校验通过返回 true，否则返回 Upload.LIST_IGNORE。
   *
   * Validate the avatar file before upload and prevent invalid files from entering the antd upload list.
   * @param file - Avatar file to upload.
   * @returns True when validation passes; otherwise Upload.LIST_IGNORE.
   */
  const handleBeforeUpload: UploadProps['beforeUpload'] = file => {
    const isValid = validateAvatarFile(file);

    if (!isValid) {
      return Upload.LIST_IGNORE;
    }

    return true;
  };

  /**
   * 为新头像生成本地预览地址，并回收旧的 blob URL，避免连续选择文件时累积资源。
   * @param file - 新选择的头像文件。
   * @returns 无返回值。
   *
   * Generate a local preview URL for the new avatar and revoke the previous blob URL to avoid accumulating resources across selections.
   * @param file - Newly selected avatar file.
   * @returns No return value.
   */
  const updatePreviewUrl = (file: File) => {
    const nextPreviewUrl = createBlobUrl(file);

    setPreviewUrl(currentPreviewUrl => {
      if (typeof currentPreviewUrl === 'string') {
        revokeBlobUrl(currentPreviewUrl);
      }
      return nextPreviewUrl;
    });

    onAvatarChange?.(file, nextPreviewUrl);
  };

  /**
   * 根据 antd 上传状态维护交互反馈，只在上传完成后把原始文件转成本地预览。
   * @param param - antd 上传状态变化参数。
   * @returns 无返回值。
   *
   * Maintain interaction feedback from the antd upload status and only convert the source file into a local preview after completion.
   * @param param - antd upload change payload.
   * @returns No return value.
   */
  const handleChange = ({ file }: UploadChangeParam) => {
    if (file.status === 'uploading') {
      setIsUploading(true);
      return;
    }

    if (file.status === 'error') {
      setIsUploading(false);
      toast.error('Failed to upload avatar');
      return;
    }

    if (file.status === 'done') {
      setIsUploading(false);

      if (file.originFileObj) {
        updatePreviewUrl(file.originFileObj);
      }
    }
  };

  // 没有头像、悬停或上传中时显示遮罩，让上传入口和状态反馈始终可见。
  // Show the overlay when there is no avatar, on hover, or while uploading so the upload entry and feedback stay visible.
  const shouldShowOverlay = !previewUrl || isHovering || isUploading;

  /**
   * 默认辅助说明在未传入自定义内容时展示，保证头像上传限制始终对用户可见。
   *
   * The default helper text is shown when no custom content is provided, keeping avatar upload limits visible to users.
   */
  const defaultHelperText = (
    <Text variant="caption" color="secondary">
      Allowed *.jpeg, *.jpg, *.png
      <br />
      max size of {formatBytes(MAX_AVATAR_SIZE)}
    </Text>
  );

  return (
    <StyledAvatarUpload>
      <Upload
        {...props}
        name="avatar"
        accept={ACCEPTED_IMAGE_TYPES.join(',')}
        showUploadList={false}
        listType="picture-circle"
        className="avatar-upload flex! items-center justify-center"
        beforeUpload={handleBeforeUpload}
        onChange={handleChange}>
        <div
          className="relative flex size-full items-center justify-center overflow-hidden rounded-full"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}>
          {previewUrl && <img src={previewUrl} className="absolute size-full rounded-full object-cover" />}
          {shouldShowOverlay && (
            <div className="absolute z-10 flex size-full flex-col items-center justify-center rounded-full">
              <Icon icon="solar:camera-add-bold" size={32} />
              <div className="mt-1 text-xs">{isUploading ? 'Uploading...' : 'Upload avatar'}</div>
            </div>
          )}
        </div>
      </Upload>
      <div className="mt-2.5 text-center">{helperText ?? defaultHelperText}</div>
    </StyledAvatarUpload>
  );
}
