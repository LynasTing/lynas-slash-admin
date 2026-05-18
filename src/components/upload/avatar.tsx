import type { UploadProps, UploadChangeParam } from 'antd/es/upload';
import { useEffect, useState } from 'react';
import { createBlobUrl, formatBytes, revokeBlobUrl, validateAvatarFile } from '@/utils';
import { Upload } from 'antd';
import { toast } from 'sonner';
import { Text } from '@/ui/typography';
import { MAX_AVATAR_SIZE } from '@/constants';
import { Icon } from '@/components/icon';
import { StyledUploadAvatar } from './styles';

interface UploadAvatarProps extends Omit<UploadProps, 'beforeUpload' | 'onChange' | 'showUploadList' | 'listType'> {
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
}

/**
 * 创建 blob URL
 * @param file - 文件对象
 *
 * Create blob URL
 * @param file - File object
 *
 *
 * @returns blob URL
 */
export function UploadAvatar({ defaultAvatar, onAvatarChange, ...props }: UploadAvatarProps) {
  // 默认头像 / 用户新上传的 blob 临时地址   default avatar / temporary address of the blob uploaded by the user
  const [previewUrl, setPreviewUrl] = useState(defaultAvatar);
  const [isHovering, setIsHovering] = useState(false);
  // 是否正在上传中 / Whether it is uploading
  const [isUploading, setIsUploading] = useState(false);

  /**
   * 更新 previewUrl
   * Update previewUrl
   */
  useEffect(() => {
    if (defaultAvatar) setPreviewUrl(defaultAvatar);
  }, [defaultAvatar]);

  /**
   * 每当 previewUrl 发生变化时，回收之前的 blob URL
   * Each time the previewUrl changes, the previous blob URL is recycled
   */
  useEffect(() => {
    if (previewUrl) revokeBlobUrl(previewUrl);
  }, [previewUrl]);

  /**
   * 上传前回调
   * Before upload callback
   */
  const handleBeforeUpload: UploadProps['beforeUpload'] = file => {
    const isValid = validateAvatarFile(file);
    if (!isValid) {
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  /**
   * 更新预览 URL
   * Update preview URL
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
   * 上传变化回调
   * Upload change callback
   */
  const handleChange = ({ file }: UploadChangeParam) => {
    // 上传中 / Uploading
    if (file.status === 'uploading') {
      setIsUploading(true);
      return;
    }

    // 上传失败 / Upload failed
    if (file.status === 'error') {
      setIsUploading(false);
      toast.error('Failed to upload avatar');
      return;
    }

    // 上传完成 / Upload completed
    if (file.status === 'done') {
      setIsUploading(false);
      if (file.originFileObj) {
        updatePreviewUrl(file.originFileObj);
      }
    }
  };

  // 是否显示遮罩 / Whether to show the mask
  const shouldShowOverlay = !previewUrl || isHovering || isUploading;

  return (
    <StyledUploadAvatar>
      <Upload
        {...props}
        name="avatar"
        showUploadList={false}
        listType="picture-circle"
        className="avatar-uploader flex! items-center justify-center"
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
      <div className="text-center">
        <Text variant="caption" color="secondary">
          Allowed *.jpeg, *.jpg, *.png, *.gif
          <br />
          max size of {formatBytes(MAX_AVATAR_SIZE)}
        </Text>{' '}
      </div>
    </StyledUploadAvatar>
  );
}
