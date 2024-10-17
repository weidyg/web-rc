import { CSSProperties, ReactNode, useMemo } from 'react';
import { Button, message, Upload, UploadFile, UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { classNames } from '@web-react/biz-utils';
import { UploadResponse, CustomUploadProps } from '../typing';
import { useStyles } from './style';
import uploadRequest from '../_utils/request';

const fillRespUrl = <T extends UploadResponse>(file: UploadFile<T>) => {
  if (file?.response?.url) {
    file.url = file.response.url;
  }
  if (file?.response?.thumbUrl) {
    file.thumbUrl = file.response.thumbUrl;
  }
  return file;
};

type UploadDraggerProps<T extends UploadResponse = UploadResponse> = {
  style?: CSSProperties;
  configRender?: () => ReactNode;
} & CustomUploadProps<T>;

const InternalDraggerUpload = <T extends UploadResponse = UploadResponse>(props: UploadDraggerProps<T>) => {
  const {
    buttonProps,
    style,
    normalize,
    configRender,
    data: uploadData,
    customRequest,
    beforeUpload,
    accept = 'image/jpeg,image/bmp,image/gif,.heic,image/png,.webp',
    fileList,
    onChange,
    ...restUploadProps
  } = props;

  const { prefixCls, wrapSSR, hashId, token } = useStyles();

  const checkFile = (file: UploadFile, accept: string) => {
    const types = accept.split(',') || [];
    return types.includes(file.type!) || types.some((type) => file?.name?.lastIndexOf(type) > -1);
  };
  const uploadProps: UploadProps = {
    ...restUploadProps,
    accept: accept,
    data: async (file) => {
      const data = typeof uploadData == 'function' ? await uploadData(file) : uploadData;
      return { ...data };
    },
    multiple: true,
    showUploadList: false,
    fileList: fileList,
    onChange: (info) => {
      const newFile = fillRespUrl(info?.file);
      const newFileList = info?.fileList.map((file) => fillRespUrl(file));
      onChange?.({
        file: newFile,
        fileList: newFileList,
        event: info?.event,
      });
      // console.log('InternalDraggerUpload', newFile, newFileList);
    },
    customRequest: (options) => {
      const _option = { normalize, ...options };
      return customRequest?.(_option) || uploadRequest?.(_option);
    },
    beforeUpload(file, fileList) {
      if (!checkFile(file, accept)) {
        message.error(`亲, 请选择 ${imageFormat} 格式文件`);
        return Upload.LIST_IGNORE;
      }
      return beforeUpload?.(file, fileList);
    },
  };

  const imageFormat = useMemo(() => {
    return accept?.replace(/[A-Za-z]*\/|[A-Za-z]*\./g, '');
  }, [accept]);
  return wrapSSR(
    <div style={{ ...style }} className={classNames(`${prefixCls}`, hashId)}>
      <div className={classNames(`${prefixCls}-config`, hashId)}>{configRender?.()}</div>
      <Upload.Dragger
        {...uploadProps}
        openFileDialogOnClick={false}
        className={classNames(`${prefixCls}-board`, hashId)}
      >
        <Upload {...uploadProps}>
          <Button
            type="primary"
            shape="round"
            icon={<UploadOutlined />}
            style={{ height: '48px', padding: '0 18px', zIndex: 1, ...style }}
            {...buttonProps}
          >
            点击上传
          </Button>
        </Upload>
        <p className={classNames(`${prefixCls}-board-tips`, hashId)}>点击按钮或将图片拖拽至此处上传</p>
        <p className={classNames(`${prefixCls}-board-format`, hashId)}>图片仅支持3MB以内{imageFormat}格式。</p>
      </Upload.Dragger>
    </div>,
  );
};

export default InternalDraggerUpload;
