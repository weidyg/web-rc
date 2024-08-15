import React, { useMemo, useState } from 'react';
import { CheckCircleFilled, CloseCircleFilled, LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { Alert, Button, Cascader, Checkbox, Form, InputNumber, Radio, Select, Upload, UploadFile, UploadProps, } from 'antd';
import { classNames, convertByteUnit, useMergedState } from '@web-react/biz-utils';
import { useStyle } from './style';

type FolderType = {
    value: string | number;
    label: React.ReactNode;
    children?: FolderType[],
};
type DisplayPanelType = 'none' | 'uploader' | 'uploadList';
type UploaderProps = {
    prefixCls?: string;
    folders?: FolderType[];
    display?: DisplayPanelType;
    onDisplayChange?: (display: DisplayPanelType) => void;

};
const Uploader: React.FC<UploaderProps> = (props) => {
    const { folders } = props;
    const { prefixCls, wrapSSR, hashId, token } = useStyle(props?.prefixCls);
    const [displayPanel, setDisplayPanel] = useMergedState<DisplayPanelType>('none', {
        value: props?.display,
        onChange: props?.onDisplayChange,
    });

    const [fileList, setFileList] = useState<UploadFile[]>([]);
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

    const uploadProps: UploadProps = {
        name: 'file',
        multiple: true,
        showUploadList: false,
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        accept: 'image/jpeg,image/bmp,image/gif,.heic,image/png,.webp',
        fileList: fileList,
        onChange: ({ file, fileList, event }) => {
            console.log('onChange', file, fileList);
            setFileList(fileList);
        },
        beforeUpload(file, fileList) {
            console.log('beforeUpload', file, fileList);
            setDisplayPanel('uploadList');
        },
    };

    const ConfigForm = () => {
        const [form] = Form.useForm();
        return <Form
            form={form}
            layout="inline"
            onValuesChange={(changedValues, allValues) => {
                const { picWidth, picWidthOption } = changedValues || {};
                if (picWidth === false) {
                    form.setFieldsValue({ picWidthOption: undefined });
                }
                if (picWidthOption !== -1) {
                    form.setFieldsValue({ picWidthValue: 0 });
                }
                console.log(changedValues, allValues);
            }}
        >
            <Form.Item
                label="上传至"
                name="folderId"
                className={classNames(`${prefixCls}-panel-config-item`, hashId)}
            >
                <Cascader
                    allowClear={false}
                    changeOnSelect
                    style={{ width: '150px' }}
                    options={folders}
                />
            </Form.Item>
            <Form.Item
                name="picWidth"
                style={{ marginRight: '3px' }}
                valuePropName={'checked'}
                className={classNames(`${prefixCls}-panel-config-item`, hashId)}
            >
                <Checkbox>
                    <span style={{ fontSize: '12px' }}>图片宽度调整</span>
                </Checkbox>
            </Form.Item>
            <Form.Item noStyle dependencies={['picWidth']}>
                {({ getFieldValue }) =>
                    getFieldValue('picWidth') && (
                        <Form.Item name="picWidthOption" className={classNames(`${prefixCls}-panel-config-item`, hashId)}>
                            <Select
                                style={{ width: '140px' }}
                                options={[
                                    { label: '手机图片(620px)', value: 620 },
                                    { label: '800px', value: 800 },
                                    { label: '640px', value: 640 },
                                    { label: '自定义', value: -1 },
                                ]}
                            />
                        </Form.Item>
                    )
                }
            </Form.Item>
            <Form.Item noStyle dependencies={['picWidth', 'picWidthOption']}>
                {({ getFieldValue }) =>
                    getFieldValue('picWidthOption') === -1 && (
                        <Form.Item name="picWidthValue" className={classNames(`${prefixCls}-panel-config-item`, hashId)}>
                            <InputNumber min={0} max={10000} suffix="px" />
                        </Form.Item>
                    )
                }
            </Form.Item>
            <Form.Item
                name="originSize"
                style={{ marginRight: '3px' }}
                className={classNames(`${prefixCls}-panel-config-item`, hashId)}
            >
                <Radio.Group
                    options={[
                        { label: <span style={{ fontSize: '12px' }}>原图上传</span>, value: true },
                        { label: <span style={{ fontSize: '12px' }}>图片无损压缩上传</span>, value: false },
                    ]}
                />
            </Form.Item>
        </Form>
    }

    return wrapSSR(
        <div style={{ display: (displayPanel == 'uploader' || displayPanel == 'uploadList') ? 'flex' : 'none' }}
            className={classNames(`${prefixCls}-uploader-container`, hashId)}>
            <div className={classNames(`${prefixCls}-uploader-body`, hashId)}>
                <div className={classNames(`${prefixCls}-uploader-panel`, hashId)}>
                    <div
                        style={{ display: displayPanel == 'uploader' ? 'flex' : 'none' }}
                        className={classNames(`${prefixCls}-uploader-panel-form`, hashId)}
                    >
                        <div className={classNames(`${prefixCls}-uploader-panel-config`, hashId)}>
                            <ConfigForm />
                            <Button style={{ marginLeft: 'auto' }}
                                onClick={() => { setDisplayPanel('none') }}
                            >
                                取消上传
                            </Button>
                        </div>
                        <div style={{ display: 'block !important', width: '100%', height: '100%', margin: 0 }}>
                            <div style={{ width: '100%', height: '95%' }}>
                                <Upload.Dragger
                                    {...uploadProps}
                                    openFileDialogOnClick={false}
                                    className={classNames(`${prefixCls}-uploader-panel-board`, hashId)}
                                    style={{ position: 'relative' }}
                                >
                                    <Upload {...uploadProps}>
                                        <Button
                                            type="primary"
                                            icon={<UploadOutlined />}
                                            className={classNames(`${prefixCls}-uploader-panel-btn`, hashId)}
                                            style={{ zIndex: 1 }}
                                        >
                                            上传
                                        </Button>
                                    </Upload>
                                    <p className={classNames(`${prefixCls}-uploader-panel-tips`, hashId)}>点击按钮或将图片拖拽至此处上传</p>
                                    <p className={classNames(`${prefixCls}-uploader-panel-format`, hashId)}>
                                        图片仅支持3MB以内jpg、bmp、gif、heic、png、jpeg、webp格式。
                                    </p>
                                </Upload.Dragger>
                            </div>
                        </div>
                    </div>
                    <div
                        style={{ display: displayPanel == 'uploadList' ? 'flex' : 'none' }}
                        className={classNames(`${prefixCls}-uploader-list-container`, hashId)}
                    >
                        <div className={classNames(`${prefixCls}-uploader-list`, hashId)}>
                            <Alert
                                banner
                                showIcon
                                type={count.uploading > 0 ? 'info' : count.failed > 0 ? 'error' : 'success'}
                                icon={count.uploading > 0 ? <LoadingOutlined /> : undefined}
                                message={
                                    count.uploading > 0
                                        ? `上传中，正在上传 ${fileList.length} 个文件`
                                        : `有 ${count.failed} 个上传失败，本次共成功上传 ${count.success} 个文件，请稍后重试。`
                                }
                            />
                            <div className={classNames(`${prefixCls}-uploader-list-files`, hashId)}>
                                {fileList.map((file, index) => (
                                    <div key={index} className={classNames(`${prefixCls}-uploader-list-item`, hashId)}>
                                        <div className={classNames(`${prefixCls}-uploader-list-item-img`, hashId)}>
                                            <img src={file.thumbUrl || file.url} />
                                        </div>
                                        <div className={classNames(`${prefixCls}-uploader-list-item-content`, hashId)}>
                                            <div className={classNames(`${prefixCls}-uploader-list-item-name`, hashId)}>{file.name}</div>
                                            <div className={classNames(`${prefixCls}-uploader-list-item-desc`, hashId)}>
                                                {convertByteUnit(file.size || 0)}
                                            </div>
                                        </div>
                                        <div className={classNames(`${prefixCls}-uploader-list-item-state`, hashId)}>
                                            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {file.status === 'uploading' ? (<>
                                                    <LoadingOutlined style={{ color: token.colorPrimary, marginRight: '10px' }} />
                                                    {`上传中 ${file.percent?.toFixed(2)}%`}
                                                </>) : file.status === 'done' ? (<>
                                                    <CheckCircleFilled style={{ color: token.colorSuccess, marginRight: '10px' }} />
                                                    上传成功
                                                </>) : file.status === 'error' ? (<>
                                                    <CloseCircleFilled style={{ color: token.colorError, marginRight: '10px' }} />
                                                    上传失败&nbsp;&nbsp;网络错误，请尝试禁止浏览器插件或者换浏览器或者换电脑重试
                                                </>) : (
                                                    <></>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={classNames(`${prefixCls}-uploader-list-actions-wrap`, hashId)}>
                                <div className={classNames(`${prefixCls}-uploader-list-actions`, hashId)}>
                                    <Button type="text" onClick={() => { setDisplayPanel('uploader') }}>
                                        继续上传
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export type { FolderType, DisplayPanelType, UploaderProps };
export default Uploader;
