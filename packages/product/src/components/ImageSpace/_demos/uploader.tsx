import { useState } from "react";
import PicUploader, { DisplayPanelType, FolderType } from "../uploader"
import dataJson from './_data.json';
import { UploadFile } from "antd";
import { UploadResponseBody } from "../uploader/request";

function getOptions(list: any[]): FolderType[] {
    return list.map((m) => {
        return {
            value: m.id,
            label: m.name,
            children: m.children && getOptions(m.children),
        };
    });
}

export default () => {
    const [displayPanel, setDisplayPanel] = useState<DisplayPanelType>('uploader');
    const [fileList, setFileList] = useState<UploadFile<UploadResponseBody>[]>([]);
    const folders = getOptions([{ ...dataJson.dirs, children: [] }, ...dataJson.dirs.children]);
    return <PicUploader
        defaultFolderValue={'0'}
        folders={folders as FolderType[]}
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