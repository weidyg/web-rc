import { useState } from "react";
import { UploadFile } from "antd";
import PicUploader, { DisplayPanelType, FolderType } from "../Uploader"
import { UploadResponseBody } from "../Uploader/request";
import dataJson from './_data.json';


export default () => {
    const [displayPanel, setDisplayPanel] = useState<DisplayPanelType>('uploader');
    const [fileList, setFileList] = useState<UploadFile<UploadResponseBody>[]>([]);
    return <PicUploader
        defaultFolderValue={'0'}
        folders={dataJson.dirs as FolderType[]}
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
        display={displayPanel}
        onDisplayChange={(displayPanel) => {
            setDisplayPanel(displayPanel);
        }}
        fileList={fileList}
        onChange={(fileList) => {
            if (fileList.every((m) => m.status === 'done')) {
                setFileList([]);
                setDisplayPanel('uploader');
            } else {
                setFileList(fileList);
            }
        }}
    />
}