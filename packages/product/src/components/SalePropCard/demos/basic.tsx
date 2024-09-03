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
  const [currentValue, setCurrentValue] = useState<any>({ "value": "28313", "groupValue": "27013-men_tops" });
  const [value, setValue] = useState<any>([
    { "value": "28334" }
  ]);
  return (
    <>
      <Switch value={uniqueGroup} onChange={(val) => setUniqueGroup(val)} />
      <br />
      {JSON.stringify(currentValue)}
      <br />
      {JSON.stringify(value)}
      <br />
      <SalePropCard
        current={currentValue}
        uniqueGroup={uniqueGroup}
        options={dataJson.color}
        value={value}
        onOk={(val, newVal) => {
          console.log('onOk', val);
          setValue(val);
          if (newVal?.length ?? 0 > 0) {
            setCurrentValue(newVal?.[0]);
          }
        }}
        onCancel={() => {
          message.info('click cancel');
        }}
      />
    </>
  );
};
