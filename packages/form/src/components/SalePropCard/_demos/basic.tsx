
import { SalePropCard, } from '@web-react/biz-components';
import { message } from 'antd';
import { useState } from 'react';
import dataJson from './data.json';
export default () => {
  const [value, setValue] = useState<any>();
  return (
    <>
      <SalePropCard
        uniqueGroup={true}
        options={dataJson.size}
        value={value}
        onOk={(val) => {
          setValue(val);
        }}
        onCancel={() => {
          message.info('click cancel');
        }}
      />
    </>
  );
};
