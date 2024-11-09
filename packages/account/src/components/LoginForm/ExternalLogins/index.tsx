import { CSSProperties, ReactNode, useMemo, useState } from 'react';
import { Avatar, Divider, Popover, Space, Spin } from 'antd';
import { useStyles } from './style';
import classNames from 'classnames';
import { LoadingOutlined } from '@ant-design/icons';

const DefaultIcon = ({
  text,
  icon,
  size = 36,
  style,
  className,
}: {
  size?: number | undefined;
  text?: string;
  icon?: React.ReactNode;
  style?: CSSProperties;
  className?: string;
}) => {
  return (
    <Avatar
      size={size}
      icon={icon}
      style={{
        cursor: 'pointer',
        userSelect: 'none',
        ...style,
      }}
      className={className}
    >
      {text}
    </Avatar>
  );
};

const ActionItem = (
  props: ThirdPartyLogin & {
    className?: string;
    onClick?: (key: string) => Promise<void> | void;
  },
) => {
  const { className, style, value, title, icon, onClick } = props;
  const [loading, setLoading] = useState(false);
  const handleClick = async (key?: string) => {
    if (!key) {
      return;
    }
    try {
      setLoading(true);
      await onClick?.(key);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <Spin size="small" spinning={loading} indicator={<LoadingOutlined spin />}>
      <div title={title} onClick={() => handleClick(value)} className={className}>
        <DefaultIcon icon={icon} text={title} style={style} />
      </div>
    </Spin>
  );
};

export type ThirdPartyLogin = {
  title: string;
  value?: string;
  icon?: ReactNode;
  style?: CSSProperties;
};
export type ExternalLoginsProps = {
  maxCount?: number;
  items?: ThirdPartyLogin[];
  onClick?: (key: string) => Promise<void> | void;
};
const ExternalLogins = (props: ExternalLoginsProps) => {
  const { maxCount = 4, items = [], onClick } = props;
  const { prefixCls, hashId, token, wrapSSR } = useStyles();
  const { show, more } = useMemo(() => {
    const all = items || [];
    const allCount = all?.length || 0;
    const hasMore = maxCount >= 0 && allCount > maxCount;
    const show = hasMore ? all?.slice(0, maxCount) : all;
    const more = hasMore ? all?.slice(maxCount) : [];
    return { show, more };
  }, [items, maxCount]);

  return wrapSSR(
    <>
      {items.length > 0 && (
        <div className={classNames(`${prefixCls}`, hashId)}>
          <Divider plain style={{ margin: 0 }}>
            <span className={classNames(`${prefixCls}-title`, hashId)}>第三方登录</span>
          </Divider>
          <Space align="center" style={{ margin: `${token.marginXS}px 0 ${token.marginSM}px` }}>
            {show?.map((item, index: number) => (
              <ActionItem key={index} onClick={onClick} {...item} className={classNames(`${prefixCls}-item`, hashId)} />
            ))}
            {more?.length > 0 && (
              <Popover
                content={
                  <Space>
                    {more?.map((item, index: number) => (
                      <ActionItem
                        key={index}
                        onClick={onClick}
                        {...item}
                        className={classNames(`${prefixCls}-item`, hashId)}
                      />
                    ))}
                  </Space>
                }
              >
                <div className={classNames(`${prefixCls}-item`, hashId)}>
                  <DefaultIcon text={`+${more?.length}`} className={classNames(`${prefixCls}-more`, hashId)} />
                </div>
              </Popover>
            )}
          </Space>
        </div>
      )}
    </>,
  );
};
export default ExternalLogins;
