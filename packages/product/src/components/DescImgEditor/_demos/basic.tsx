
import { DescImgEditor, } from '@web-react/biz-components';
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
  return (<>
    <DescImgEditor
      value={value}
      onChange={(v) => {
        setValue(v);
      }}
      onAdd={() => {
        const v = 'https://pics.17qcc.com/imgextra/product/202408/20/10453141053334.jpg';
        setValue([...value, v]);
      }}
      // onAdd={() => {
      //   const v = 'https://pics.17qcc.com/imgextra/product/202408/20/10453141053334.jpg';
      //   setValue([...value, v]);
      // }}
    />
  </>);
};
