/**
 * title: 基本使用
 * description: 图片上传器
 */
import { useState } from "react";
import { UploadFile } from "antd";
import { Uploader } from "@web-react/biz-components";
import { DirType, UploadResponseBody } from "../typing";
import dataJson from './_data.json';

export default () => {
    // const [displayPanel, setDisplayPanel] = useState<DisplayPanelType>('uploader');
    const [fileList, setFileList] = useState<UploadFile<UploadResponseBody>[]>([]);
    return <div style={{ height: '100vh' }}>
        <Uploader
            defaultDirValue={'0'}
            dirs={dataJson.dirs as DirType[]}
            upload={{
                action: 'http://localhost:49007/api/services/app/ProductPublish/UploadImages',
                normalize: {
                    responseBody: (res) => {
                        const error = res.Error;
                        const result = res.Result || {};
                        return {
                            ...result,
                            error
                        }
                    }
                }
            }}
        // display={displayPanel}
        // onDisplayChange={(displayPanel) => {
        //     setDisplayPanel(displayPanel);
        // }}
        // fileList={fileList}
        // onChange={(fileList) => {
        // if (fileList.every((m) => m.status === 'done')) {
        //     setFileList([]);
        //     setDisplayPanel('uploader');
        // } else {
        //     setFileList(fileList);
        // }
        // }}
        />
    </div>

}