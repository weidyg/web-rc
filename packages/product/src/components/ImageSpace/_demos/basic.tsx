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
import { ImageSpace } from '@web-react/biz-components';
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
    />
  </div>);
};
