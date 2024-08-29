/**
 * title: 基本使用
 * description: 基本的销售属性输入组件
 */
import { useState } from "react";
import { Button } from "antd";
import { SalePropInput } from "@web-react/biz-components";
import dataJson from './_data.json';

export default () => {
  const [value, setValue] = useState({});
  return (
    <div style={{ margin: 20 }}>
      <SalePropInput
        uniqueGroup={false}
        options={dataJson.size}
        value={value}
        onChange={(value) => {
          setValue(value);
        }}
      />
    </div>
  );
};
