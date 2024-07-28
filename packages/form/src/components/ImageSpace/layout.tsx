import { ReactNode, useState } from 'react';
import { Button, Cascader, Checkbox, Flex, Form, InputNumber, Radio, Select, Table, Typography, Upload, UploadFile, UploadProps, } from 'antd';
import classNames from 'classnames';
import { useStyle } from './style';
import { AppstoreOutlined, UnorderedListOutlined, UploadOutlined } from '@ant-design/icons';

import dataJson from './data.json';
import PicCard from './PicCard';

type ImageSpaceLayoutProps = {
    /** 类名 */
    className?: string;
    /** 样式 */
    style?: React.CSSProperties;
    /** 自定义样式前缀 */
    prefixCls?: string;

    treeDom?: ReactNode;
    footer?: ReactNode;
};

function getOptions(list: any[]): any[] {
    return list.map((m) => {
        return {
            value: m.id,
            label: m.name,
            children: m.children && getOptions(m.children),
        };
    });
}
const cascaderOptions = getOptions([{ ...dataJson.dirs, children: [] }, ...dataJson.dirs.children]);


const ImageSpaceLayout: React.FC<ImageSpaceLayoutProps> = (props) => {
    const { style, className } = props;
    const { prefixCls, wrapSSR, hashId, token } = useStyle(props.prefixCls);
    const classString = classNames(prefixCls, className, hashId, {});
    const [displayPanel, setDisplayPanel] = useState<'uploader' | 'uploadList' | undefined>();
    const [cardview, setCardview] = useState(true);

    const DataList = () => {
        return <>
            {dataJson.files.fileModule.map((item, index) => (
                <PicCard
                    key={index}
                    id={item.pictureId}
                    name={item.name}
                    fullUrl={item.fullUrl}
                    pixel={item.pixel}
                    isRef={item.ref}
                    onChange={(value: boolean, prevValue: boolean) => {
                        console.log('PicCard onChange', value, prevValue);
                    }}
                />
            ))}
            {Array.from({ length: 10 }).map((item, index) => (
                <i key={index} className={classNames(`${prefixCls}-pic-dom`, hashId)} />
            ))}
        </>
    }
    const DataTable = () => {
        return <Table
            size="middle"
            scroll={{ y: 'calc(-170px + 100vh)' }}
            pagination={false}
            columns={[
                {
                    dataIndex: 'name',
                    title: '文件',
                    render: (value, record) => (
                        <div style={{ overflow: 'hidden', display: 'flex' }}>
                            <div style={{ margin: '8px 10px 0px 0px', }}>
                                <Checkbox></Checkbox>
                            </div>
                            <div
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '6px',
                                    objectFit: 'contain',
                                }}
                            >
                                <img
                                    src={record.fullUrl}
                                    style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '6px',
                                        objectFit: 'contain',
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    maxWidth: '105px',
                                    fontWeight: '400',
                                    fontFamily: 'PingFangSC',
                                    marginLeft: '10px',
                                    transform: 'translateY(-4px)',
                                    cursor: 'pointer',
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: '12px',
                                        textAlign: 'center',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {value}
                                </p>
                            </div>
                        </div>
                    ),
                },
                { dataIndex: 'pixel', title: '尺寸' },
                { dataIndex: 'sizes', title: '大小' },
                { dataIndex: 'status', title: '状态' },
                {
                    dataIndex: 'ref',
                    title: '是否引用',
                    render: (value, record) => <> {value + ''}</>,
                },
                { dataIndex: 'gmtModified', title: '修改时间' },
                {
                    dataIndex: 'action',
                    title: '操作',
                    render: (_, record) => (
                        <Flex gap={4}>
                            <Button type="link" style={{ padding: 'unset' }}>
                                预览
                            </Button>
                            <Button type="link" style={{ padding: 'unset' }}>
                                AI图片编辑
                            </Button>
                        </Flex>
                    ),
                },
            ]}
            dataSource={dataJson.files.fileModule}
        />
    }
    const Uploader = () => {
        const [fileList, setFileList] = useState<UploadFile[]>([]);

        const uploadProps: UploadProps = {
            name: 'file',
            multiple: true,
            showUploadList: false,
            action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
            accept: 'image/jpeg,image/bmp,image/gif,.heic,image/png,.webp',
            fileList: fileList,
            onChange: ({ file, fileList, event }) => {
                setFileList(fileList);
            },
        };

        return <Upload.Dragger
            {...uploadProps}
            openFileDialogOnClick={false}
            className={classNames(`${prefixCls}-picUploader-panel-board`, hashId)}
            style={{ position: 'relative' }}
        >
            <Upload {...uploadProps}>
                <Button
                    type="primary"
                    icon={<UploadOutlined />}
                    className={classNames(`${prefixCls}-picUploader-panel-btn`, hashId)}
                    style={{ zIndex: 1 }}
                >
                    上传
                </Button>
            </Upload>
            <p className={classNames(`${prefixCls}-picUploader-panel-tips`, hashId)}>点击按钮或将图片拖拽至此处上传</p>
            <p className={classNames(`${prefixCls}-picUploader-panel-format`, hashId)}>
                图片仅支持3MB以内jpg、bmp、gif、heic、png、jpeg、webp格式。
            </p>
        </Upload.Dragger>
    }

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
                    options={cascaderOptions}
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
        <div className={classString} style={style}>
            <div className={classNames(`${prefixCls}-body`, hashId)}>
                <div className={classNames(`${prefixCls}-aside`, hashId)}>
                    <div className={classNames(`${prefixCls}-treeDom`, hashId)} >
                        {`props?.treeDom`}
                    </div>
                </div>
                <div className={classNames(`${prefixCls}-dashboard`, hashId)}>
                    {/* <div style={{ display: 'flex', flexGrow: 1, flexBasis: '100%', position: 'absolute', background: 'rgba(255, 255, 255, 0.5)', zIndex: -1, width: '100%', height: '100%' }} /> */}
                    <div className={classNames(`${prefixCls}-dashboard-header`, hashId)}>
                        <div className={classNames(`${prefixCls}-dashboard-header-actions`, hashId)}>
                            <div className={classNames(`${prefixCls}-dashboard-header-actions-left`, hashId)}>
                                <AppstoreOutlined
                                    style={{
                                        marginRight: '8px',
                                        cursor: 'pointer',
                                        color: cardview ? token.colorPrimaryTextActive : token.colorTextSecondary,
                                    }}
                                    onClick={() => {
                                        setCardview(true);
                                    }}
                                />
                                <UnorderedListOutlined
                                    style={{
                                        cursor: 'pointer',
                                        color: cardview ? token.colorTextSecondary : token.colorPrimaryTextActive,
                                    }}
                                    onClick={() => {
                                        setCardview(false);
                                    }}
                                />
                                <Button style={{ width: '72px', height: '30px', margin: '0 9px', fontSize: '12px', }}>
                                    刷新
                                </Button>
                                {`props?.dashboard?.header?.left`}
                            </div>
                            <div className={classNames(`${prefixCls}-dashboard-header-actions-right`, hashId)}>
                                {`props?.dashboard?.header?.right`}
                                <Button type="primary" style={{ height: '30px', fontSize: '12px' }}
                                    onClick={() => { setDisplayPanel('uploader') }}>
                                    上传图片
                                </Button>
                            </div>
                        </div>
                    </div>
                    {cardview ? (
                        <div className={classNames(`${prefixCls}-dashboard-list`, hashId)}>
                            <div className={classNames(`${prefixCls}-dashboard-list-document`, hashId)}>
                                <DataList />
                            </div>
                        </div>
                    ) : (
                        <div className={classNames(`${prefixCls}-dashboard-table`, hashId)}>
                            <DataTable />
                        </div>
                    )}
                </div>
                <div style={{ display: displayPanel == ('uploader' || 'uploadList') ? 'flex' : 'none' }}
                    className={classNames(`${prefixCls}-picUploader-container`, hashId)}>
                    <div className={classNames(`${prefixCls}-picUploader-body`, hashId)}>
                        <div className={classNames(`${prefixCls}-picUploader-panel`, hashId)}>

                            <div
                                style={{ display: displayPanel == 'uploader' ? 'flex' : 'none' }}
                                className={classNames(`${prefixCls}-picUploader-panel-form`, hashId)}
                            >
                                <div className={classNames(`${prefixCls}-picUploader-panel-config`, hashId)}>
                                    <ConfigForm />
                                    <Button style={{ marginLeft: 'auto' }}
                                        onClick={() => { setDisplayPanel(undefined) }}
                                    >
                                        取消上传
                                    </Button>
                                </div>
                                <div style={{ display: 'block !important', width: '100%', height: '100%', margin: 0 }}>
                                    <div style={{ width: '100%', height: '95%' }}>
                                        <Uploader />
                                    </div>
                                </div>
                            </div>

                            <div
                                style={{ display: displayPanel == 'uploadList' ? 'flex' : 'none' }}
                                className={classNames(`${prefixCls}-picUploader-list-container`, hashId)}
                            >
                                <div className={classNames(`${prefixCls}-picUploader-list`, hashId)}>
                                    {`Alert`}
                                    <div className={classNames(`${prefixCls}-picUploader-list-files`, hashId)}>
                                        {`items`}
                                    </div>
                                    <div className={classNames(`${prefixCls}-picUploader-list-actions-wrap`, hashId)}>
                                        <div className={classNames(`${prefixCls}-picUploader-list-actions`, hashId)}>
                                            <Button type="text">继续上传</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classNames(`${prefixCls}-footer`, hashId)}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography.Link target="_blank" style={{ marginLeft: '18px' }}>
                        进入图片空间
                    </Typography.Link>
                </div>
                <div style={{ width: 'calc(100% - 460px)' }} />
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row-reverse',
                    }}
                >
                    <Button
                        type="primary"
                        className={classNames(`${prefixCls}-footer-selectOk`, hashId)}
                    // disabled={okDisabled}
                    // onClick={handleOkClick}
                    >
                        确定
                    </Button>
                </div>
            </div>
        </div>,
    );
};

export type { ImageSpaceLayoutProps };
export default ImageSpaceLayout;
