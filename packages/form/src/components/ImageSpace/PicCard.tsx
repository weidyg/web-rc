import { Checkbox, Image, message } from "antd";
import { CheckOutlined, CopyOutlined, ExpandOutlined, LoadingOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { useStyle } from "./style";
import { useEffect, useState } from "react";
import useCopyClick from 'antd/es/typography/hooks/useCopyClick';
import TransButton from 'antd/es/_util/transButton';
import useMergedState from 'rc-util/lib/hooks/useMergedState';

const errImage = "data:image/png;base64,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"
const refImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAD50lEQVR4AdXBQWhbBRzH8e/vvbdlfQtdk8rqdtCB2kmj60mUrDAQhhdRd5DtNHSgB+nFOteDGzRgcR1lXupFsQe32w7bQRBFEKR2F0WdW5Fphe0yO21Su/Q16ZL8DVsYJdj0JU3a+vmIBsyZxUoBSUQfRg8Qx4iZiAFx7kvLyCAyQBoxhTHh+Ex2SBnqJELKmnXlA/plvIJImCEaIGEY10xciviMRaUZQhCrmM9Zd6HIceCoGRGaSeQE5zyX0fZtuk4NoobZwAZkjJjh0UISBRODnb7OsgLxH8wsmg4Yx3iV9SQuxH2OScpSxaWKmUUzC3wHPM/6S+Tu8uLp4aHzqVRqiWUcqqQDxg32sUEM9qUDxqnissxsYAMYb7PxEoMnh+6cGU5dpsKhYj5ne2WMsEnIGJnPWTcVDhWFIu+Y4dFii0tw9SZcvQm3/2FFZniFIsepEGVZs66lgBtmRFjBVz/Dlz/RkN49cPQA91y/BSfOcc+R/XBkPysTuYjPnqg041GWD+jHiFBDOgvTMzTk4RiNMbblA/qBUx5lMg4ZtXVGoXsXoRVLMD3Dmsk4BJzy5sxipYAejJoO9sLBXkLL3YUjH7J2omfOLOaUApJmiE3KDJUCkg6ijxYoFGge0edh9BDCD3/A99OEduMvHmjbwtoYPR4QJ4TfbsEXP9KQ3kdZq7iHEaNFom3w7GPw3F7Wxoh5JuIYdfn0LdjRxqo8l6YwEfeAGHXyBJ7Leoo5/E94QBrYTR3OfQtbtxDa3l1wIMFapD0ZGYPd1OHrX6jL0tNwIEHDZGQ8RAZjVRK4DnUplmgOkfGANCEcTsLhJKHNLcBrH9EsaQcxxWYnphyMCTY7Y8JxfCYljCbL36UpJMzxmfQ6pEw6a1NAghDGv4GFRVb1+20eaPdpnHGtQ8p4lJm4iJEghMlf4e871OXxLhpm4hJlDmURnzGJPCG4DjgCR+AIHIEjcASOwBE4AteBh9rhpWcg+SSNEbmIzxhloiK9YB+b8QYttrgE039yz84dsHMHK5L4JL5db1LmUeG5jBaKvG6GRwu1bYWnHmFVEgXPZZQKl4oP3k/Nnjg5tIDxApuBw7uxNn1OhcsyZ4ZTlwffG0oACTaSuNC5XQMs41Al7nNMcIUNIrgS9zlGFZcqqVRq6fTw0PnFAk8ACdaTuBDfzsuSslQRNcwGNiBjxAyPFpIomBjs9HWWFYhVzOesu1DkOHDUjAhNJJEHPvNcRtu36To1iJCyZl35gH4ZhxA9ZogGSBjGlImLEZ+xqDRDCKIBc2axUkAS0YfRA8QxYibiQIz7MjLSiAyQRkxhTDg+kx1Shjr9C2nCYhQQxQX2AAAAAElFTkSuQmCC'

type PicCardProps = {
    defaultChecked?: boolean;
    checked?: boolean;
    onChange?: () => void;
    prefixCls?: string;

    id?: string | number;
    name?: string;
    pixel?: string;
    fullUrl?: string;
    isRef?: boolean
}
const PicCard: React.FC = (props: PicCardProps) => {
    const { id, name, fullUrl = '', pixel, isRef } = props;
    const { prefixCls, wrapSSR, hashId } = useStyle(props?.prefixCls);
    const [preview, setPreview] = useState(false);
    const { copied, copyLoading, onClick: onCopyClick } = useCopyClick({ copyConfig: { text: fullUrl } });
    useEffect(() => { if (copied) { message.success('复制成功') } }, [copied]);
    const [checked, setChecked] = useMergedState<boolean>(props?.defaultChecked ?? false, {
        value: props?.checked,
        onChange: props?.onChange,
    });
    return wrapSSR(
        <div className={classNames(`${prefixCls}-pic-card`, hashId)} >
            <div className={classNames(`${prefixCls}-pic-background`, hashId)}>
                <label>
                    <div className={classNames(`${prefixCls}-pic-imgBox`, hashId)}>
                        <Image
                            src={fullUrl}
                            fallback={errImage}
                            preview={{
                                visible: preview,
                                maskStyle: { backgroundColor: 'rgba(0, 0, 0, 0.65)' },
                                src: fullUrl,
                                mask: undefined,
                                onVisibleChange: (value: boolean, prevValue: boolean) => {
                                    if (value == false && prevValue == true) { setPreview(value); }
                                },
                            }}
                        />
                        <span className={classNames(`${prefixCls}-pic-ai-entry`, hashId)}>
                            AI图片编辑
                        </span>
                    </div>
                    <Checkbox checked={checked} onChange={() => { setChecked(!checked); }}
                        className={classNames(`${prefixCls}-pic-checkbox`, hashId, { ['checked']: checked })}
                    />
                    <div className={classNames(`${prefixCls}-pic-controlWrap`, hashId)}>
                        {pixel &&
                            <span className={classNames(`${prefixCls}-pic-spec`, hashId)}>
                                {pixel}
                            </span>
                        }
                        <TransButton
                            style={{ display: 'none' }}
                            className={classNames(`${prefixCls}-pic-copy`, hashId)}
                            onClick={onCopyClick}
                        >
                            {copied ? <CheckOutlined /> : copyLoading ? <LoadingOutlined /> : <CopyOutlined />}
                        </TransButton>

                        <ExpandOutlined className={classNames(`${prefixCls}-pic-fullView`, hashId)}
                            onClick={() => {
                                setPreview(true);
                            }} />
                    </div>
                </label>
                <div className={classNames(`${prefixCls}-pic-title-wrap`, hashId)} >
                    {!isRef && <div className={classNames(`${prefixCls}-pic-title-svg`, hashId)} >
                        <img src={refImage} alt="引用图片" style={{ width: '100%', height: '100%' }} />
                    </div>}
                    <div className={classNames(`${prefixCls}-pic-title-tip`, hashId)} >
                        <span>{name}</span>
                    </div>
                </div>
            </div >
        </div >
    );
};

export type { PicCardProps }
export default PicCard; 