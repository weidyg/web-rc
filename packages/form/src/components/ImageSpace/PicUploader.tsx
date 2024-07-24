
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { CheckCircleFilled, CloseCircleFilled, LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { Alert, Button, Cascader, Checkbox, Form, Image, InputNumber, Radio, Select, Upload, UploadFile, UploadProps } from 'antd';
import { updateFileList, previewImage } from 'antd/es/upload/utils';
import useForceUpdate from 'antd/es/_util/hooks/useForceUpdate';
import { useStyle } from './style';
import dataJson from './data.json';
import { convertByteUnit } from '@web-react/biz-utils';

type PicUploaderProps = {
    prefixCls?: string;
};
const PicUploader: React.FC<PicUploaderProps> = (props) => {
    const { } = props;
    const { prefixCls: componentCls, wrapSSR, hashId, token } = useStyle(props?.prefixCls);
    const prefixCls = `${componentCls}-picUploader`;
    const [form] = Form.useForm();
    const [uploading, setUploading] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);


    const uploadProps: UploadProps = {
        name: 'file',
        multiple: true,
        showUploadList: false,
        action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
        accept: 'image/jpeg,image/bmp,image/gif,.heic,image/png,.webp',
        fileList: fileList,
        onChange: ({ file, event }) => {
            console.log('upload Change', file, fileList, event);
            if (file.status === 'done') {
                // setUploading(false);
            }
            setFileList(updateFileList(file, fileList));
            setUploading(true);
        },
        beforeUpload: (file, fileList) => {
            // return resizeImgSize(file, { width: 100 });
        },
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        // customRequest: ({ file, onProgress, onSuccess, onError }) => {

        // }
    };

    // type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
    // const handleUpload = () => {
    //     const formData = new FormData();
    //     fileList.forEach((file) => {
    //         formData.append('files[]', file as FileType);
    //     });
    //     setUploading(true);
    //     // You can use any AJAX library you like
    //     fetch('https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload', {
    //         method: 'POST',
    //         body: formData,
    //     })
    //         .then((res) => res.json())
    //         .then(() => {
    //             setFileList([]);
    //             message.success('upload successfully.');
    //         })
    //         .catch(() => {
    //             message.error('upload failed.');
    //         })
    //         .finally(() => {
    //             setUploading(false);
    //         });
    // };



    function getOptions(list: any[]): any[] {
        return list.map(m => {
            return {
                value: m.id,
                label: m.name,
                children: m.children && getOptions(m.children)
            }
        })
    }
    const cascaderOptions = getOptions([
        { ...dataJson.dirs, children: [] },
        ...dataJson.dirs.children,
    ])

    return wrapSSR(
        <div className={classNames(`${prefixCls}-container`, hashId)}>
            <div className={classNames(`${prefixCls}-body`, hashId)}>
                <div className={classNames(`${prefixCls}-panel`, hashId)}>
                    <Form form={form} layout='inline'
                        style={{ display: uploading ? 'none' : 'flex' }}
                        className={classNames(`${prefixCls}-panel-form`, hashId)}
                        onValuesChange={(changedValues, allValues) => {
                            const { picWidth, picWidthOption } = changedValues || {};
                            if (picWidth === false) { form.setFieldsValue({ picWidthOption: undefined }); }
                            if (picWidthOption !== -1) { form.setFieldsValue({ picWidthValue: 0 }); }
                            console.log(changedValues, allValues);
                        }}>
                        <div className={classNames(`${prefixCls}-panel-config`, hashId)}>
                            <Form.Item label='上传至' name='folderId'
                                className={classNames(`${prefixCls}-panel-config-item`, hashId)}
                            >
                                <Cascader
                                    changeOnSelect
                                    style={{ width: '150px' }}
                                    options={cascaderOptions}
                                />
                            </Form.Item>
                            <Form.Item name='picWidth'
                                style={{ marginRight: '3px', }}
                                valuePropName={'checked'}
                                className={classNames(`${prefixCls}-panel-config-item`, hashId)}
                            >
                                <Checkbox>
                                    <span style={{ fontSize: '12px' }}>图片宽度调整</span>
                                </Checkbox>
                            </Form.Item>
                            <Form.Item noStyle dependencies={['picWidth']}>
                                {({ getFieldValue }) => (getFieldValue('picWidth') && (
                                    <Form.Item name='picWidthOption'
                                        className={classNames(`${prefixCls}-panel-config-item`, hashId)}>
                                        <Select
                                            style={{ width: '140px' }}
                                            options={[
                                                { label: '手机图片(620px)', value: 620 },
                                                { label: '800px', value: 800 },
                                                { label: '640px', value: 640 },
                                                { label: '自定义', value: -1 },
                                            ]} />
                                    </Form.Item>
                                ))}
                            </Form.Item>
                            <Form.Item noStyle dependencies={['picWidth', 'picWidthOption']}>
                                {({ getFieldValue }) => (getFieldValue('picWidthOption') === -1 && (
                                    <Form.Item name='picWidthValue'
                                        className={classNames(`${prefixCls}-panel-config-item`, hashId)}>
                                        <InputNumber min={0} max={10000} suffix='px' />
                                    </Form.Item>
                                ))}
                            </Form.Item>
                            <Form.Item name='originSize'
                                style={{ marginRight: '3px', }}
                                className={classNames(`${prefixCls}-panel-config-item`, hashId)}
                            >
                                <Radio.Group
                                    options={[
                                        { label: <span style={{ fontSize: '12px' }}>原图上传</span>, value: true },
                                        { label: <span style={{ fontSize: '12px' }}>图片无损压缩上传</span>, value: false },
                                    ]} />
                            </Form.Item>
                            <Button style={{ marginLeft: 'auto' }}>取消上传</Button>
                        </div>
                        <div style={{ display: 'block !important', width: '100%', height: '100%', margin: 0 }}>
                            <div style={{ width: '100%', height: '95%' }}>
                                <Upload.Dragger
                                    {...uploadProps}
                                    openFileDialogOnClick={false}
                                    className={classNames(`${prefixCls}-panel-board`, hashId)}
                                    style={{ position: 'relative', }}
                                >
                                    <Upload {...uploadProps}>
                                        <Button type='primary' icon={<UploadOutlined />}
                                            className={classNames(`${prefixCls}-panel-btn`, hashId)}
                                            style={{ zIndex: 1, }}
                                        >
                                            上传
                                        </Button>
                                    </Upload>
                                    <p className={classNames(`${prefixCls}-panel-tips`, hashId)}>
                                        点击按钮或将图片拖拽至此处上传
                                    </p>
                                    <p className={classNames(`${prefixCls}-panel-format`, hashId)}>
                                        图片仅支持3MB以内jpg、bmp、gif、heic、png、jpeg、webp格式。
                                    </p>
                                </Upload.Dragger>
                            </div>
                        </div>
                    </Form>
                    <div style={{ display: !uploading ? 'none' : 'flex' }}
                        className={classNames(`${prefixCls}-list-container`, hashId)}
                    >
                        <div className={classNames(`${prefixCls}-list`, hashId)}>
                            <Alert
                                banner
                                showIcon
                                type='error'
                                icon={uploading ? <LoadingOutlined /> : undefined}
                                message={
                                    fileList.filter(f => f.status === 'uploading').length > 0
                                        ? `上传中，正在上传 ${fileList.length} 个文件`
                                        : `有 ${fileList.filter(f => f.status === 'error').length} 个上传失败，本次共成功上传 ${fileList.filter(f => f.status === 'done').length} 个文件，请稍后重试。`
                                } />
                            <div className={classNames(`${prefixCls}-list-files`, hashId)}>
                                {fileList.map((file, index) => (
                                    <div key={index} className={classNames(`${prefixCls}-list-item`, hashId)}>
                                        <div className={classNames(`${prefixCls}-list-item-img`, hashId)}>
                                            <img src={file.thumbUrl || file.url} />
                                        </div>
                                        <div className={classNames(`${prefixCls}-list-item-content`, hashId)}>
                                            <div className={classNames(`${prefixCls}-list-item-name`, hashId)}>
                                                {file.name}
                                            </div>
                                            <div className={classNames(`${prefixCls}-list-item-desc`, hashId)}>
                                                {convertByteUnit(file.size || 0)}
                                            </div>
                                        </div>
                                        <div className={classNames(`${prefixCls}-list-item-state`, hashId)}>
                                            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {
                                                    file.status === 'uploading'
                                                        ? <>
                                                            <LoadingOutlined style={{ color: token.colorPrimary, marginRight: '10px' }} />
                                                            上传中
                                                        </>
                                                        : file.status === 'done'
                                                            ? <>
                                                                <CheckCircleFilled style={{ color: token.colorSuccess, marginRight: '10px' }} />
                                                                上传成功
                                                            </>
                                                            : file.status === 'error'
                                                                ? <>
                                                                    <CloseCircleFilled style={{ color: token.colorError, marginRight: '10px' }} />
                                                                    上传失败&nbsp;&nbsp;网络错误，请尝试禁止浏览器插件或者换浏览器或者换电脑重试
                                                                </>
                                                                : <></>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                            <div className={classNames(`${prefixCls}-list-actions-wrap`, hashId)}>
                                <div className={classNames(`${prefixCls}-list-actions`, hashId)}>
                                    <Button type='text'>继续上传</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PicUploader;
