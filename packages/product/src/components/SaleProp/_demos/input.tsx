/**
 * title: 基本使用
 * description: 基本的销售属性输入组件
 */
import { useState } from "react";
import { Space, Switch, Typography } from "antd";
import dataJson from './_data.json';
import { SaleProp, SalePropValueType } from "@web-react/biz-components";

export default () => {
  const [allowCustom, setAllowCustom] = useState<boolean>(false);
  const [value, setValue] = useState<SalePropValueType>();
  return (
    <div style={{ margin: 20, maxWidth: 600 }} >
      <Space align="center" style={{ marginBottom: 16 }}>
        允许自定义: <Switch checked={allowCustom} onChange={setAllowCustom} />
      </Space>
      <div>
        <SaleProp.Input
          allowCustom={allowCustom}
          options={dataJson.size}
          value={value}
          onChange={(val) => {
            setValue(val);
          }}
        />
      </div>
      <Typography>
        <pre>{JSON.stringify(value)}</pre>
      </Typography>
    </div>
  );
};
