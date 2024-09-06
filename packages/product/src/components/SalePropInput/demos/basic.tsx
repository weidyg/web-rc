/**
 * title: 基本使用
 * description: 基本的销售属性输入组件
 */
import { useState } from "react";
import { Button, message, Typography } from "antd";
import { SalePropCard, SalePropInput, SalePropValueType, ValueType } from "@web-react/biz-components";
import dataJson from './_data.json';

// const single = !!current?.value;
export default () => {
  const [value, setValue] = useState<any>();

  return (
    <div style={{ margin: 20 }}>
      <SalePropInput
        allowCustom
        options={dataJson.size}
        value={value}
        onChange={(val) => {
          setValue(val);
          console.log('v, p', val);
        }}
      />
      <Typography>
        <pre>{JSON.stringify(value)}</pre>
      </Typography>
    </div>
  );
};
