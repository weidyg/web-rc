import { CSSProperties, ReactNode, useEffect, useMemo } from 'react';
import { Alert, Progress, Typography, UploadFile, UploadProps } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { classNames, convertByteUnit, previewImage, useForceUpdate } from '@web-react/biz-utils';
import { useStyle } from './style';
import ListItem from './ListItem';

type UploadListProps = {
  style?: CSSProperties;
  fileList?: UploadFile[];
  previewFile?: UploadProps['previewFile'];
  actionsRender?: (dom: ReactNode) => ReactNode;
};
const UploadList = (props: UploadListProps) => {
  const { style, fileList = [], previewFile = previewImage, actionsRender } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyle();

  const forceUpdate = useForceUpdate();
  useEffect(() => {
    if (previewFile) {
      (fileList || []).forEach(async (file) => {
        if (
          file.thumbUrl !== undefined ||
          typeof document === 'undefined' ||
          typeof window === 'undefined' ||
          !(window as any).FileReader ||
          !(window as any).File ||
          !(file.originFileObj instanceof File || (file.originFileObj as any) instanceof Blob)
        ) {
          return;
        }
        file.thumbUrl = await previewFile(file.originFileObj as File);
        forceUpdate();
      });
    }
  }, [fileList, previewFile]);

  const count = useMemo(() => {
    let count = { uploading: 0, success: 0, failed: 0 };
    fileList.forEach((file) => {
      switch (file.status) {
        case 'uploading':
          count.uploading++;
          break;
        case 'done':
          count.success++;
          break;
        case 'error':
          count.failed++;
          break;
      }
    });
    return count;
  }, [fileList]);

  return wrapSSR(
    <div style={{ ...style }} className={classNames(`${prefixCls}`, hashId)}>
      <Alert
        banner
        showIcon
        type={count.uploading > 0 ? 'info' : count.failed > 0 ? 'error' : 'success'}
        icon={count.uploading > 0 ? <LoadingOutlined /> : undefined}
        message={
          count.uploading > 0
            ? `上传中，正在上传 ${count.uploading}/${fileList.length} 个文件`
            : `本次共成功上传 ${count.success} 个文件${
                count.failed > 0 ? `，失败 ${count.failed} 个，请稍后重试` : ''
              }。`
        }
      />
      <div className={classNames(`${prefixCls}-files`, hashId)}>
        {fileList.map((file, index) => (
          <ListItem key={index} {...file} />
        ))}
      </div>
      <div className={classNames(`${prefixCls}-actions-container`, hashId)}>
        <div className={classNames(`${prefixCls}-actions`, hashId)}>{actionsRender?.(<></>)}</div>
      </div>
    </div>,
  );
};

export default UploadList;
