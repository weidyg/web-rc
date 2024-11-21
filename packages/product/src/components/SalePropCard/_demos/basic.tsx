/**
 * title: 基本使用
 * description: 基本的选项卡片
 */

import { useState } from 'react';
import { SalePropCard } from '@web-rc/biz-components';
import { message, Segmented, Space, Switch, Typography } from 'antd';
import dataJson from './_data.json';

export default () => {
  const [uniqueGroup, setUniqueGroup] = useState<boolean>(false);
  const [isSize, setIsSize] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<any>();
  const [value, setValue] = useState<any>([]);
  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Segmented<string>
          options={['颜色', '尺码']}
          onChange={(value) => {
            setIsSize(value == '尺码' ? true : false);
          }}
        />
        {isSize && <Switch
          value={uniqueGroup}
          checkedChildren="唯一组"
          unCheckedChildren="可重复组"
          onChange={(val) => {
            setUniqueGroup(val);
            setCurrentValue(undefined);
            setValue([]);
          }}
        />}
      </Space>

      <SalePropCard
        single={!!currentValue?.value}
        current={currentValue}
        uniqueGroup={uniqueGroup}
        options={isSize ? dataJson.size : dataJson.color}
        value={value}
        onOk={({ all, current, adds }) => {
          setValue(all);
          setCurrentValue(current);
        }}
        onCancel={() => {
          message.info('click cancel');
        }}
        style={{ maxWidth: 580, maxHeight: 400 }}
      />

      <Typography.Text title="当前值">
        <pre>
          <code>{JSON.stringify(currentValue, null, 2)}</code>
        </pre>
      </Typography.Text>
      <Typography.Text title="所有值">
        <pre>
          <code>{JSON.stringify(value, null, 2)}</code>
        </pre>
      </Typography.Text>
    </>
  );
};
