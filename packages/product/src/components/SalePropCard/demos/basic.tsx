/**
 * title: 销售属性卡片
 * description: 基本的销售属性卡片
 */
import { useState } from 'react';
import { message, Switch } from 'antd';
import { SalePropCard, } from '@web-react/biz-components';
import dataJson from './_data.json';
export default () => {
  const [uniqueGroup, setUniqueGroup] = useState<boolean>(true);
  const [value, setValue] = useState<any>();
  return (
    <>
      <Switch value={uniqueGroup} onChange={(val) => setUniqueGroup(val)} />
      <br />
      {JSON.stringify(value)}
      <br />
      <SalePropCard
        uniqueGroup={uniqueGroup}
        options={dataJson.size}
        value={value}
        onOk={(val) => {
          console.log('onOk', val);
          setValue(val);
        }}
        onCancel={() => {
          message.info('click cancel');
        }}
      />
    </>
  );
};
