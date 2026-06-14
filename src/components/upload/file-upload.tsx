import { Upload as AntdUpload, type UploadProps } from 'antd';
import UploadListItem, { type UploadListItemProps } from './upload-list-item';
import { StyleFileUpload } from './styles';
import UploadIllustration from './upload-illustration';

const { Dragger } = AntdUpload;

type FileUploadProps = UploadProps & {
  viewMode?: UploadListItemProps['viewMode'];
};

/**
 * 文件上传组件，封装 Ant Design Dragger 并使用自定义文件列表项展示上传结果。
 * @param props - 文件上传配置和文件列表显示模式。
 * @returns 拖拽上传视图。
 *
 * File upload component that wraps Ant Design Dragger and renders uploaded files with a custom list item.
 * @param props - File upload options and file list display mode.
 * @returns Drag-and-drop upload view.
 */
export function FileUpload({ viewMode = 'list', ...props }: FileUploadProps) {
  return (
    <StyleFileUpload $viewModel={viewMode}>
      <Dragger
        itemRender={(_originNode, file, _fileList, actions) => <UploadListItem file={file} actions={actions} viewMode={viewMode} />}
        {...props}>
        <div className="opacity-100 hover:opacity-80">
          <p className="m-auto max-w-[200px]">
            <UploadIllustration />
          </p>
          <div>
            <h5 className="mt-4">Drop or Select file</h5>
            <p className="text-sm text-gray-500">
              Drop files here or click
              <span className="mx-2 text-primary underline">browse</span>
              from your device.
            </p>
          </div>
        </div>
      </Dragger>
    </StyleFileUpload>
  );
}
