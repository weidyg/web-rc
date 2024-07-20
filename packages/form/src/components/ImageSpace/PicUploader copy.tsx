import React from 'react';

const PicUploader11: React.FC = () => {
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
                flexDirection: 'column'
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
            <div className="PicUploader_picUploader-body__kzhzS">
                <div className="UploadPanel_uploadPanel__sIQfY">
                    <form role="grid" className="next-form next-inline next-medium UploadPanel_uploadPanelForm__1t2ha" style={{ display: 'flex' }}>
                        <div className="UploadPanel_baseConfig__6-Vm-">
                            <div className="next-form-item next-medium UploadPanel_baseConfigItem__aYP9-" style={{ color: 'red', display: 'flex' }}>
                                <div className="next-form-item-label">
                                    <label htmlFor="dir">上传至</label>
                                </div>
                                <div className="next-form-item-control">
                                    <span data-meta="Field" className="next-select next-select-trigger next-select-single next-medium UploadPanel_uploadDirSelect__0EQ2a next-inactive next-has-search" aria-haspopup="true" aria-expanded="false">
                                        <span className="next-input next-medium next-select-inner">
                                            <span className="next-select-values next-input-text-field">
                                                <em title="全部图片">全部图片</em>
                                                <span className="next-select-trigger-search">
                                                    <input aria-valuetext="全部图片" id="dir" role="combobox" tabIndex={0} aria-expanded="false" aria-disabled="false" height="100%" size={1} autoComplete="off" value="" />
                                                    <span aria-hidden="true">
                                                        <span></span>
                                                        <span style={{ display: 'inline-block', width: '1px' }}>&nbsp;</span>
                                                    </span>
                                                </span>
                                            </span>
                                        </span>
                                        <span className="next-input-control">
                                            <span aria-hidden="true" className="next-select-arrow">
                                                <i className="next-icon next-icon-arrow-down next-medium next-select-symbol-fold"></i>
                                            </span>
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className="next-form-item next-medium UploadPanel_baseConfigItem__aYP9-" style={{ marginRight: '3px' }}>
                                <div className="next-form-item-control">
                                    <label data-meta="Field" className="next-checkbox-wrapper UploadPanel_uploadRadio__uP+TD ">
                                        <span className="next-checkbox">
                                            <span className="next-checkbox-inner">
                                                <i className="next-icon next-icon-select next-xs next-checkbox-select-icon"></i>
                                            </span>
                                            <input data-meta="Field" id="picWidth" type="checkbox" aria-checked="false" className="next-checkbox-input" value="" />
                                        </span>
                                        <span className="next-checkbox-label">
                                            <div>
                                                <span aria-haspopup="true" aria-expanded="false" style={{ fontSize: '12px' }}>图片宽度调整</span>
                                            </div>
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div className="next-form-item next-medium UploadPanel_baseConfigItem__aYP9-">
                                <div className="next-form-item-control">
                                    <div data-meta="Field" id="originSize" role="radiogroup" className="next-radio-group next-radio-group-hoz">
                                        <label dir="ltr" aria-checked="false" className="next-radio-wrapper ">
                                            <span className="next-radio ">
                                                <span className="next-radio-inner unpress"></span>
                                                <input tabIndex={0} type="radio" aria-checked="false" className="next-radio-input" />
                                            </span>
                                            <span className="next-radio-label">
                                                <span style={{ fontSize: '12px' }}>原图上传</span>
                                            </span>
                                        </label>
                                        <label dir="ltr" aria-checked="true" className="next-radio-wrapper checked ">
                                            <span className="next-radio checked ">
                                                <span className="next-radio-inner press"></span>
                                                <input tabIndex={0} type="radio" aria-checked="true" className="next-radio-input"
                                                    checked={false}
                                                />
                                            </span>
                                            <span className="next-radio-label">
                                                <span style={{ fontSize: '12px' }}>图片无损压缩上传</span>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <button type="button" className="next-btn next-small next-btn-secondary" style={{ marginLeft: 'auto' }}>
                                <span className="next-btn-helper">取消上传</span>
                            </button>
                        </div>
                        <div className="next-form-item next-left next-medium UploadPanel_uploadBoardFormItem__byBo0">
                            <div className="next-form-item-control">
                                <div className="next-loading next-loading-inline UploadPanel_uploadLoading__O-uQm" style={{ width: '100%', height: '100%' }}>
                                    <div className="next-loading-wrap">
                                        <div id="sucai-tu-upload-pannel" className="UploadPanel_uploadBoard__JQ-Yg" style={{ position: 'relative' }}>
                                            <button id="sucai-tu-upload" type="button" className="next-btn next-large next-btn-primary UploadPanel_uploadButton__RUgKt" style={{ zIndex: 1 }}>
                                                <span className="qn_upload qn_iconfont" style={{ marginRight: '6px' }}></span>
                                                <span className="next-btn-helper">上传</span>
                                            </button>
                                            <p className="UploadPanel_uploadTips__77Fa1">点击按钮或将图片拖拽至此处上传</p>
                                            <p className="UploadPanel_uploadFormat__Qez3d">图片仅支持3MB以内jpg、bmp、gif、heic、png、jpeg、webp格式。</p>
                                            <div id="html5_1i37b4tjnf4215q711611238t3pa_container" className="moxie-shim moxie-shim-html5" style={{ position: 'absolute', top: '157px', left: '423px', width: '92px', height: '48px', overflow: 'hidden', zIndex: 0 }}>
                                                <input id="html5_1i37b4tjnf4215q711611238t3pa" type="file" style={{
                                                    fontSize: '999px', opacity: 0, position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%'
                                                }}
                                                    multiple={false}
                                                    accept="image/jpeg,image/bmp,image/gif,.heic,image/png,.webp"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="UploadPanel_uploadListPanelContainer__OYsv5" style={{ display: 'none' }}>
                        <div className="UploadPanel_uploadListPanel__7wFcN">
                            <div role="alert" className="next-message next-message-loading next-inline next-medium next-only-content" style={{ flexShrink: 0 }}>
                                <i className="next-icon next-medium next-message-symbol next-message-symbol-icon"></i>
                                <div className="next-message-content">上传中，正在上传 0 个文件</div>
                            </div>
                            <div className="UploadPanel_uploadFileList__MYDpC"></div>
                            <div className="UploadPanel_uploadAction__YgoMH">
                                <div className="UploadPanel_actions__Ht6ba">
                                    <button type="button" className="next-btn next-medium next-btn-secondary next-btn-text">
                                        <span className="next-btn-helper">继续上传</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PicUploader11;
