import { Key, useEffect, useState } from 'react';
import { Checkbox, Image, message, Radio } from 'antd';
import { CheckOutlined, CopyOutlined, ExpandOutlined, LoadingOutlined } from '@ant-design/icons';
import { classNames, TransButton, useCopyClick, useMergedState } from '@web-react/biz-utils';
import { useStyle } from './style';

const refImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAD50lEQVR4AdXBQWhbBRzH8e/vvbdlfQtdk8rqdtCB2kmj60mUrDAQhhdRd5DtNHSgB+nFOteDGzRgcR1lXupFsQe32w7bQRBFEKR2F0WdW5Fphe0yO21Su/Q16ZL8DVsYJdj0JU3a+vmIBsyZxUoBSUQfRg8Qx4iZiAFx7kvLyCAyQBoxhTHh+Ex2SBnqJELKmnXlA/plvIJImCEaIGEY10xciviMRaUZQhCrmM9Zd6HIceCoGRGaSeQE5zyX0fZtuk4NoobZwAZkjJjh0UISBRODnb7OsgLxH8wsmg4Yx3iV9SQuxH2OScpSxaWKmUUzC3wHPM/6S+Tu8uLp4aHzqVRqiWUcqqQDxg32sUEM9qUDxqnissxsYAMYb7PxEoMnh+6cGU5dpsKhYj5ne2WMsEnIGJnPWTcVDhWFIu+Y4dFii0tw9SZcvQm3/2FFZniFIsepEGVZs66lgBtmRFjBVz/Dlz/RkN49cPQA91y/BSfOcc+R/XBkPysTuYjPnqg041GWD+jHiFBDOgvTMzTk4RiNMbblA/qBUx5lMg4ZtXVGoXsXoRVLMD3Dmsk4BJzy5sxipYAejJoO9sLBXkLL3YUjH7J2omfOLOaUApJmiE3KDJUCkg6ijxYoFGge0edh9BDCD3/A99OEduMvHmjbwtoYPR4QJ4TfbsEXP9KQ3kdZq7iHEaNFom3w7GPw3F7Wxoh5JuIYdfn0LdjRxqo8l6YwEfeAGHXyBJ7Leoo5/E94QBrYTR3OfQtbtxDa3l1wIMFapD0ZGYPd1OHrX6jL0tNwIEHDZGQ8RAZjVRK4DnUplmgOkfGANCEcTsLhJKHNLcBrH9EsaQcxxWYnphyMCTY7Y8JxfCYljCbL36UpJMzxmfQ6pEw6a1NAghDGv4GFRVb1+20eaPdpnHGtQ8p4lJm4iJEghMlf4e871OXxLhpm4hJlDmURnzGJPCG4DjgCR+AIHIEjcASOwBE4AteBh9rhpWcg+SSNEbmIzxhloiK9YB+b8QYttrgE039yz84dsHMHK5L4JL5db1LmUeG5jBaKvG6GRwu1bYWnHmFVEgXPZZQKl4oP3k/Nnjg5tIDxApuBw7uxNn1OhcsyZ4ZTlwffG0oACTaSuNC5XQMs41Al7nNMcIUNIrgS9zlGFZcqqVRq6fTw0PnFAk8ACdaTuBDfzsuSslQRNcwGNiBjxAyPFpIomBjs9HWWFYhVzOesu1DkOHDUjAhNJJEHPvNcRtu36To1iJCyZl35gH4ZhxA9ZogGSBjGlImLEZ+xqDRDCKIBc2axUkAS0YfRA8QxYibiQIz7MjLSiAyQRkxhTDg+kx1Shjr9C2nCYhQQxQX2AAAAAElFTkSuQmCC';

type PicCardProps = {
    prefixCls?: string;
    defaultChecked?: boolean;
    checked?: boolean;
    onChange?: (value: boolean, prevValue: boolean) => void;

    id?: Key;
    name?: string;
    pixel?: string;
    fullUrl?: string;
    isRef?: boolean;
    onAiEdit?: (id?: Key, fullUrl?: string) => void | Promise<void>;
};
const InternalPicCard: React.FC<PicCardProps> = (props) => {
    const { id, name, fullUrl = '', pixel, isRef, onAiEdit } = props;
    const { prefixCls, wrapSSR, hashId } = useStyle(props?.prefixCls);
    const [preview, setPreview] = useState(false);
    const { copied, copyLoading, onClick: onCopyClick } = useCopyClick({ copyConfig: { text: fullUrl } });
    useEffect(() => {
        if (copied) {
            message.success('复制成功');
        }
    }, [copied]);
    const [checked, setChecked] = useMergedState<boolean>(false, {
        defaultValue: props?.defaultChecked,
        value: props?.checked,
        onChange: props?.onChange,
    });
    return wrapSSR(
        <div className={classNames(`${prefixCls}`, hashId)}>
            <div className={classNames(`${prefixCls}-background`, hashId)}>
                <label>
                    <div className={classNames(`${prefixCls}-imgBox`, hashId)}>
                        <Image
                            src={fullUrl}
                            // fallback={errImage}
                            preview={{
                                visible: preview,
                                maskStyle: { backgroundColor: 'rgba(0, 0, 0, 0.65)' },
                                src: fullUrl,
                                mask: undefined,
                                onVisibleChange: (value: boolean, prevValue: boolean) => {
                                    if (value == false && prevValue == true) {
                                        setPreview(value);
                                    }
                                },
                            }}
                        />
                        {fullUrl && onAiEdit && (
                            <span
                                className={classNames(`${prefixCls}-ai-entry`, hashId)}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onAiEdit?.(id, fullUrl);
                                }}
                            >
                                AI图片编辑
                            </span>
                        )}
                    </div>
                    {fullUrl && (
                        <>
                            <Checkbox
                                checked={checked}
                                onChange={(e) => {
                                    setChecked(e.target.checked);
                                }}
                                className={classNames(`${prefixCls}-checkbox`, hashId, {
                                    ['checked']: checked,
                                })}
                            />
                            <div
                                className={classNames(`${prefixCls}-controlWrap`, hashId)}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                            >
                                {pixel && <span className={classNames(`${prefixCls}-spec`, hashId)}>{pixel}</span>}
                                <TransButton
                                    style={{ display: 'none' }}
                                    className={classNames(`${prefixCls}-copy`, hashId)}
                                    onClick={onCopyClick}
                                >
                                    {copied ? <CheckOutlined /> : copyLoading ? <LoadingOutlined /> : <CopyOutlined />}
                                </TransButton>
                                <ExpandOutlined
                                    className={classNames(`${prefixCls}-fullView`, hashId)}
                                    onClick={() => {
                                        setPreview(true);
                                    }}
                                />
                            </div>
                        </>
                    )}
                </label>
                <div className={classNames(`${prefixCls}-title-wrap`, hashId)}>
                    {isRef && (
                        <div className={classNames(`${prefixCls}-title-svg`, hashId)}>
                            <img src={refImage} alt="引用图片" style={{ width: '100%', height: '100%' }} />
                        </div>
                    )}
                    <div className={classNames(`${prefixCls}-title-tip`, hashId)}>
                        <span title={name}>{name}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const EmptyPicCard = (props: { prefixCls?: string }) => {
    const { prefixCls, wrapSSR, hashId } = useStyle(props?.prefixCls);
    return wrapSSR(
        <i className={classNames(`${prefixCls}-picCard`, `${prefixCls}-picCard-empty`, hashId)} />
    );
};

type CompoundedComponent = typeof InternalPicCard & {
    Empty: typeof EmptyPicCard;
};
const PicCard = InternalPicCard as CompoundedComponent;
PicCard.Empty = EmptyPicCard;
export default PicCard;
export type { PicCardProps };