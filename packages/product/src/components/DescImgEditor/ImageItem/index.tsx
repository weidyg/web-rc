import React, { DragEvent, useRef, ReactNode } from 'react';
import { Flex } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { classNames } from '@web-react/biz-utils';
import { useStyle } from "./style";


type ImageItemProps = {
    prefixCls?: string;
    imgUrl: string;
    index: number;
    showNo?: boolean;
    draggable?: boolean;
    onEdit?: () => Promise<void> | void;
    onRemove?: () => Promise<void> | void;
    onDragEnd?: (droppedIndex: number) => void;
    renderActions?: (actions: {
        remove: ReactNode;
        edit: ReactNode;
    }) => ReactNode[];
}
const ImageItem = (props: ImageItemProps) => {
    const { index, imgUrl, showNo, draggable, onDragEnd, onRemove, onEdit, renderActions } = props;
    const { prefixCls, wrapSSR, hashId, token } = useStyle(props.prefixCls);
    const animateWrap = useRef<HTMLSpanElement>(null);

    const handleDragStart = (e: DragEvent<HTMLSpanElement>, index: number) => {
        e.dataTransfer.setData('index', `${index}`);
    };
    const handleDragOver = (e: DragEvent<HTMLSpanElement>, index: number) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'move';
    };
    const handleDrop = (e: DragEvent<HTMLSpanElement>, index: number) => {
        const droppedIndex = e.dataTransfer.getData('index') as any;
        if (droppedIndex !== undefined) {
            onDragEnd?.(droppedIndex);
        }
    };

    function handleRemove() {
        if (onRemove) {
            animateWrap?.current?.classList?.add(`down-out`);
            setTimeout(() => { onRemove?.(); }, 200);
        }
    }

    const actions = {
        remove: <DeleteOutlined style={{ cursor: 'pointer' }} onClick={handleRemove} />,
        edit: <EditOutlined style={{ cursor: 'pointer' }} onClick={onEdit} />
    }
    return wrapSSR(
        <span
            ref={animateWrap}
            key={index}
            draggable={draggable}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            className={classNames(`${prefixCls}`, {
                [`${prefixCls}-drag`]: draggable
            }, hashId)}
        >
            {showNo && (
                <div className={classNames(`${prefixCls}-no`, hashId)}>
                    {index + 1}
                </div>
            )}
            <img
                src={imgUrl}
                className={classNames(`${prefixCls}-img`, hashId)}
            />
            <div className={classNames(`${prefixCls}-mask`, hashId)}>
                <Flex justify="space-evenly" style={{ width: "100%", padding: "4px 2px" }}>
                    {renderActions?.(actions) || [actions.edit, actions.remove]}
                </Flex>
            </div>
        </span>
    );
}
export default ImageItem;
