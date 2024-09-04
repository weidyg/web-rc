/**
 * title: 销售属性卡片
 * description: 基本的销售属性卡片
 */
import { useState } from 'react';
import { message, Switch, Typography } from 'antd';
import { SalePropCard, } from '@web-react/biz-components';
import dataJson from './_data.json';
export default () => {
  const [uniqueGroup, setUniqueGroup] = useState<boolean>(true);
  const [currentValue, setCurrentValue] = useState<any>();
  const [value, setValue] = useState<any>([]);
  return (
    <>
      <Switch value={uniqueGroup}
        onChange={(val) => {
          setUniqueGroup(val);
          setCurrentValue(undefined);
          setValue([]);
        }} />
      <SalePropCard
        single={!!currentValue?.value}
        current={currentValue}
        uniqueGroup={uniqueGroup}
        options={uniqueGroup
          ? dataJson.size
          : dataJson.color
        }
        value={value}
        onOk={(val, newVal) => {
          console.log('onOk', val, newVal);
          setValue(val);
          if (newVal?.length ?? 0 > 0) {
            setCurrentValue(newVal?.[0]);
          }
        }}
        onCancel={() => {
          message.info('click cancel');
        }}
      />
      <br />
      <Typography.Text title='当前值' code>
        {JSON.stringify(currentValue)}
      </Typography.Text>
      <br />
      <Typography.Text title='所有值'  code >
        {JSON.stringify(value)}
      </Typography.Text>
    </>
  );
};
