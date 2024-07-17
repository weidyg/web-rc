import { Checkbox } from "antd";
import classNames from "classnames";
import { useStyle } from "./style";
import { CopyOutlined, ExpandOutlined } from "@ant-design/icons";

type PicCardProps = {
    defaultChecked?: boolean;
    checked?: boolean;
    onChange?: () => void;
    prefixCls?: string;

    id?: string | number;
    name?: string;
    fullUrl?: string;
    pixel?: string;
}
const PicCard: React.FC = (props: PicCardProps) => {
    const { checked, id, name = 'aigc-白底图.jpg', pixel = '800x729', fullUrl = 'https://img.alicdn.com/imgextra/i2/1035339340/O1CN01wu2MZa2IrmD7FVKKo_!!1035339340.png' } = props;
    const { wrapSSR, prefixCls, hashId } = useStyle(props.prefixCls);
    return wrapSSR(
        <div className={classNames(`${prefixCls}-pic-card`, hashId)} >
            <div className={classNames(`${prefixCls}-pic-background`, hashId)}>
                <label>
                    <div className={classNames(`${prefixCls}-pic-imgBox`, hashId)}>
                        <img src={fullUrl} alt={name} />
                        <span className={classNames(`${prefixCls}-pic-ai-entry`, hashId)}>
                            AI图片编辑
                        </span>
                    </div>
                    <Checkbox checked={checked}
                        className={classNames(`${prefixCls}-pic-checkbox`, hashId, {
                            ['checked']: checked
                        })}
                    />
                    <div className={classNames(`${prefixCls}-pic-controlWrap`, hashId)}>
                        <span className={classNames(`${prefixCls}-pic-spec`, hashId)}>
                            {pixel}
                        </span>
                        <CopyOutlined className={classNames(`${prefixCls}-pic-copy`, hashId)} />
                        <ExpandOutlined className={classNames(`${prefixCls}-pic-fullView`, hashId)} />
                    </div>
                </label>
                <div className={classNames(`${prefixCls}-pic-title-wrap`, hashId)} >
                    <div className={classNames(`${prefixCls}-pic-title-svg`, hashId)} >
                        <img alt="引用图片" style={{ width: '100%', height: '100%' }}
                            src="https://img.alicdn.com/imgextra/i1/O1CN01saONG01pL90lyzsON_!!6000000005343-2-tps-42-42.png"
                        />
                    </div>
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