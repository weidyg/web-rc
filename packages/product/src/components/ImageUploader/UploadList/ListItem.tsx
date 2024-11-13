import { classNames, convertByteUnit } from '@web-rc/biz-utils';
import { useStyles } from './style';
import { Progress, Typography } from 'antd';

const ListItem = (props: any) => {
  const { name, url, thumbUrl, size, crossOrigin, percent = 0, status, error } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyles();

  let _percent = parseFloat(
    (status === 'uploading' && percent >= 100 ? 99 : status === 'error' ? 100 : percent).toFixed(2),
  );
  return wrapSSR(
    <div className={classNames(`${prefixCls}-item`, hashId)}>
      <div className={classNames(`${prefixCls}-item-img`, hashId)}>
        <img src={thumbUrl || url} crossOrigin={crossOrigin} className={`${prefixCls}-list-item-image`} />
      </div>
      <div className={classNames(`${prefixCls}-item-name`, hashId)}>
        <Typography.Text ellipsis={{ tooltip: name }}>{name}</Typography.Text>
        <div className={classNames(`${prefixCls}-item-desc`, hashId)}>{convertByteUnit(size || 0)}</div>
      </div>
      <div className={classNames(`${prefixCls}-item-state`, hashId)}>
        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          <Progress size={'small'} percent={_percent} status={status === 'error' ? 'exception' : undefined} />
          {status === 'error' && (
            <Typography.Paragraph
              ellipsis={{ tooltip: error?.message, symbol: '...' }}
              style={{ margin: 0 }}
              className={classNames(`${prefixCls}-item-desc`, hashId)}
            >
              <span dangerouslySetInnerHTML={{ __html: error?.message || '上传失败' }} />
            </Typography.Paragraph>
          )}
        </div>
      </div>
    </div>,
  );
};

export default ListItem;
