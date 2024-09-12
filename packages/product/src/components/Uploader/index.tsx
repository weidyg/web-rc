import React, { useEffect, useState } from 'react';
import { Button, Cascader, Checkbox, Form, InputNumber, Select, UploadFile, UploadProps, } from 'antd';
import { classNames, drawImage, useMergedState } from '@web-react/biz-utils';
import { BaseUploadResponseBody, DirKey, DirType, UploaderProps } from './typing';
import { findPath } from './_utils';
import { useStyle } from './style';
import InternalDraggerUpload from './DraggerUpload';
import InternalUploadList from './UploadList';

type ConfigFormValueType = {
    folderId: string,
    picWidth: boolean,
    picWidthOption: number,
    picWidthValue: number,
    originSize: boolean
};

const FolderSelect = (props: {
    value?: DirKey,
    defaultValue?: DirKey,
    onChange?: (value: DirKey) => void,
    options?: DirType[],
}) => {
    const { value, defaultValue, onChange, options } = props;
    const [selectKeys, setSelectKeys] = useState<DirKey[]>([]);
    const [folderId, setFolderId] = useMergedState<DirKey>('', {
        value: value,
        defaultValue: defaultValue,
        onChange: onChange,
    });
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

const InternalUploader = <
    UploadResponseBodyType extends BaseUploadResponseBody = BaseUploadResponseBody,
>(
    props: UploaderProps<UploadResponseBodyType>,
) => {
    const { defaultDirValue, dirs, configRender, previewFile, upload = {} } = props;
    const { data: uploadData, ...restUpload } = upload;

    const { prefixCls, wrapSSR, hashId, token } = useStyle();
    const [form] = Form.useForm<ConfigFormValueType>();

    const [showUploadList, setShowUploadList] = useState(false);
    const [fileList, setFileList] = useMergedState<UploadFile<UploadResponseBodyType>[]>([], {
        value: props?.fileList,
        onChange: (value) => props?.onChange?.(value),
    });

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
                <InternalDraggerUpload
                    style={{ display: !showUploadList ? 'flex' : 'none', }}
                    configRender={() => configRender?.(defaultConfigDom) || defaultConfigDom}
                    data={async (file) => {
                        const data = typeof uploadData == "function"
                            ? await uploadData(file)
                            : uploadData;
                        const values = form.getFieldsValue();
                        return { ...values, ...data }
                    }}
                    beforeUpload={(file, fileList) => {
                        setShowUploadList(true);
                        const config = form.getFieldsValue();
                        if (config.picWidth) {
                            const width = config.picWidthOption == -1 ? config.picWidthValue : config.picWidthOption;
                            if (width > 0) { return drawImage(file, { width }, true); }
                        }
                        return file;
                    }}
                    fileList={fileList}
                    onChange={({ fileList }) => {
                        setFileList(fileList);
                        const success = fileList.every(e => e.status === 'done');
                        if (success) {
                            setTimeout(() => {
                                setShowUploadList(false);
                            }, 1000);
                        }
                    }}
                    {...restUpload}
                />
                <InternalUploadList
                    style={{ display: showUploadList ? 'flex' : 'none', }}
                    fileList={fileList}
                    previewFile={previewFile}
                    actionsRender={() => (
                        <Button type="text"
                            onClick={handleUpload}>
                            继续上传
                        </Button>
                    )}
                />
            </div>
        </div>
    )
};

type CompoundedComponent<T = BaseUploadResponseBody> = typeof InternalUploader & {
    <U extends T>(props: UploadProps<U>,): React.ReactElement;
};
const Uploader = InternalUploader as CompoundedComponent;
export default Uploader;
