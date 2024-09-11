import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Button, Cascader, Checkbox, Form, InputNumber, message, Radio, Select, Upload, UploadFile, UploadProps, } from 'antd';
import { CheckCircleFilled, CloseCircleFilled, LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { classNames, convertByteUnit, drawImage, previewImage, useMergedState } from '@web-react/biz-utils';
import uploadRequest from './_utils/request';
import { DirKey, FolderSelectProps, PicUploaderProps, UploadButtonProps, UploadResponseBody } from './typing';
import { findPath } from './_utils';
import { useStyle } from './style';

const FolderSelect = (props: FolderSelectProps) => {
    const { value, defaultValue, onChange, options } = props;
    const [folderId, setFolderId] = useMergedState<DirKey>('', {
        value: value,
        defaultValue: defaultValue,
        onChange: onChange,
    });
    const [selectKeys, setSelectKeys] = useState<DirKey[]>([]);
    useEffect(() => {
        const keys = findPath(options, folderId);
        setSelectKeys(keys);
    }, [folderId])

    return <Cascader
        allowClear={false}
        style={{ width: '150px' }}
        changeOnSelect
        options={options}
        value={selectKeys}
        onChange={(value: DirKey[]) => {
            setFolderId(value?.pop() || '');
        }}
    />;
}
const UploadButton = (props: UploadButtonProps) => {
    const { uploadProps, buttonProps } = props;
    const { children: btnText = '点击上传', style, ...rest } = buttonProps || {};
    return <Upload {...uploadProps}>
        <Button
            type="primary"
            shape='round'
            icon={<UploadOutlined />}
            style={{ height: '48px', padding: '0 18px', zIndex: 1, ...style }}
            {...rest}
        >
            {btnText}
        </Button>
    </Upload>
}


type ConfigFormValueType = {
    folderId: string,
    picWidth: boolean,
    picWidthOption: number,
    picWidthValue: number,
    originSize: boolean
};

const InternalUploader = <
    UploadResponseBodyType extends UploadResponseBody = UploadResponseBody,
>(
    props: PicUploaderProps<UploadResponseBodyType>,
) => {
    const { defaultDirValue, dirs, configRender, previewFile = previewImage, upload = {} } = props;
    const {
        data: uploadData, normalize, customRequest,
        accept = 'image/jpeg,image/bmp,image/gif,.heic,image/png,.webp',
        buttonProps, ...restUpload
    } = upload;
    const { prefixCls, wrapSSR, hashId, token } = useStyle(props?.prefixCls);
    const [form] = Form.useForm<ConfigFormValueType>();

    const [showUploadList, setShowUploadList] = useState(false);
    const [fileList, setFileList] = useMergedState<UploadFile<UploadResponseBodyType>[]>([], {
        value: props?.fileList,
        onChange: (value) => props?.onChange?.(value),
    });

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
                        // forceUpdate();
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
            let success = true;
            let newFileList = [...fileList];
            newFileList = newFileList.map((file) => {
                if (file.response) {
                    file.url = file.response.url;
                }
                if (file.status != 'done') {
                    success = false;
                }
                return file;
            });
            setFileList(newFileList);
            if (success) {
                setTimeout(() => {
                    setShowUploadList(false);
                }, 1000);
            }
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
            setShowUploadList(true);
            const config = form.getFieldsValue();
            if (config.picWidth) {
                const width = config.picWidthOption == -1 ? config.picWidthValue : config.picWidthOption;
                if (width > 0) {

                    return drawImage(file, { width }, true);
                }
            }
            return file;
        },
    };

    function handleUpload(): void {
        setShowUploadList(false);
        setFileList(fileList => fileList.filter(file => file.status == 'uploading'));
    }

    const defaultConfigDom = <>
        <Form<ConfigFormValueType>
            form={form}
            layout="inline"
            initialValues={{
                folderId: defaultDirValue,
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
            <Form.Item label="上传至" name="folderId">
                <FolderSelect options={dirs} />
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
            {/* <Form.Item<ConfigFormValueType> name="originSize">
            <Radio.Group
                options={[
                    { label: <span style={{ fontSize: '12px' }}>原图上传</span>, value: true },
                    { label: <span style={{ fontSize: '12px' }}>图片无损压缩上传</span>, value: false },
                ]}
            />
        </Form.Item> */}
        </Form>
    </>;
    return wrapSSR(
        <div className={classNames(prefixCls, hashId)}>
            <div className={classNames(`${prefixCls}-body`, hashId)}>
                <div style={{ display: !showUploadList ? 'flex' : 'none', }}
                    className={classNames(`${prefixCls}-panel`, hashId)}>
                    <div className={classNames(`${prefixCls}-panel-config`, hashId)}>
                        {configRender?.(defaultConfigDom) || defaultConfigDom}
                    </div>
                    <Upload.Dragger
                        {...uploadProps}
                        openFileDialogOnClick={false}
                        className={classNames(`${prefixCls}-panel-board`, hashId)}
                    // style={{ position: 'relative' }}
                    >
                        <UploadButton uploadProps={uploadProps} buttonProps={buttonProps} />
                        <p className={classNames(`${prefixCls}-panel-board-tips`, hashId)}>
                            点击按钮或将图片拖拽至此处上传
                        </p>
                        <p className={classNames(`${prefixCls}-panel-board-format`, hashId)}>
                            图片仅支持3MB以内{imageFormat}格式。
                        </p>
                    </Upload.Dragger>
                </div>

                <div style={{ display: showUploadList ? 'flex' : 'none', }}
                    className={classNames(`${prefixCls}-list`, hashId)}>
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
                    <div className={classNames(`${prefixCls}-list-files`, hashId)}>
                        {fileList.map((file, index) => {
                            return (<div key={index} className={classNames(`${prefixCls}-list-item`, hashId)}>
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
                                            <span dangerouslySetInnerHTML={{ __html: file?.error?.message || '上传失败' }} />
                                        </>) : (<>
                                        </>)}
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
    )
};

type CompoundedComponent<T = UploadResponseBody> = typeof InternalUploader & {
    <U extends T>(props: UploadProps<U>,): React.ReactElement;
};
const Uploader = InternalUploader as CompoundedComponent;
export default Uploader;
