import { StyleDropzoneUpload } from './styles';
import type { UploadProps } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { Icon } from '@/components/icon';

/**
 * 拖拽上传组件，用于统一封装 Ant Design Dragger 的基础样式和默认上传图标。
 *
 * @param children 自定义上传区域内容；未传入时展示默认上传图标。
 * @param args 透传给 Ant Design Dragger 的上传配置。
 * @returns 带统一样式的拖拽上传区域。
 *
 * Dropzone upload component that wraps Ant Design Dragger with shared styles
 * and a default upload icon.
 *
 * @param children Custom upload area content; shows the default upload icon when omitted.
 * @param args Upload options passed through to Ant Design Dragger.
 * @returns A dropzone upload area with shared styles.
 */
export function DropzoneUpload({ children, ...args }: UploadProps) {
  return (
    <StyleDropzoneUpload>
      <Dragger showUploadList={false} {...args}>
        <div className="opacity-60 hover:opacity-50">
          {children ?? (
            <div className="mx-auto flex size-16 items-center justify-center">
              <Icon icon="eva:cloud-upload-fill" size={28} />
            </div>
          )}
        </div>
      </Dragger>
    </StyleDropzoneUpload>
  );
}
