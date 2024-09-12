
import { CSSProperties, ReactNode, useEffect, useMemo } from 'react';
import { Alert, UploadFile, UploadProps } from 'antd';
import { CheckCircleFilled, CloseCircleFilled, FileTwoTone, LoadingOutlined, PaperClipOutlined, PictureTwoTone } from '@ant-design/icons';
import { classNames, convertByteUnit, previewImage, useForceUpdate } from '@web-react/biz-utils';
import { useStyle } from "./style";

type UploadListProps = {
    style?: CSSProperties,
    fileList?: UploadFile[];
    previewFile?: UploadProps['previewFile'];
    actionsRender?: (dom: ReactNode) => ReactNode;
}
const UploadList = (props: UploadListProps) => {
    const { style, fileList = [], previewFile = previewImage, actionsRender } = props;
    const { prefixCls, wrapSSR, hashId, token } = useStyle();

    const forceUpdate = useForceUpdate();
    useEffect(() => {
        (fileList || []).forEach((file) => {
            if (
                typeof document === 'undefined' ||
                typeof window === 'undefined' ||
                !(window as any).FileReader ||
                !(window as any).File ||
                !(file.originFileObj instanceof File || (file.originFileObj as any) instanceof Blob) ||
                file.thumbUrl !== undefined
            ) {
                return;
            }
            file.thumbUrl = '';
            if (previewFile) {
                previewFile(file.originFileObj as File)
                    .then((previewDataUrl: string) => {
                        file.thumbUrl = previewDataUrl || '';
                        forceUpdate();
                    });
            }
        });
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
                message={count.uploading > 0
                    ? `上传中，正在上传 ${count.uploading}/${fileList.length} 个文件`
                    : `本次共成功上传 ${count.success} 个文件${(count.failed > 0 ? `，失败 ${count.failed} 个，请稍后重试` : '')}。`
                }
            />
            <div className={classNames(`${prefixCls}-files`, hashId)}>
                {fileList.map((file, index) => {
                    return (<div key={index} className={classNames(`${prefixCls}-item`, hashId)}>
                        <div className={classNames(`${prefixCls}-item-img`, hashId)}>
                            <img src={file.thumbUrl || file.url}
                                alt={file.name}
                                className={`${prefixCls}-list-item-image`}
                                crossOrigin={file.crossOrigin}
                            />
                        </div>
                        <div className={classNames(`${prefixCls}-item-content`, hashId)}>
                            <div className={classNames(`${prefixCls}-item-name`, hashId)}>{file.name}</div>
                            <div className={classNames(`${prefixCls}-item-desc`, hashId)}>
                                {convertByteUnit(file.size || 0)}
                            </div>
                        </div>
                        <div className={classNames(`${prefixCls}-item-state`, hashId)}>
                            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {file.status === 'uploading' ? (<>
                                    <LoadingOutlined style={{ color: token.colorPrimary, marginRight: '10px' }} />
                                    {`上传中 ${file.percent?.toFixed(2)}%`}
                                </>) : file.status === 'done' ? (<>
                                    <CheckCircleFilled style={{ color: token.colorSuccess, marginRight: '10px' }} />
                                    上传成功
                                </>) : file.status === 'error' ? (<>
                                    <CloseCircleFilled style={{ color: token.colorError, marginRight: '10px' }} />
                                    <span dangerouslySetInnerHTML={{ __html: file?.error?.message || '上传失败' }} />
                                </>) : (<>
                                </>)}
                            </div>
                        </div>
                    </div>)
                })}
            </div>
            <div className={classNames(`${prefixCls}-actions-wrap`, hashId)}>
                <div className={classNames(`${prefixCls}-actions`, hashId)}>
                    {actionsRender?.(<></>)}
                </div>
            </div>
        </div>
    )
};

export default UploadList;