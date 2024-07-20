import { LoadingOutlined, UploadOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Cascader, Checkbox, Form, Input, InputNumber, Radio, Select, Spin, Upload } from 'antd';
import Alert from 'antd/es/alert/Alert';
import React, { CSSProperties } from 'react';
const baseConfigItem: CSSProperties = {
    alignItems: 'center',
    display: 'flex',
    margin: 0,
    flexWrap: 'nowrap',
    padding: '4px 0'
};
const PicUploader: React.FC = () => {
    return (
        <div className="PicUploader_picUploader-container__XGqts"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                borderRadius: '12px',
                zIndex: 1,
                backgroundColor: '#fff',
                display: 'flex',
                flexDirection: 'column',
            }}>
            <div className="PicUploader_picUploader-header__9XsP1"
                style={{ display: 'none' }}>
                <span className="PicUploader_picUploader-title__9vZAn">上传图片</span>
                <span className="qn_iconfont qn_close_blod"
                    style={{
                        cursor: 'pointer',
                        width: '30px',
                        height: '30px',
                        fontWeight: '900',
                        textAlign: 'center',
                        lineHeight: '30px'
                    }}>
                </span>
            </div>
            <div className="PicUploader_picUploader-body__kzhzS"
                style={{
                    height: 'calc(100% - 65px)',
                    flex: '1 1'
                }}
            >
                <div className="UploadPanel_uploadPanel__sIQfY"
                    style={{
                        padding: '4px 21px 0',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Form layout='inline'
                        className='UploadPanel_uploadPanelForm__1t2ha'
                        style={{
                            // display: 'flex'，
                            //</div></div>
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            flexWrap: 'nowrap'
                        }}
                    >
                        <div className="UploadPanel_baseConfig__6-Vm-"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap'
                            }}
                        >
                            <Form.Item label='上传至'
                                className='UploadPanel_baseConfigItem__aYP9-'
                                style={{ color: 'red', display: 'flex' }}
                            >
                                <Cascader changeOnSelect
                                    className="UploadPanel_uploadDirSelect__0EQ2a" />
                            </Form.Item>
                            <Form.Item
                                className='UploadPanel_baseConfigItem__aYP9-'
                                style={{
                                    marginRight: '3px',
                                    ...baseConfigItem,
                                }}
                            >
                                <Checkbox rootClassName="UploadPanel_uploadRadio__uP+TD">
                                    <span style={{ fontSize: '12px' }}>图片宽度调整</span>
                                </Checkbox>
                            </Form.Item>


                            <Form.Item
                                className='UploadPanel_baseConfigItem__aYP9-'
                                style={{
                                    ...baseConfigItem,
                                }}
                            >
                                <Select />
                            </Form.Item>

                            <Form.Item
                                className='UploadPanel_baseConfigItem__aYP9-'
                                style={{
                                    ...baseConfigItem,
                                }}
                            >
                                <InputNumber min={0} max={10000} suffix='px' />
                            </Form.Item>


                            <Form.Item
                                className='UploadPanel_baseConfigItem__aYP9-'
                                style={{
                                    marginRight: '3px',
                                    ...baseConfigItem,
                                }}
                            >
                                <Checkbox rootClassName="UploadPanel_uploadRadio__uP+TD">
                                    <span style={{ fontSize: '12px' }}>图片宽度调整</span>
                                </Checkbox>
                            </Form.Item>

                            <Form.Item
                                className='UploadPanel_baseConfigItem__aYP9-'
                                style={{
                                    marginRight: '3px',
                                    ...baseConfigItem,
                                }}
                            >
                                <Radio.Group
                                    options={[
                                        { label: <span style={{ fontSize: '12px' }}>原图上传</span>, value: 1 },
                                        { label: <span style={{ fontSize: '12px' }}>图片无损压缩上传</span>, value: 2 },
                                    ]} />
                            </Form.Item>
                            <Button style={{ marginLeft: 'auto' }}>取消上传</Button>
                        </div>
                        <div className='UploadPanel_uploadBoardFormItem__byBo0'
                            style={{
                                display: 'block !important',
                                width: '100%',
                                height: '100%',
                                margin: 0
                            }}>
                            <div
                                className="UploadPanel_uploadLoading__O-uQm"
                                style={{
                                    width: '100%',
                                    height: '95%'
                                }}>
                                <Upload
                                    hasControlInside={true}
                                    name='file'
                                    type="drag"
                                    multiple={true}
                                    accept='image/jpeg,image/bmp,image/gif,.heic,image/png,.webp'
                                    className="UploadPanel_uploadBoard__JQ-Yg"
                                    style={{
                                        position: 'relative',
                                        //==--
                                        height: '100%',
                                        width: '100%',
                                        marginTop: '9px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'column',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Button type='primary' icon={<UploadOutlined />}
                                        className="UploadPanel_uploadButton__RUgKt"
                                        style={{
                                            zIndex: 1,
                                            //--

                                            fontSize: '16px',
                                            height: '48px',
                                            padding: '0 18px'
                                        }}
                                    >上传</Button>
                                    <p className="UploadPanel_uploadTips__77Fa1"
                                        style={{
                                            marginTop: '18px',
                                            marginRight: '0',
                                            marginBottom: '0',
                                            marginLeft: '0',
                                            fontWeight: '400',
                                            fontSize: '14px',
                                            color: '#333'
                                        }}
                                    >点击按钮或将图片拖拽至此处上传</p>
                                    <p className="UploadPanel_uploadFormat__Qez3d"
                                        style={{
                                            marginTop: '14px',
                                            marginRight: '0',
                                            marginBottom: '0',
                                            marginLeft: '0',
                                            fontWeight: '400',
                                            fontSize: '12px',
                                            color: '#999'
                                        }}
                                    >图片仅支持3MB以内jpg、bmp、gif、heic、png、jpeg、webp格式。</p>
                                </Upload>
                            </div>
                        </div>
                    </Form>
                    <div className="UploadPanel_uploadListPanelContainer__OYsv5" style={{ display: 'none' }}>
                        <div className="UploadPanel_uploadListPanel__7wFcN">
                            <Alert banner icon={<LoadingOutlined />} message={`上传中，正在上传 0 个文件`} />
                            <div className="UploadPanel_uploadFileList__MYDpC">

                            </div>
                            <div className="UploadPanel_uploadAction__YgoMH">
                                <div className="UploadPanel_actions__Ht6ba">
                                    <Button type='text'>继续上传</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default PicUploader;
