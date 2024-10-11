import { UserOutlined } from "@ant-design/icons";
import { Avatar, Typography } from "antd";
import { ReactNode } from "react";
import { useStyle } from "./style";
import classNames from "classnames";

type ConfirmCurrentAccountProps = {
    userName?: ReactNode,
    avatar?: string,
    onClick?: () => void;
}
const ConfirmCurrentAccount = (props: ConfirmCurrentAccountProps) => {
    const { userName, avatar, onClick } = props;
    const { prefixCls, hashId } = useStyle();
    return (<>
        <Typography.Text>{'请确认继续用以下账号登录'}</Typography.Text>
        <div className={classNames(`${prefixCls}`, hashId)} >
            <Avatar size={60} icon={<UserOutlined />} style={{ marginTop: 36 }} src={avatar} />
            <Typography.Text style={{ margin: '8px 0 20px', }}>
                <span style={{ fontWeight: 'bold', fontSize: 18, }}>{userName}</span>
                <Typography.Link onClick={onClick}>
                    （切换）
                </Typography.Link >
            </Typography.Text>
        </div>
    </>);
};
export default ConfirmCurrentAccount;