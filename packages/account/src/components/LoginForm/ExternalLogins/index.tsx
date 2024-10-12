import { ReactNode, useMemo } from "react";
import { Avatar, Button, Divider, Popover, Space } from "antd";
import { useStyle } from "./style";
import classNames from "classnames";

export const DefaultIcon: React.FC<{
    size?: number | undefined,
    text?: string,
}> = ({ size = 36, text }) => {
    return (<Avatar size={size} style={{ cursor: 'pointer', userSelect: 'none', }}>
        {text}
    </Avatar>
    );
}

type ThirdPartyLogin = { text: string, icon?: ReactNode, onClick?: () => void };
type ExternalLoginsProps = {
    maxCount?: number,
    actions?: ThirdPartyLogin[],
}
const ExternalLogins = (props: ExternalLoginsProps) => {
    const { maxCount = 4, actions = [] } = props;
    const { prefixCls, hashId } = useStyle();
    const { show, more } = useMemo(() => {
        const all = actions || [];
        const allCount = all?.length || 0;
        const hasMore = maxCount >= 0 && allCount > maxCount;
        const show = hasMore ? all?.slice(0, maxCount) : all;
        const more = hasMore ? all?.slice(maxCount) : [];
        return { show, more };
    }, [actions, maxCount]);

    const ActionItem = (props: ThirdPartyLogin) => {
        const { text, icon, onClick } = props;
        return <div onClick={onClick}
            className={classNames(`${prefixCls}-item`, hashId)}>
            {icon || <DefaultIcon text={text} />}
        </div>
    }
    return (actions.length > 0 &&
        <div className={classNames(`${prefixCls}`, hashId)} >
            <Divider plain style={{ margin: 0 }}>
                <span className={classNames(`${prefixCls}-title`, hashId)} >
                    第三方登录
                </span>
            </Divider>
            <Space align="center" size={24} style={{ margin: '8px 0 12px' }}>
                {show?.map((item, index: number) => (<ActionItem key={index} {...item} />))}
                {more?.length > 0 && (<Popover content={<Space>
                    {more?.map((item, index: number) => (<ActionItem key={index} {...item} />))}
                </Space>}>
                    <div className={classNames(`${prefixCls}-item`, hashId)} >
                        <DefaultIcon text={`+${more?.length}`} />
                    </div>
                </Popover>
                )}
            </Space>
        </div>
    );
};
export default ExternalLogins;