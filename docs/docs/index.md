---
title: 快速开始
order: 1

nav:
  title: 文档
  path: /docs
---

## 安装

Using npm:

```bash
npm install --save @web-rc/biz-components
```

or using yarn:

```bash
$ yarn add @web-rc/biz-components
```

or using pnpm:

```bash
 pnpm add @web-rc/biz-components
```

## 在项目中使用

每一个包都是一个独立的组件包，使用示例如下 ：

<!-- | pure -->

```jsx
import React from 'react';
import { ImageCard } from '@web-rc/biz-components';

export default () => {
  return <ImageCard />;
};
```

直接引入

```html
<script src="https://unpkg.com/react@latest/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@latest/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@web-rc/biz-components@latest/dist/biz-components.min.js"></script>
<div id="root"></div>
<script type="text/javascript">
  const { ImageCard } = BizComponents;
  const imageCardDom = React.createElement(ImageCard, {
    style: { width: 90, height: 90 },
  });
  const domNode = document.getElementById('root');
  const root = ReactDOM.createRoot(domNode);
  root.render(imageCardDom);
</script>
```
