/**
 * title: 基本使用
 * description: 基本的描述图编辑器
 */


import { useState } from 'react';
import dataJson from './_data.json';
import { ImageDesc } from '@web-react/biz-components';

const imgList = [
  'https://pics.17qcc.com/imgextra/product/202408/20/15656633466472.jpg',
  'https://pics.17qcc.com/imgextra/product/202408/20/10453139457026.jpg',
  'https://pics.17qcc.com/imgextra/product/202408/20/10453141053334.jpg',
  'https://pics.17qcc.com/imgextra/product/202408/20/15656633466472.jpg',
  'https://pics.17qcc.com/imgextra/product/202408/20/10453139457026.jpg',
  'https://pics.17qcc.com/imgextra/product/202408/20/10453141053334.jpg',
  'https://pics.17qcc.com/imgextra/product/202408/20/15656633466472.jpg',
  'https://pics.17qcc.com/imgextra/product/202408/20/10453139457026.jpg',
  'https://pics.17qcc.com/imgextra/product/202408/20/10453141053334.jpg',
  'https://pics.17qcc.com/imgextra/product/202408/20/15656633466472.jpg',
  'https://pics.17qcc.com/imgextra/product/202408/20/10453139457026.jpg',
  'https://pics.17qcc.com/imgextra/product/202408/20/10453141053334.jpg',
  'https://pics.17qcc.com/imgextra/product/202408/20/15656633466472.jpg',
  'https://pics.17qcc.com/imgextra/product/202408/20/10453139457026.jpg',
  'https://pics.17qcc.com/imgextra/product/202408/20/10453141053334.jpg',
]

export default () => {
  const [value, setValue] = useState<string[]>(imgList);

  function handleRemove(index: number) {
    const newImgList = [...value];
    newImgList.splice(index, 1);
    setValue(newImgList);
  }

  function handleEdit(index: number, url: string) {
    const newImgList = [...value];
    newImgList[index] = url;
    setValue(newImgList);
  }

  function handleAdd(url: string[]) {
    setValue([...value, ...url]);
  }

  return (<>
    <ImageDesc
      value={value}
      onChange={(v) => {
        setValue(v);
      }}
    // renderActions={{
    // add: <Add onOk={handleAdd} />,
    // edit: (index) => <Edit onOk={(url) => handleEdit(index, url)} />,
    // remove: (index) => <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => handleRemove(index)} />,
    // }}
    />
  </>);
};
