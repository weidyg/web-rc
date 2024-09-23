import { CSSProperties, ReactNode } from "react";
import { ButtonProps, UploadFile, UploadProps } from "antd";

export type DirKey = string | number;
export type DirType = {
  value: DirKey;
  label: ReactNode;
  children?: DirType[],
};

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

export type UploaderProps<T extends UploadResponse = UploadResponse> = {
  className?: string;
  style?: CSSProperties;
  
  upload?: CustomUploadProps<T>;
  defaultDirValue: DirKey;
  dirs?: DirType[];
  configRender?: (dom: ReactNode) => ReactNode;
  previewFile?: UploadProps<T>['previewFile'];
  fileList?: UploadFile<T>[];
  onChange?: (fileList: UploadFile<T>[]) => void;
};