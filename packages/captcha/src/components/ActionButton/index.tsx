import { forwardRef, ReactNode, Ref, useImperativeHandle, useState } from 'react';
import { Button } from 'antd';
import { classNames } from '@web-rc/biz-utils';
import { useStyles } from './style';

export type ActionButtonProps = {
  title?: string;
  icon?: ReactNode;
  onClick?: () => void | Promise<void>;
  className?: string;
};

export type ActionButtonRef = {};

const ActionButton = forwardRef((props: ActionButtonProps, ref: Ref<ActionButtonRef>) => {
  const { title, icon, onClick, className } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyles();
  const [loading, setLoading] = useState(false);

  async function handleClick(): Promise<void> {
    try {
      if (loading) {
        return;
      }
      setLoading(true);
      await onClick?.();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  useImperativeHandle(ref, () => ({}));

  return wrapSSR(
    <Button
      title={title}
      type="text"
      size="small"
      loading={loading}
      icon={icon}
      onClick={handleClick}
      className={classNames(`${prefixCls}`, className, hashId)}
    />,
  );
});
export default ActionButton;
