import { ProConfigProvider } from '@ant-design/pro-components';
import { ImageSpace, } from '@web-react/biz-components';
import { FloatButton } from 'antd';
import { ThemeProvider } from 'antd-style';
import { useState } from 'react';
export default () => {
  const [themeMode, setThemeMode] = useState<any>('light');
  return (
    <>
      <FloatButton
        onClick={() => {
          setThemeMode(themeMode === 'light' ? 'dark' : 'light');
        }}
      >
        切换主题
      </FloatButton>
      <ThemeProvider themeMode={themeMode}>
        <ImageSpace />
      </ThemeProvider>
    </>
  );
};
