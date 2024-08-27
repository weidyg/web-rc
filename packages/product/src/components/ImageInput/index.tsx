import { useEffect, useMemo, useState } from 'react';
import { Alert, Button, Card, Checkbox, Dropdown, Flex, Image, Input, Menu, MenuProps, Modal, Space, Switch, Typography } from 'antd';
import { PictureOutlined, SearchOutlined } from '@ant-design/icons';
import { classNames, useMergedState } from '@web-react/biz-utils';
import { useStyle } from './style';

type ImageInputProps = {
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: React.CSSProperties;
  /** 自定义样式前缀 */
  prefixCls?: string;

  defaultValue?: string;
  value?: string;
  onChange?: (value?: string) => void;
};

const ImageInput = (
  props: ImageInputProps
) => {
  const { className, style } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyle(props.prefixCls);
  const [imgUrl, setImgUrl] = useMergedState(undefined, {
    defaultValue: props?.defaultValue,
    value: props?.value,
    onChange: props?.onChange
  });

  const items: MenuProps['items'] = [
    {
      key: '1', label: '替换', onClick: () => {

      }
    },
    {
      key: '2', label: '删除', onClick: () => {
        setImgUrl(undefined);
      }
    },
    {
      key: '3', label: '裁剪', onClick: () => {

      }
    },
  ];

  return wrapSSR(
    <div style={style} className={classNames(`${prefixCls}-wrap`,
      className, { [`${prefixCls}-empty`]: !!!imgUrl }, hashId)
    }>
      {imgUrl ? (
        <Dropdown menu={{ items }} arrow={false} placement='bottomCenter'>
          <Image src={imgUrl} preview={{ mask: false }}
            wrapperClassName={classNames(`${prefixCls}-content`, hashId)}
            className={classNames(`${prefixCls}-img`, hashId)}
          />
        </Dropdown>
      ) : (
        <div className={classNames(`${prefixCls}-placeholder`, hashId)}>
          <PictureOutlined className={classNames(`${prefixCls}-placeholder-icon`, hashId)} />
          <span className={classNames(`${prefixCls}-placeholder-text`, hashId)}>上传图片</span>
        </div>
      )}
    </div>
  );
};

export type { ImageInputProps };
export default ImageInput;
