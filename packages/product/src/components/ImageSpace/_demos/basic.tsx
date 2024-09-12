/**
 * iframe: true
 * compact: true
 * title: 图片上传器
 * description: 基本的图片空间展示
 */
// https://d.umijs.org/config/demo
import { Key, useEffect, useRef, useState } from 'react';
import { Button, Input, Select, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import dataJson from './_data.json';
import { ImageFile, ImageSpace } from '@web-react/biz-components';
import { FolderTreeType } from '../FolderTree';
export default () => {

  return (<div style={{
    width: '100vw',
    height: '100vh',
    overflow: 'hidden'
  }}>
    <ImageSpace
      defaultFolder={{ value: '0', label: '全部图片', }}
      fetchFolders={() => {
        return new Promise<FolderTreeType[]>((resolve, reject) => {
          setTimeout(() => {
            resolve(dataJson.dirs);
          }, 1000);
        })
      }}
      fetchData={(param) => {
        const queryParam = { ...param }
        const { page, size } = queryParam;
        return new Promise<{ items: ImageFile[], total: number, }>((resolve, reject) => {
          setTimeout(() => {
            const newData: ImageFile[] = dataJson.files
              .slice((page - 1) * size, page * size)
              .map((file) => ({ ...file, id: file.id + '_' + page, }));
            resolve({ items: newData, total: dataJson.files.length, });
          }, 1000);
        })
      }}
    />
  </div>);
};
