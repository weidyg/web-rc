import { forwardRef, Ref, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { Dropdown, Image, MenuProps } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import { classNames, useMergedState } from '@web-react/biz-utils';
import { useStyle } from './style';
import { ImageSpace, ImageSpaceProps } from '@web-react/biz-components';


type ImageInputProps = {
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
  emptyRender?: (originNode: React.ReactNode) => React.ReactNode;
  imageSpaceProps?: Omit<ImageSpaceProps, 'mutiple'>;
};
type ImageInputRef = {

}

const ImageInput = forwardRef<ImageInputRef, ImageInputProps>((
  props: ImageInputProps,
  ref: Ref<ImageInputRef>
) => {
  const { className, style, placeholder, menus, emptyRender, imageSpaceProps } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyle(props.prefixCls);
  const [imgUrl, setImgUrl] = useMergedState(undefined, {
    defaultValue: props?.defaultValue,
    value: props?.value,
    onChange: props?.onChange
  });

  useImperativeHandle(ref, () => ({
    
  }));

  const emptyImage = () => {
    return (
      <div className={classNames(`${prefixCls}-placeholder`, hashId)}>
        <PictureOutlined className={classNames(`${prefixCls}-placeholder-icon`, hashId)} />
        {placeholder &&
          <span className={classNames(`${prefixCls}-placeholder-text`, hashId)}>{placeholder}</span>
        }
      </div>
    );
  };

  const [isOpen, setIsOpen] = useState(false);
  return wrapSSR(
    <div style={style} className={classNames(`${prefixCls}-wrap`,
      className, { [`${prefixCls}-empty`]: !!!imgUrl }, hashId)
    }>
      {imgUrl ? (
        <Dropdown menu={{ items: menus }} arrow={false} placement='bottomCenter'>
          <Image src={imgUrl} preview={{ mask: false }}
            wrapperClassName={classNames(`${prefixCls}-content`, hashId)}
            className={classNames(`${prefixCls}-img`, hashId)}
          />
        </Dropdown>
      ) : (
        <ImageSpace.Popover
          open={isOpen}
          onOpenChange={setIsOpen}
          content={
            <ImageSpace
              style={{ width: '880px', height: '600px', }}
              mutiple={false}
              {...imageSpaceProps}
              onChange={(ids, files) => {
                // const urls = files.map((file) => file.fullUrl!);
                // if (urls?.length > 0) {
                //   setImgUrl(urls[0]);
                //   setIsOpen(false);
                // }
              }}
            />
          }
        >
          {emptyImage()}
        </ImageSpace.Popover>
      )}
    </div >
  );
});

export type { ImageInputProps };
export default ImageInput;
