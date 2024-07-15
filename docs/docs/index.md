---
title: 快速开始
order: 1

nav:
  title: 文档
  path: /docs
---

## 安装

```shell
$ npm i @web-react/biz-components --save
```

## 在项目中使用

每一个包都是一个独立的组件包，使用示例如下 ：

```jsx
import React from 'react';
import { Foo } from '@web-react/biz-components';

export default () => {
  return (
    <Foo title="Hello react!" />
  );
};
```

我们所有的包都使用 CSS-in-JS 管理样式，只需引入 js 即可。
