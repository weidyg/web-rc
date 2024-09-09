import { useEffect, useMemo, useState } from 'react';
import { Dropdown, Image, MenuProps } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import { classNames, useMergedState } from '@web-react/biz-utils';
import { useStyle } from './style';
import { ImageSpace } from '@web-react/biz-components';


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
  content?: React.ReactNode | (() => React.ReactNode);
};

const ImageInput = (
  props: ImageInputProps
) => {
  const { className, style, placeholder, content } = props;
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

  // const EmptyImage = <div className={classNames(`${prefixCls}-placeholder`, hashId)}>
  //   <PictureOutlined className={classNames(`${prefixCls}-placeholder-icon`, hashId)} />
  //   {placeholder &&
  //     <span className={classNames(`${prefixCls}-placeholder-text`, hashId)}>{placeholder}</span>
  //   }
  // </div> 
   const [isOpen, setIsOpen] = useState(false);
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
        <ImageSpace.Popover
          destroyTooltipOnHide
          open={isOpen}
          onOpenChange={setIsOpen}
          // content={
          //   <ImageSelect
          //     mutiple={false}
          //     onOk={(files) => {
          //       const urls = files.map((file) => file.fullUrl!);
          //       if (urls?.length > 0) {
          //         onOk?.(urls[0]);
          //         setIsOpen(false);
          //       }
          //     }}
          //   />
          // }
        >
          <div className={classNames(`${prefixCls}-placeholder`, hashId)}>
            <PictureOutlined className={classNames(`${prefixCls}-placeholder-icon`, hashId)} />
            {placeholder &&
              <span className={classNames(`${prefixCls}-placeholder-text`, hashId)}>{placeholder}</span>
            }
          </div>
        </ImageSpace.Popover>
      )}
    </div>
  );
};


export type { ImageInputProps };
export default ImageInput;
