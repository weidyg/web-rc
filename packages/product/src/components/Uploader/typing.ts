import { ButtonProps, UploadFile, UploadProps } from "antd";
import { ReactNode } from "react";

export type DirKey = string | number;
export type DirType = {
  value: DirKey;
  label: ReactNode;
  children?: DirType[],
};

export type FolderSelectProps = {
  value?: DirKey,
  defaultValue?: DirKey,
  onChange?: (value: DirKey) => void,
  options?: DirType[],
}

export type UploadButtonProps = {
  uploadProps?: Omit<UploadProps, 'children'>,
  buttonProps?: ButtonProps,
}


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
export interface RcFile extends File { uid: string; }
export interface UploadRequestOption<T extends UploadResponseBody = any> {
  onProgress?: (event: UploadProgressEvent) => void;
  onError?: (event: UploadRequestError | ProgressEvent, body?: T) => void;
  onSuccess?: (body: T, xhr?: XMLHttpRequest) => void;
  data?: Record<string, unknown>;
  filename?: string;
  file: Exclude<BeforeUploadFileType, File | boolean> | RcFile;
  withCredentials?: boolean;
  action: string;
  headers?: UploadRequestHeader;
  method: UploadRequestMethod;
  normalize?: { responseBody?: (response: any) => T; }
}

export type UploadResponseBody = {
  url?: string,
  thumbUrl?: string,
  error?: {
    message?: string,
    [key: string]: any
  },
  [key: string]: any
}

export type PicUploaderProps<T extends UploadResponseBody = UploadResponseBody> = {
  prefixCls?: string;
  defaultDirValue: DirKey;
  dirs?: DirType[];
  configRender?: (dom: ReactNode) => ReactNode;
  upload?: {
    buttonProps?: ButtonProps;
    normalize?: { responseBody?: (response: any) => T; }
    customRequest?: (options: UploadRequestOption<T>) => void;
  } & Pick<UploadProps<T>, 'accept' | 'data' | 'headers' | 'method' | 'action'>;
  previewFile?: (file: File | Blob) => PromiseLike<string>;
  fileList?: UploadFile<T>[];
  onChange?: (fileList: UploadFile<T>[]) => void;
};
