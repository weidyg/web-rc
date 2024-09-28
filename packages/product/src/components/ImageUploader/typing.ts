import { CSSProperties, ReactNode } from "react";
import { ButtonProps, UploadFile, UploadProps } from "antd";
import { FolderProps } from "@web-react/biz-components";

export interface UploadProgressEvent extends Partial<ProgressEvent> {
  percent?: number;
}
export interface UploadRequestError extends Error {
  status?: number;
  method?: UploadRequestMethod;
  url?: string;
}
export type UploadRequestHeader = Record<string, string>;
export type UploadRequestMethod = 'POST' | 'PUT' | 'PATCH' | 'post' | 'put' | 'patch';
export type BeforeUploadFileType = File | Blob | boolean | string;
export type UploadRequestOption<T extends UploadResponse = UploadResponse> = {
  onProgress?: (event: UploadProgressEvent) => void;
  onError?: (event: UploadRequestError | ProgressEvent, body?: T) => void;
  onSuccess?: (body: T, xhr?: XMLHttpRequest) => void;
  data?: Record<string, unknown>;
  filename?: string;
  file: Exclude<BeforeUploadFileType, File | boolean> | File & { uid: string; };
  withCredentials?: boolean;
  action: string;
  headers?: UploadRequestHeader;
  method: UploadRequestMethod;
} & Pick<CustomUploadProps<T>, 'normalize'>;

export type UploadResponse = {
  url?: string,
  thumbUrl?: string,
  error?: {
    message?: string,
    [key: string]: any
  },
  [key: string]: any
}

export type CustomUploadProps<T extends UploadResponse = UploadResponse> = {
  buttonProps?: Omit<ButtonProps, 'children'>;
  normalize?: { uploadResponse?: (response: any) => T; }
  customRequest?: (options?: UploadRequestOption<T>) => void;
} & Pick<UploadProps<T>, 'accept' | 'data' | 'headers' | 'method' | 'action'
  | 'beforeUpload' | 'fileList' | 'onChange'
>;

export type ImageUploaderProps<T extends UploadResponse = UploadResponse> = {
  className?: string;
  style?: CSSProperties;
  showUploadList?: boolean;
  onShowUploadListChange?: (show: boolean) => void;
  onUploaDone?: (fileList: UploadFile<T>[]) => void;
  upload?: CustomUploadProps<T>;
  folderLoading?: boolean;
  defaultFolder?: FolderProps['defaultValue'];
  folders?: FolderProps['data'];
  configRender?: (dom: ReactNode) => ReactNode;
  previewFile?: UploadProps<T>['previewFile'];
  fileList?: UploadFile<T>[];
  onChange?: (fileList: UploadFile<T>[]) => void;
};