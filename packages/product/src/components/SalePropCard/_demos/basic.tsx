import { useState } from 'react';
import { SalePropCard } from '@web-rc/biz-components';
import { Flex, message, Segmented, Space, Switch, Typography } from 'antd';
import dataJson from './_data.json';

export default () => {
  const [uniqueGroup, setUniqueGroup] = useState<boolean>(false);
  const [isSize, setIsSize] = useState<boolean>(false);
  const [isGroup, setIsGroup] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<any>();
  const [value, setValue] = useState<any>([]);
  const { size, color } = dataJson;
  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Segmented<string>
          options={['颜色', '尺码']}
          onChange={(value) => {
            setIsSize(value == '尺码' ? true : false);
          }}
        />
        {isSize ? (
          <Switch
            value={uniqueGroup}
            checkedChildren="唯一组"
            unCheckedChildren="可重复组"
            onChange={(val) => {
              setUniqueGroup(val);
              setCurrentValue(undefined);
              setValue([]);
            }}
          />
        ) : (
          <Switch
            value={isGroup}
            checkedChildren="分组"
            unCheckedChildren="不分组"
            onChange={(val) => {
              setIsGroup(val);
            }}
          />
        )}
      </Space>

      <SalePropCard
        single={!!currentValue?.value}
        current={currentValue}
        uniqueGroup={uniqueGroup}
        options={isSize ? size : isGroup ? color : color.flatMap(f => f.children)}
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
      <Typography.Title level={5}>
        <Flex gap={8}>
          <span>当前值</span>
          <Typography.Link
            onClick={() => {
              setUniqueGroup(false);
              setCurrentValue(undefined);
              setValue([]);
            }}
          >
            清除
          </Typography.Link>
        </Flex>
      </Typography.Title>
      <Typography.Text>
        <pre>
          <code>{JSON.stringify(currentValue || {}, null, 2)}</code>
        </pre>
      </Typography.Text>
      <Typography.Title level={5}>所有值</Typography.Title>
      <Typography.Text>
        <pre>
          <code>{JSON.stringify(value, null, 2)}</code>
        </pre>
      </Typography.Text>
    </>
  );
};
