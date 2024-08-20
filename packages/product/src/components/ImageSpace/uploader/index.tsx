import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { CheckCircleFilled, CloseCircleFilled, LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { Alert, Button, ButtonProps, Cascader, Checkbox, Form, InputNumber, message, Radio, Select, Upload, UploadFile, UploadProps, } from 'antd';
import { classNames, convertByteUnit, drawImage, useMergedState } from '@web-react/biz-utils';
import { useStyle } from './style';
import uploadRequest, { UploadRequestOption, UploadResponseBody } from './request';

function findPath(tree?: FolderType[], targetId?: Key) {
    let path: Key[] = [];
    if (!tree || !targetId) { return path; }
    function traverse(node: FolderType, currentPath: Key[]) {
        currentPath.push(node.value);
        if (node.value === targetId) {
            path = [...currentPath];
        } else if (node.children) {
            for (let child of node.children) {
                traverse(child, currentPath);
            }
        }
    }
    for (let child of tree) {
        if (path?.length) break;
        traverse(child, []);
    }
    return path;
}

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
    useEffect(() => {
        const keys = findPath(options, folderId);
        // console.log('keys', keys, folderId);
        setSelectKeys(keys);
    }, [folderId])

    return <Cascader
        allowClear={false}
        style={{ width: '150px' }}
        changeOnSelect
        options={options}
        value={selectKeys}
        onChange={(value: Key[]) => {
            setFolderId(value?.pop() || '');
        }}
    />;
}
const UploadButton = (props: {
    uploadProps: UploadProps,
    buttonProps?: ButtonProps
}) => {
    const { uploadProps, buttonProps = {} } = props;
    const { style, ...rest } = buttonProps;
    return <Upload {...uploadProps}>
        <Button
            type="primary"
            shape='round'
            icon={<UploadOutlined />}
            style={{ height: '48px', padding: '0 18px', zIndex: 1, ...style }}
            {...rest}
        >
            点击上传
        </Button>
    </Upload>
}

type Key = string | number;
type FolderType = {
    value: Key;
    label: ReactNode;
    children?: FolderType[],
};
type DisplayPanelType = 'none' | 'uploader' | 'uploadList';
type ConfigFormValueType = { folderId: string, picWidth: boolean, picWidthOption: number, picWidthValue: number, originSize: boolean };


type PicUploaderProps<T extends UploadResponseBody = UploadResponseBody> = {
    prefixCls?: string;
    defaultFolderValue: Key;
    folders?: FolderType[];
    display?: DisplayPanelType;
    onDisplayChange?: (display: DisplayPanelType) => void;
    config?: {
        right?: React.ReactNode;
    }
    upload?: {
        buttonProps?: ButtonProps;
        normalize?: { responseBody: (response: any) => T; }
        customRequest?: (options: UploadRequestOption<T>) => void;
    } & Pick<UploadProps<T>, 'accept' | 'data' | 'headers' | 'method' | 'action'>;
    fileList?: UploadFile<T>[];
    onChange?: (fileList: UploadFile<T>[]) => void;
};

const InternalPicUploader = <
    UploadResponseBodyType extends UploadResponseBody = UploadResponseBody,
>(
    props: PicUploaderProps<UploadResponseBodyType>,
) => {
    const { defaultFolderValue, folders, config, upload = {} } = props;
    const {
        data: uploadData, normalize, customRequest,
        accept = 'image/jpeg,image/bmp,image/gif,.heic,image/png,.webp',
        buttonProps, ...restUpload
    } = upload;
    const { prefixCls, wrapSSR, hashId, token } = useStyle(props?.prefixCls);
    const [displayPanel, setDisplayPanel] = useMergedState<DisplayPanelType>('uploader', {
        value: props?.display,
        onChange: props?.onDisplayChange,
    });
    const [form] = Form.useForm<ConfigFormValueType>();
    const [fileList, setFileList] = useMergedState<UploadFile<UploadResponseBodyType>[]>([], {
        value: props?.fileList,
        onChange: (value) => props?.onChange?.(value),
    });

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

    const imageFormat = useMemo(() => {
        return accept?.replace(/[A-Za-z]*\/|[A-Za-z]*\./g, '');
    }, [accept]);

    const checkFile = (file: UploadFile, accept: string) => {
        const types = accept.split(',') || [];
        return types.includes(file.type!) || types.some(type => file?.name?.lastIndexOf(type) > -1);
    }

    const uploadProps: UploadProps<UploadResponseBodyType> = {
        ...restUpload,
        accept: accept,
        data: async (file) => {
            const data = typeof uploadData == "function"
                ? await uploadData(file)
                : uploadData;
            const folderId = form.getFieldValue('folderId');
            return { folderId, ...data, }
        },
        multiple: true,
        showUploadList: false,
        fileList: fileList,
        onChange: ({ file, fileList, event }) => {
            console.log("onChange", { file, fileList, event });
            setFileList(fileList);
        },
        customRequest: (option) => {
            const _option = { ...option, normalize }
            return customRequest?.(_option) || uploadRequest(_option);
        },
        beforeUpload(file, fileList) {
            // console.log("beforeUpload", { file, fileList });
            if (!checkFile(file, accept)) {
                message.error(`亲, 请选择 ${imageFormat} 格式文件`);
                return Upload.LIST_IGNORE;
            }
            setDisplayPanel('uploadList');
            const config = form.getFieldsValue();
            if (config.picWidth) {
                const width = config.picWidthOption == -1 ? config.picWidthValue : config.picWidthOption;
                if (width > 0) { return drawImage(file, { width }, true); }
            }
            return file;
        },
    };
    
    function handleUpload(): void {
        setDisplayPanel('uploader');
        setFileList(fileList => fileList.filter(file => file.status == 'uploading'));
    }

    return wrapSSR(
        <div style={{ display: (displayPanel == 'uploader' || displayPanel == 'uploadList') ? 'flex' : 'none' }}
            className={classNames(`${prefixCls}-container`, hashId)}>
            <div className={classNames(`${prefixCls}-body`, hashId)}>
                <div className={classNames(`${prefixCls}-panel`, hashId)}>
                    <div style={{ display: displayPanel == 'uploader' ? 'flex' : 'none' }}
                        className={classNames(`${prefixCls}-panel-header`, hashId)}>
                        <div className={classNames(`${prefixCls}-panel-config`, hashId)}>
                            <Form<ConfigFormValueType>
                                form={form}
                                layout="inline"
                                initialValues={{
                                    folderId: defaultFolderValue,
                                    originSize: true,
                                }}
                                onValuesChange={(changedValues, allValues) => {
                                    const { picWidth, picWidthOption } = changedValues || {};
                                    if (picWidth === false) {
                                        form.setFieldsValue({ picWidthOption: undefined });
                                    } else if (!picWidthOption) {
                                        form.setFieldsValue({ picWidthOption: 620 });
                                    }
                                    if (picWidthOption !== -1) {
                                        form.setFieldsValue({ picWidthValue: 0 });
                                    }
                                }}
                            >
                                <Form.Item<ConfigFormValueType> label="上传至" name="folderId"  >
                                    <FolderSelect options={folders} />
                                </Form.Item>
                                <Form.Item noStyle dependencies={['picWidth']}>
                                    {({ getFieldValue }) => (
                                        <Form.Item<ConfigFormValueType> name="picWidth" valuePropName={'checked'}
                                            style={{ marginRight: getFieldValue('picWidth') ? 0 : undefined }}>
                                            <Checkbox>
                                                <span style={{ fontSize: '12px' }}>图片宽度调整</span>
                                            </Checkbox>
                                        </Form.Item>
                                    )}
                                </Form.Item>
                                <Form.Item noStyle dependencies={['picWidth']}>
                                    {({ getFieldValue }) => getFieldValue('picWidth') && (
                                        <Form.Item<ConfigFormValueType> name="picWidthOption">
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
                                    {({ getFieldValue }) => getFieldValue('picWidthOption') === -1 && (
                                        <Form.Item<ConfigFormValueType> name="picWidthValue">
                                            <InputNumber min={0} max={10000} suffix="px" />
                                        </Form.Item>
                                    )}
                                </Form.Item>
                                <Form.Item<ConfigFormValueType> name="originSize">
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
                                    <UploadButton uploadProps={uploadProps} buttonProps={buttonProps} />
                                    <p className={classNames(`${prefixCls}-panel-tips`, hashId)}>点击按钮或将图片拖拽至此处上传</p>
                                    <p className={classNames(`${prefixCls}-panel-format`, hashId)}>
                                        图片仅支持3MB以内{imageFormat}格式。
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
                                {fileList.map((file, index) => {
                                    // const windowURL = window.URL || window.webkitURL;
                                    return (<div key={index} className={classNames(`${prefixCls}-list-item`, hashId)}>
                                        <div className={classNames(`${prefixCls}-list-item-img`, hashId)}>
                                            <img src={file.thumbUrl || file.url} />
                                            {/* <img src={windowURL.createObjectURL(file.originFileObj!)} /> */}
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
                                                    {file?.error?.message || '上传失败'}
                                                    {/* 上传失败&nbsp;&nbsp;网络错误，请尝试禁止浏览器插件或者换浏览器或者换电脑重试 */}
                                                </>) : (
                                                    <></>
                                                )}
                                            </div>
                                        </div>
                                    </div>)
                                })}
                            </div>
                            <div className={classNames(`${prefixCls}-list-actions-wrap`, hashId)}>
                                <div className={classNames(`${prefixCls}-list-actions`, hashId)}>
                                    <Button type="text" onClick={handleUpload}>
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

type InternalPicUploaderType = typeof InternalPicUploader;
type CompoundedComponent<T = UploadResponseBody> = InternalPicUploaderType & {
    <U extends T>(props: UploadProps<U>,): React.ReactElement;
};
const PicUploader = InternalPicUploader as CompoundedComponent;
export type { UploadResponseBody, FolderType, DisplayPanelType, PicUploaderProps };
export default PicUploader;
