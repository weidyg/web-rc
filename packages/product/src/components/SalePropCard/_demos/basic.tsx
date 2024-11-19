/**
 * title: 基本使用
 * description: 基本的选项卡片
 */

import { useState } from 'react';
import { SalePropCard } from '@web-rc/biz-components';
import { message, Switch, Typography } from 'antd';
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
        onOk={({ all, current, adds }) => {
          setValue(all);
          setCurrentValue(current);
        }}
        onCancel={() => {
          message.info('click cancel');
        }}
      />


      <Typography.Text title='当前值'>
        <pre>
          <code>{JSON.stringify(currentValue, null, 2)}</code>
        </pre>
      </Typography.Text>
      <Typography.Text title='所有值'>
        <pre>
          <code>{JSON.stringify(value, null, 2)}</code>
        </pre>
      </Typography.Text>
    </>
  );
};
