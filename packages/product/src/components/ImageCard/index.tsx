import { forwardRef, Ref, useImperativeHandle, useMemo } from 'react';
import { Dropdown, Form, FormItemProps, Image, MenuProps } from 'antd';
import { EyeOutlined, PictureOutlined } from '@ant-design/icons';
import { classNames, useMergedState } from '@web-rc/biz-utils';
import { useStyles } from './style';
import { FormProps } from 'antd';

type ImageCardProps = {
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: React.CSSProperties;
  /** 自定义样式前缀 */
  prefixCls?: string;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (value?: string) => void;
  menus?: MenuProps['items'];
  children?: (node: React.ReactNode) => React.ReactNode;
  status?: FormItemProps['validateStatus'];
};

type ImageCardRef = {
  setValue: (val?: string) => void;
};

const ImageCard = forwardRef<ImageCardRef, ImageCardProps>((props: ImageCardProps, ref: Ref<ImageCardRef>) => {
  const { status, className, style, placeholder, menus, children } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyles(props.prefixCls);
  const [imgUrl, setImgUrl] = useMergedState(undefined, {
    defaultValue: props?.defaultValue,
    value: props?.value,
    onChange: props?.onChange,
  });

  useImperativeHandle(ref, () => ({
    setValue(val?: string) {
      setImgUrl(val);
    },
  }));

  const _children = useMemo(() => {
    return imgUrl ? (
      <Dropdown menu={{ items: menus }} arrow={false} placement="bottom">
        <Image
          src={imgUrl}
          preview={{
            mask: (
              <div className={`${prefixCls}-mask-info`}>
                <EyeOutlined />
              </div>
            ),
          }}
          wrapperClassName={classNames(`${prefixCls}-content`, hashId)}
          className={classNames(`${prefixCls}-img`, hashId)}
        />
      </Dropdown>
    ) : (
      <div className={classNames(`${prefixCls}-placeholder`, hashId)}>
        <PictureOutlined className={classNames(`${prefixCls}-placeholder-icon`, hashId)} />
        {placeholder && <span className={classNames(`${prefixCls}-placeholder-text`, hashId)}>{placeholder}</span>}
      </div>
    );
  }, [imgUrl, menus]);

  return wrapSSR(
    <div style={style}
      className={classNames(`${prefixCls}-wrap`, className, {
        [`${prefixCls}-empty`]: !!!imgUrl,
        [`${prefixCls}-status-success`]: status === 'success',
        [`${prefixCls}-status-warning`]: status === 'warning',
        [`${prefixCls}-status-error`]: status === 'error',
        [`${prefixCls}-status-validating`]: status === 'validating',
      }, hashId)}
    >
      {children?.(_children) || _children}
    </div>,
  );
});

export type { ImageCardProps, ImageCardRef };
export default ImageCard;
