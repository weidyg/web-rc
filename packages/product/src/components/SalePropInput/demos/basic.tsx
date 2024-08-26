/**
 * title: 基本使用
 * description: 基本的销售属性输入组件
 */

import { SalePropInput } from "@web-react/biz-components";
import { Button } from "antd";
import { useState } from "react";

export default () => {
  const [value, setValue] = useState({});
  return (
    <div style={{ margin: 20 }}>
      <Button onClick={() => setValue({
        img: "https://img.alicdn.com/imgextra/i3/1035339340/O1CN01e6wCqc2IrmErsQuYd_!!1035339340.jpg_320x320q80_.webp",
        text: "红色",
        value: "red",
        remark: '',
      })}>重置</Button>
      {JSON.stringify(value)}
      <br />
      <SalePropInput
        value={value}
        onChange={(value) => {
          setValue(value);
        }}
      />
    </div>
  );
};
