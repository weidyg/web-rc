import { forwardRef, Ref, useImperativeHandle, useMemo } from 'react';
import { Dropdown, FormItemProps, Image, MenuProps } from 'antd';
import { EyeOutlined, PictureOutlined } from '@ant-design/icons';
import { classNames, useMergedState } from '@web-rc/biz-utils';
import { useStyles } from './style';

type ImageCardProps = {
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: React.CSSProperties;
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
  const { prefixCls, wrapSSR, hashId, token } = useStyles();
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
    if (imgUrl) {
      const dom = (
        <Image
          src={imgUrl}
          preview={{
            maskClassName: `${prefixCls}-mask`,
            mask: (
              <div className={`${prefixCls}-mask-info`}>
                <EyeOutlined />
              </div>
            ),
          }}
          wrapperClassName={classNames(`${prefixCls}-content`, hashId)}
          className={classNames(`${prefixCls}-img`, hashId)}
        />
      );
      return (menus?.length ?? 0) > 0 ? (
        <Dropdown menu={{ items: menus }} arrow={false} placement="bottom">
          {dom}
        </Dropdown>
      ) : (
        dom
      );
    }
    return (
      <div className={classNames(`${prefixCls}-placeholder`, hashId)}>
        <PictureOutlined className={classNames(`${prefixCls}-placeholder-icon`, hashId)} />
        {placeholder && <span className={classNames(`${prefixCls}-placeholder-text`, hashId)}>{placeholder}</span>}
      </div>
    );
  }, [imgUrl, menus]);

  return wrapSSR(
    <div
      style={style}
      className={classNames(
        `${prefixCls}-wrap`,
        className,
        {
          [`${prefixCls}-empty`]: !!!imgUrl,
          [`${prefixCls}-status-success`]: status === 'success',
          [`${prefixCls}-status-warning`]: status === 'warning',
          [`${prefixCls}-status-error`]: status === 'error',
          [`${prefixCls}-status-validating`]: status === 'validating',
        },
        hashId,
      )}
    >
      {children?.(_children) || _children}
    </div>,
  );
});

export type { ImageCardProps, ImageCardRef };
export default ImageCard;
