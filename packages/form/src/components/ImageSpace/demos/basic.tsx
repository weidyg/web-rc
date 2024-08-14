import { ProConfigProvider } from '@ant-design/pro-components';
import { ImageSpace, ImageFile, FolderType } from '@web-react/biz-components';
import { FloatButton } from 'antd';
import { ThemeProvider } from 'antd-style';
import { useState } from 'react';
import dataJson from './data.json';
const files = dataJson.files.fileModule.map(m => {
  return {
    id: m.pictureId,
    name: m.name,
    size: m.sizes,
    pixel: m.pixel,
    fullUrl: m.fullUrl,
    isRef: m.ref,
  }
});
function getOptions(list: any[]): any[] {
  return list.map((m) => {
    return {
      value: m.id,
      label: m.name,
      children: m.children && getOptions(m.children),
    };
  });
}

export default () => {
  return (
    <>
      <ImageSpace
        fetchFolders={() => {
          return new Promise<FolderType[]>(
            (resolve, reject) => {
              setTimeout(() => {
                const cascaderOptions = getOptions([{ ...dataJson.dirs, children: [] }, ...dataJson.dirs.children]);
                resolve(cascaderOptions);
              }, 1000);
            })
        }}
        fetchData={(page: number, size: number) => {
          return new Promise<{ items: ImageFile[], total: number, }>(
            (resolve, reject) => {
              setTimeout(() => {
                const newData: ImageFile[] = files
                  .slice((page - 1) * size, page * size)
                  .map((file, index) => {
                    return {
                      ...file,
                      id: file.id + '_' + page,
                    };
                  });
                const data = { items: newData, total: files.length, };
                resolve(data);
              }, 1000);
            })
        }}
      />
    </>
  );
};
