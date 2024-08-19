import PicUploader, { FolderType } from "../uploader"
import dataJson from './_data.json';

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
    const folders = getOptions([{ ...dataJson.dirs, children: [] }, ...dataJson.dirs.children]);
    return <PicUploader
        defaultFolderValue={'0'}
        folders={folders as FolderType[]}
        upload={{
            // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
            normalize: {
                responseBody: (res) => {
                    return {
                        code: 200,
                        data: res.data,
                        message: res.message,
                        error: {
                            message:'',
                        }
                    }
                }
            }
        }}
    />
}