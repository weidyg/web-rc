import { DragEvent, useRef, ReactNode } from 'react';
import { Flex } from 'antd';
import { classNames } from '@web-rc/biz-utils';
import { useStyles } from './style';

type ImageItemProps = {
  prefixCls?: string;
  imgUrl: string;
  showNo?: { index: number };
  renderActions?: {
    edit: ReactNode;
    remove: ReactNode;
  };
};
const ImageItem = (props: ImageItemProps) => {
  const { imgUrl, showNo, renderActions, } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyles(props.prefixCls);

  return wrapSSR(
    <span className={classNames(`${prefixCls}`, hashId,)}>
      {showNo && <div className={classNames(`${prefixCls}-no`, hashId)}>{showNo?.index + 1}</div>}
      <img src={imgUrl} className={classNames(`${prefixCls}-img`, hashId)} />
      {renderActions && (
        <div className={classNames(`${prefixCls}-mask`, hashId)}>
          <Flex justify="space-evenly" style={{ width: '100%', padding: '4px 2px' }}>
            {renderActions.edit}
            {renderActions.remove}
          </Flex>
        </div>
      )}
    </span>,
  );
};

export type ImageItemDragProps = {
  prefixCls?: string;
  index: number;
  onDrag?: (index: number, droppedIndex: number) => void;
  children: ReactNode;
};
const ImageItemDrag = (props: ImageItemDragProps) => {
  const { index, onDrag, children } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyles(props.prefixCls);

  const handleDragStart = (e: DragEvent<HTMLSpanElement>) => {
    e.dataTransfer.setData('text/plain', index.toString());
    e.currentTarget.style.opacity = '0.5';
    e.currentTarget.style.transform = 'scale(1.05)';
    e.currentTarget.style.transition = 'transform 0.2s';
  };
  const handleDragOver = (e: DragEvent<HTMLSpanElement>) => {
    e.preventDefault();
    e.currentTarget.style.transform = 'scale(1.05)';
  };
  const handleDrop = (e: DragEvent<HTMLSpanElement>) => {
    const droppedIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    if (droppedIndex !== undefined) {
      onDrag?.(index, droppedIndex);
      e.currentTarget.style.opacity = '1';
      e.currentTarget.style.transform = 'scale(1)';
    }
  };
  const handleDropEnd = (e: DragEvent<HTMLSpanElement>) => {
    e.currentTarget.style.opacity = '1';
    e.currentTarget.style.transform = 'scale(1)';
  };
  const handleDropLeave = (e: DragEvent<HTMLSpanElement>) => {
    e.currentTarget.style.transform = 'scale(1)';
  };
  
  return wrapSSR(
    <span
      key={index}
      draggable={true}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnd={handleDropEnd}
      onDragLeave={handleDropLeave}
      style={{ cursor: 'move', transition: 'opacity 0.2s, transform 0.2s' }}
    >
      {children}
    </span>
  );
};

ImageItem.Drag = ImageItemDrag
export default ImageItem;
