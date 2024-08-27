/**
 * title: 基本使用
 * description: 基本的图片输入组件
 */

import { useState } from "react";
import { ImageInput } from "@web-react/biz-components";
import { Button } from "antd";

export default () => {
  const [value, setValue] = useState<string>();
  return (
    <div style={{ margin: 20 }}>
      <Button onClick={() => setValue("https://img.alicdn.com/imgextra/i3/1035339340/O1CN01e6wCqc2IrmErsQuYd_!!1035339340.jpg_320x320q80_.webp")}>重置</Button>

      <ImageInput
        value={value}
        onChange={(value) => {
          setValue(value);
        }}
      />

      <ImageInput
        style={{ width: 90, height: 90 }}
        value={value}
        onChange={(value) => {
          setValue(value);
        }}
      />

      <ImageInput
        style={{ width: 90, height: 120 }}
        value={value}
        onChange={(value) => {
          setValue(value);
        }}
      />
    </div>
  );
};
