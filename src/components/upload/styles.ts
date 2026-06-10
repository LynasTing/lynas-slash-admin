import styled from 'styled-components';
import type { UploadListItemProps } from './upload-list-item';

export const StyledAvatarUpload = styled.div`
  transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  .ant-upload,
  .ant-upload-select {
    border: none !important;
  }
`;

export const StyleDropzoneUpload = styled.div`
  .ant-upload {
    border: none !important;
  }
  .ant-upload-list {
    display: none;
  }
`;

export const StyleFileUpload = styled.div<{ $viewModel: UploadListItemProps['viewMode'] }>`
  .ant-upload {
    border: none !important;
  }
  .ant-upload-list {
    display: ${({ $viewModel }) => ($viewModel === 'thumbnail' ? 'flex' : 'block')};
    flex-wrap: wrap;
  }
`;
