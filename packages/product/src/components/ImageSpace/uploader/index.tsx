import React, { ReactNode, useMemo, useState } from 'react';
import { CheckCircleFilled, CloseCircleFilled, LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { Alert, Button, Cascader, Checkbox, Form, InputNumber, Radio, Select, Upload, UploadFile, UploadProps, } from 'antd';
import { classNames, convertByteUnit, useMergedState } from '@web-react/biz-utils';
import { useStyle } from './style';

const FolderSelect = (props: {
    value?: Key,
    defaultValue?: Key,
    onChange?: (value: Key) => void,
    options?: FolderType[],
}) => {
    const { value, defaultValue, onChange, options } = props;
    const [folderId, setFolderId] = useMergedState<Key>('', {
        value: value,
        defaultValue: defaultValue,
        onChange: onChange,
    });
    const [selectKeys, setSelectKeys] = useState<Key[]>([]);
    return <Cascader
        allowClear={false}
        style={{ width: '150px' }}
        changeOnSelect
        options={options}
        value={selectKeys}
        onChange={(value: Key[]) => {
            setSelectKeys(value);
        }}
    />;
}


type Key = string | number;
type FolderType = {
    value: Key;
    label: ReactNode;
    children?: FolderType[],
};
type DisplayPanelType = 'none' | 'uploader' | 'uploadList';
type PicUploaderProps = {
    prefixCls?: string;
    defaultFolderValue: Key;
    folders?: FolderType[];
    display?: DisplayPanelType;
    onDisplayChange?: (display: DisplayPanelType) => void;
    config?: {
        right?: React.ReactNode;
    }
};
const PicUploader: React.FC<PicUploaderProps> = (props) => {
    const { defaultFolderValue, folders, config } = props;
    const { prefixCls, wrapSSR, hashId, token } = useStyle(props?.prefixCls);
    const [displayPanel, setDisplayPanel] = useMergedState<DisplayPanelType>('none', {
        value: props?.display,
        onChange: props?.onDisplayChange,
    });

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [form] = Form.useForm();

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
        data: (file) => {
            return form.getFieldsValue();
        },
        onChange: ({ file, fileList, event }) => {
            setFileList(fileList);
        },
        beforeUpload(file, fileList) {
            setDisplayPanel('uploadList');
        },
    };
    return wrapSSR(
        <div style={{ display: (displayPanel == 'uploader' || displayPanel == 'uploadList') ? 'flex' : 'none' }}
            className={classNames(`${prefixCls}-container`, hashId)}>
            <div className={classNames(`${prefixCls}-body`, hashId)}>
                <div className={classNames(`${prefixCls}-panel`, hashId)}>
                    <div style={{ display: displayPanel == 'uploader' ? 'flex' : 'none' }}
                        className={classNames(`${prefixCls}-panel-form`, hashId)}>
                        <div className={classNames(`${prefixCls}-panel-config`, hashId)}>
                            <Form
                                form={form}
                                layout="inline"
                                initialValues={{
                                    folderId: defaultFolderValue,
                                }}
                                onValuesChange={(changedValues, allValues) => {
                                    const { picWidth, picWidthOption } = changedValues || {};
                                    if (picWidth === false) {
                                        form.setFieldsValue({ picWidthOption: undefined });
                                    }
                                    if (picWidthOption !== -1) {
                                        form.setFieldsValue({ picWidthValue: 0 });
                                    }
                                }}
                            >
                                <Form.Item
                                    label="上传至"
                                    name="folderId"
                                    className={classNames(`${prefixCls}-panel-config-item`, hashId)}
                                >
                                    <FolderSelect options={folders} />
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
                                    {({ getFieldValue }) => getFieldValue('picWidth') && (
                                        <Form.Item name="picWidthOption"
                                            className={classNames(`${prefixCls}-panel-config-item`, hashId)}>
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
                                    )}
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
                            {config?.right}
                        </div>
                        <div style={{ display: 'block !important', width: '100%', height: '100%', margin: 0 }}>
                            <div style={{ width: '100%', height: '95%' }}>
                                <Upload.Dragger
                                    {...uploadProps}
                                    openFileDialogOnClick={false}
                                    className={classNames(`${prefixCls}-panel-board`, hashId)}
                                    style={{ position: 'relative' }}
                                >
                                    <Upload {...uploadProps}>
                                        <Button
                                            type="primary"
                                            icon={<UploadOutlined />}
                                            className={classNames(`${prefixCls}-panel-btn`, hashId)}
                                            style={{ zIndex: 1 }}
                                        >
                                            上传
                                        </Button>
                                    </Upload>
                                    <p className={classNames(`${prefixCls}-panel-tips`, hashId)}>点击按钮或将图片拖拽至此处上传</p>
                                    <p className={classNames(`${prefixCls}-panel-format`, hashId)}>
                                        图片仅支持3MB以内jpg、bmp、gif、heic、png、jpeg、webp格式。
                                    </p>
                                </Upload.Dragger>
                            </div>
                        </div>
                    </div>
                    <div
                        style={{ display: displayPanel == 'uploadList' ? 'flex' : 'none' }}
                        className={classNames(`${prefixCls}-list-container`, hashId)}
                    >
                        <div className={classNames(`${prefixCls}-list`, hashId)}>
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
                            <div className={classNames(`${prefixCls}-list-files`, hashId)}>
                                {fileList.map((file, index) => (
                                    <div key={index} className={classNames(`${prefixCls}-list-item`, hashId)}>
                                        <div className={classNames(`${prefixCls}-list-item-img`, hashId)}>
                                            <img src={file.thumbUrl || file.url} />
                                        </div>
                                        <div className={classNames(`${prefixCls}-list-item-content`, hashId)}>
                                            <div className={classNames(`${prefixCls}-list-item-name`, hashId)}>{file.name}</div>
                                            <div className={classNames(`${prefixCls}-list-item-desc`, hashId)}>
                                                {convertByteUnit(file.size || 0)}
                                            </div>
                                        </div>
                                        <div className={classNames(`${prefixCls}-list-item-state`, hashId)}>
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
                            <div className={classNames(`${prefixCls}-list-actions-wrap`, hashId)}>
                                <div className={classNames(`${prefixCls}-list-actions`, hashId)}>
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
export type { FolderType, DisplayPanelType, PicUploaderProps };
export default PicUploader;
