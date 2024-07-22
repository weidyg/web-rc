
import React, { CSSProperties, useState } from 'react';
import classNames from 'classnames';
import { CloseCircleFilled, LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { Alert, Button, Cascader, Checkbox, Form, GetProp, InputNumber, Radio, Select, Upload, UploadFile, UploadProps } from 'antd';
import { useStyle } from './style';
import dataJson from './data.json';

type PicUploaderProps = {
    prefixCls?: string;
};
const PicUploader: React.FC<PicUploaderProps> = (props) => {
    const { } = props;
    const { prefixCls: componentCls, wrapSSR, hashId } = useStyle(props?.prefixCls);
    const prefixCls = `${componentCls}-picUploader`;
    const [form] = Form.useForm();

    const crop = (
        file: Blob,
        pixelCrop: {
            width: number;
            height: number;
            x: number;
            y: number;
        }, rotation = 0
    ): Promise<Blob> => {
        return new Promise<Blob>((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const img = document.createElement('img');
                img.src = reader.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const imageSize = 2 * ((Math.max(img.width, img.height) / 2) * Math.sqrt(2));
                    canvas.width = imageSize;
                    canvas.height = imageSize;
                    const ctx = canvas.getContext('2d')!;
                    if (rotation) {
                        ctx.translate(imageSize / 2, imageSize / 2);
                        ctx.rotate((rotation * Math.PI) / 180);
                        ctx.translate(-imageSize / 2, -imageSize / 2);
                    }
                    ctx.drawImage(img, imageSize / 2 - img.width / 2, imageSize / 2 - img.height / 2);
                    const data = ctx.getImageData(0, 0, imageSize, imageSize);
                    canvas.width = pixelCrop.width;
                    canvas.height = pixelCrop.height;
                    ctx.putImageData(data,
                        Math.round(0 - imageSize / 2 + img.width * 0.5 - pixelCrop.x),
                        Math.round(0 - imageSize / 2 + img.height * 0.5 - pixelCrop.y)
                    );
                    canvas.toBlob((blob) => resolve(blob as any));
                };
            };
        });
    }
    const watermark = (file: Blob, text: string): Promise<Blob> => {
        return new Promise<Blob>((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const img = document.createElement('img');
                img.src = reader.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.naturalWidth;
                    canvas.height = img.naturalHeight;
                    const ctx = canvas.getContext('2d')!;
                    ctx.drawImage(img, 0, 0);
                    ctx.fillStyle = 'red';
                    ctx.textBaseline = 'middle';
                    ctx.font = '33px Arial';
                    ctx.fillText(text, 20, 20);
                    canvas.toBlob((result) => resolve(result as any));
                };
            };
        });
    }

    const resizeSize = (file: Blob, size: { width?: number, height?: number }): Promise<Blob> => {
        const { width, height } = size || {};
        if (!width && !height) { return Promise.resolve(file); }
        return new Promise<Blob>((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const img = document.createElement('img');
                img.src = reader.result as string;
                img.onload = () => {
                    const widthRatio = (width || img.width) / img.width;
                    const heightRatio = (height || img.height) / img.height;
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width * widthRatio;
                    canvas.height = img.height * heightRatio;
                    const ctx = canvas.getContext('2d')!;
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    canvas.toBlob((result) => resolve(result as any));
                };
            };
        });
    }

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);
    const uploadProps: UploadProps = {
        name: 'file',
        multiple: true,
        showUploadList: false,
        action: '/',
        accept: 'image/jpeg,image/bmp,image/gif,.heic,image/png,.webp',
        fileList: fileList,
        onChange: ({ file, fileList, event }) => {
            setFileList(fileList);
        },
        beforeUpload: (file, fileList) => {
            return watermark(file, '水印');
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
                        style={{
                            // display: 'none' 
                        }}
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
                                    <Upload   {...uploadProps}>
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
                    <div className="UploadPanel_uploadListPanelContainer__OYsv5" style={{
                        display: 'none',
                        // display: 'flex',
                        flex: '1 1',
                        height: 'calc(100vh - 65px)',
                        flexDirection: 'column'
                    }}>
                        <div className="UploadPanel_uploadListPanel__7wFcN"
                            style={{
                                display: 'flex',
                                flex: '1 1',
                                width: '100%',
                                height: '100%',
                                flexDirection: 'column',
                                paddingBottom: '20px'
                            }}>
                            <Alert
                                banner
                                showIcon
                                type='error'
                                // icon={<LoadingOutlined />}
                                message={
                                    // `上传中，正在上传 0 个文件`
                                    `有 1 个上传失败，本次共成功上传 0 个文件，请稍后重试。`
                                } />
                            <div className="UploadPanel_uploadFileList__MYDpC"
                                style={{
                                    display: 'flex',
                                    marginTop: '12px',
                                    flexDirection: 'column',
                                    width: '100%',
                                    height: 'calc(100% - 118px)',
                                    // overflowY: 'scroll',
                                    // overflowY: 'overlay'
                                }}
                            >

                                <div className="UploadPanel_fileItem"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        borderRadius: '9px',
                                        marginBottom: '12px'
                                        //:last-child { margin-bottom: 0;}
                                    }}
                                >
                                    <div className="UploadPanel_fileImg"
                                        style={{
                                            height: '48px',
                                            width: '48px',
                                            backgroundColor: '#f7f8fa',
                                            borderRadius: '12px',
                                            flexShrink: 0
                                        }}>
                                        <img alt="" />
                                    </div>
                                    <div className="UploadPanel_fileContent"
                                        style={{
                                            width: '40%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            marginLeft: '12px',
                                            height: '100%',
                                            overflow: 'hidden',
                                            flexShrink: 0
                                        }}
                                    >
                                        <div className="UploadPanel_fileName" style={{
                                            fontWeight: '500',
                                            fontSize: '12px',
                                            color: '#333',
                                            flex: '1 1',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            whiteSpace: 'break-all',
                                            WebkitLineClamp: '2',
                                            WebkitBoxOrient: 'vertical'
                                        }}>
                                            屏幕截图 2024-05-28 102108.png
                                        </div>
                                        <div className="UploadPanel_fileDesc"
                                            style={{
                                                flexShrink: 0,
                                                fontSize: '12px',
                                                color: '#999'
                                            }}
                                        >50.71K</div>
                                    </div>
                                    <div className="UploadPanel_fileState"
                                        style={{
                                            flex: '1 1',
                                            width: '30%',
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        <div style={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            <CloseCircleFilled style={{ color: 'rgb(255, 51, 51)', marginRight: '10px' }} />
                                            上传失败&nbsp;&nbsp;网络错误，请尝试禁止浏览器插件或者换浏览器或者换电脑重试
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="UploadPanel_uploadAction__YgoMH"
                                style={{
                                    marginTop: '20px',
                                    flexShrink: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                <div className="UploadPanel_actions__Ht6ba"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
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
