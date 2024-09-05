/**
 * title: 基本使用
 * description: 基本的销售属性输入组件
 */
import { useState } from "react";
import { Button, message } from "antd";
import { SalePropCard, SalePropInput, SalePropValueType, ValueType } from "@web-react/biz-components";
import dataJson from './_data.json';

// const single = !!current?.value;
export default () => {
  const [value, setValue] = useState<SalePropValueType>();
  const [uniqueGroup, setUniqueGroup] = useState<boolean>(true);
  
  return (
    <div style={{ margin: 20 }}>
      <SalePropInput
        uniqueGroup={uniqueGroup}
        options={dataJson.size}
        value={value}
        onChange={(value) => {
          setValue(value);
        }}
      />
    </div>
  );
};
