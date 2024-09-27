/**
 * iframe: true
 * title: 基本使用
 * description: 图片上传器
 */
import { useState } from "react";
import { UploadFile } from "antd";
import { ImageUploader, DirType, UploadResponse } from "@web-react/biz-components";
import dataJson from './_data.json';

export default () => {
    // const [displayPanel, setDisplayPanel] = useState<DisplayPanelType>('uploader');
    const [fileList, setFileList] = useState<UploadFile<UploadResponse>[]>([]);
    return <div style={{ height: '100vh' }}>
        <ImageUploader
            defaultFolder={'0'}
            folders={dataJson.dirs as DirType[]}
            upload={{
                action: 'http://localhost:49007/api/services/app/ProductPublish/UploadImages',
                normalize: {
                    uploadResponse: (res) => {
                        const error = res.Error;
                        const result = res.Result || {};
                        return { ...result, error }
                    }
                }
            }}
        />
    </div>

}