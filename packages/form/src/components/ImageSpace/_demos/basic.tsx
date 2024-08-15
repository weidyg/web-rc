import { ProConfigProvider } from '@ant-design/pro-components';
import { ImageSpace, ImageFile, FolderType } from '@web-react/biz-components';
import { FloatButton, Input, Select, Space } from 'antd';
import { ThemeProvider } from 'antd-style';
import { useState } from 'react';
import dataJson from './data.json';
import { FolderTreeType } from '../folderTree';
import { SearchOutlined } from '@ant-design/icons';
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
function getOptions(list: any[]): FolderTreeType[] {
  return list.map((m) => {
    return {
      value: m.id,
      label: m.name,
      children: m.children && getOptions(m.children),
    };
  });
}

export default () => {



  const SearchForm = () => {
    return <Space>
      <Space.Compact>
        <Select
          style={{ width: '100px' }}
          popupMatchSelectWidth={false}
          defaultValue={'picture'}
          options={[
            { label: '图片', value: 'picture' },
            { label: '宝贝名称', value: 'name' },
            { label: '宝贝ID', value: 'id' },
          ]}
        />
        <Input style={{ width: '120px' }} suffix={<SearchOutlined />} placeholder={'搜索'} />
      </Space.Compact>
      <Select
        defaultValue={'timeDes'}
        options={[
          { label: '文件名升序', value: 'nameAsc' },
          { label: '文件名降序', value: 'nameDes' },
          { label: '上传时间升序', value: 'timeAsc' },
          { label: '上传时间降序', value: 'timeDes' },
        ]}
        style={{ width: '147px', }}
      />
    </Space>
  }
  return (
    <>
      <ImageSpace
        fetchFolders={() => {
          return new Promise<FolderTreeType[]>((resolve, reject) => {
            setTimeout(() => {
              const cascaderOptions = getOptions([{ ...dataJson.dirs, children: [] }, ...dataJson.dirs.children]);
              resolve(cascaderOptions);
            }, 1000);
          })
        }}
        fetchData={(param) => {
          console.log('fetchData', param);
          const { page, size } = param;
          return new Promise<{ items: ImageFile[], total: number, }>((resolve, reject) => {
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
