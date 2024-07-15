import { Button, ConfigProvider, Typography } from "antd";
import { useContext } from "react";
import { useStyle } from "./style";
import classNames from 'classnames';

type ImageSpaceProps = {
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: React.CSSProperties;

  children?: React.ReactNode;
  prefixCls?: string;
};

const ImageSpace: React.FC<ImageSpaceProps> = (props) => {
  const { children, style, className } = props;

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = `${props.prefixCls || getPrefixCls('biz')}-image-space`;
  const { wrapSSR, hashId } = useStyle(prefixCls);

  return wrapSSR(
    <div className={classNames(`${prefixCls}-container`, hashId)}>
      <div className={classNames(`${prefixCls}-header`, hashId)}>
        header
      </div>
      <div className={classNames(`${prefixCls}-body`, hashId)}>
        body
      </div>
      <div className={classNames(`${prefixCls}-footer`, hashId)}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography.Link target="_blank" style={{ marginLeft: '18px' }}>进入图片空间</Typography.Link>
        </div>
        <div style={{ width: 'calc(100% - 460px)' }}></div>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
          <Button type='primary' className={classNames(`${prefixCls}-footer-selectOk`, hashId)}>确定</Button>
        </div>
      </div>
    </div>
  );
};

export type { ImageSpaceProps };
export default ImageSpace;
