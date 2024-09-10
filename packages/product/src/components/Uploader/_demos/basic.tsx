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
                // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
                // normalize: {
                //     responseBody: (res) => {
                //         return {
                //             error: {
                //                 message: '',
                //             }
                //         }
                //     }
                // }
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