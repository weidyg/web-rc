import { DragEvent, useRef, ReactNode } from 'react';
import { Flex } from 'antd';
import { classNames } from '@web-react/biz-utils';
import { useStyle } from "./style";


type ImageItemProps = {
    prefixCls?: string;
    imgUrl: string;
    index: number;
    showNo?: boolean;
    draggable?: boolean;
    onDragEnd?: (droppedIndex: number) => void;
    renderActions?: {
        edit: ReactNode;
        remove: ReactNode;
    };
}
const ImageItem = (props: ImageItemProps) => {
    const { index, imgUrl, showNo, draggable, onDragEnd, renderActions } = props;
    const { prefixCls, wrapSSR, hashId, token } = useStyle(props.prefixCls);
    const animateWrap = useRef<HTMLSpanElement>(null);

    const handleDragStart = (ev: DragEvent<HTMLSpanElement>) => {
        ev.dataTransfer.effectAllowed = "move";
        ev.dataTransfer.setData('index', `${index}`);
    };
    const handleDragOver = (ev: DragEvent<HTMLSpanElement>) => {
        ev.preventDefault();
        ev.stopPropagation();
    };
    const handleDrop = (ev: DragEvent<HTMLSpanElement>) => {
        ev.dataTransfer.dropEffect = "move";
        const droppedIndex = ev.dataTransfer.getData('index') as any;
        if (droppedIndex !== undefined) {
            onDragEnd?.(droppedIndex);
        }
    };
    return wrapSSR(
        <span
            ref={animateWrap}
            draggable={draggable}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
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
                draggable={draggable}
                className={classNames(`${prefixCls}-img`, hashId)}
            />
            {renderActions && (
                <div className={classNames(`${prefixCls}-mask`, hashId)}>
                    <Flex justify="space-evenly" style={{ width: "100%", padding: "4px 2px" }}>
                        {renderActions.edit}
                        {renderActions.remove}
                    </Flex>
                </div>
            )}
        </span>
    );
}
export default ImageItem;
