import { forwardRef, Ref, useEffect, useImperativeHandle, useState } from 'react';
import { Button, QRCode, QRCodeProps, Space, Spin, Typography } from 'antd';
import { useInterval } from '@web-rc/biz-utils';
import { useStyles } from './style';
import classNames from 'classnames';
import { CheckCircleFilled, CloseCircleFilled, ReloadOutlined } from '@ant-design/icons';

export type QRCodeValidateResult = {
  status: Exclude<QRCodeProps['status'], 'loading'>;
  isStop: boolean;
};
export type QRCodeLoginProps = Omit<QRCodeProps, 'value' | 'status' | 'onRefresh'> & {
  rootClassName?: string;
  className?: string;
  style?: React.CSSProperties;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  description?: React.ReactNode;
  onRefresh: () => Promise<string> | string;
  onValidate: () => Promise<QRCodeValidateResult> | QRCodeValidateResult;
};

export type QRCodeLoginRef = {};

const QRCodeLogin = forwardRef((props: QRCodeLoginProps, ref: Ref<QRCodeLoginRef>) => {
  const { rootClassName, title, subTitle, description, onRefresh, onValidate, statusRender, ...rest } = props || {};
  const { prefixCls, hashId, wrapSSR } = useStyles();
  const [value, setValue] = useState('loading...');
  const [status, setStatus] = useState<QRCodeProps['status']>('loading');

  const { start, stop } = useInterval(async () => {
    try {
      const { status, isStop } = await onValidate?.();
      setStatus(status);
      if (isStop) {
        stop();
      }
    } catch (error) {
      setStatus('expired');
      stop();
    }
  }, 1000);

  useEffect(() => {
    handleRefresh();
  }, []);

  useEffect(() => {
    if (status == 'active') {
      start();
    }
  }, [status]);

  const handleRefresh = async () => {
    setStatus('loading');
    try {
      const qrCodeText = await onRefresh?.();
      if (qrCodeText) {
        setValue(qrCodeText);
      }
      setStatus('active');
    } catch (error) {
      setStatus('expired');
    }
  };

  useImperativeHandle(ref, () => ({}));

  const customStatusRender: QRCodeProps['statusRender'] = (info) => {
    switch (info.status) {
      case 'expired':
        return (
          <div>
            <CloseCircleFilled style={{ color: 'red' }} /> {info.locale?.expired}
            <p>
              <Button type="link" onClick={info.onRefresh}>
                <ReloadOutlined /> {info.locale?.refresh}
              </Button>
            </p>
          </div>
        );
      case 'loading':
        return (
          <Space direction="vertical">
            <Spin />
            <p>Loading...</p>
          </Space>
        );
      case 'scanned':
        return (
          <div>
            <CheckCircleFilled style={{ color: 'green' }} /> {info.locale?.scanned}
          </div>
        );
      default:
        return null;
    }
  };

  return wrapSSR(
    <div className={classNames(`${prefixCls}`, rootClassName, hashId)}>
      {title && <Typography.Title level={4}>{title}</Typography.Title>}
      {subTitle && <Typography.Paragraph>{subTitle}</Typography.Paragraph>}
      <QRCode
        size={200}
        iconSize={200 / 4}
        errorLevel="H"
        icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
        value={value}
        status={status}
        onRefresh={handleRefresh}
        statusRender={statusRender || customStatusRender}
        {...rest}
      />
      {description && <Typography.Paragraph style={{ marginTop: '1em' }}>{description}</Typography.Paragraph>}
    </div>,
  );
});
export default QRCodeLogin;
