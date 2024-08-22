
import { DeleteOutlined, EditOutlined, FileImageOutlined } from '@ant-design/icons';
import { DescImgEditor, } from '@web-react/biz-components';
import { Button } from 'antd';
import { useState } from 'react';

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

  function handleEdit(index: number) {

  }
  function handleAdd() {
    const v = 'https://pics.17qcc.com/imgextra/product/202408/20/10453141053334.jpg';
    setValue([...value, v]);
  }

  return (<>
    <DescImgEditor
      value={value}
      onChange={(v) => {
        setValue(v);
      }}
      renderActions={{
        add: <Button icon={<FileImageOutlined />} shape="round" type="primary" onClick={handleAdd}>添加图片</Button>,
        edit: (index) => <EditOutlined style={{ cursor: 'pointer' }} onClick={() => handleEdit(index)} />,
        remove: (index) => <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => handleRemove(index)} />,
      }}
    />
  </>);
};
