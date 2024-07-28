import { ReactNode, useState } from 'react';
import { Button, } from 'antd';
import classNames from 'classnames';
import { useStyle } from './style';
import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';

type ImageSpaceLayoutProps = {
    /** 类名 */
    className?: string;
    /** 样式 */
    style?: React.CSSProperties;
    /** 自定义样式前缀 */
    prefixCls?: string;

    treeDom?: ReactNode;
    footer?: ReactNode;
};

const ImageSpaceLayout: React.FC<ImageSpaceLayoutProps> = (props) => {
    const { style, className } = props;
    const { prefixCls, wrapSSR, hashId, token } = useStyle(props.prefixCls);
    const classString = classNames(prefixCls, className, hashId, {});
    const [displayPanel, setDisplayPanel] = useState<'uploader' | 'uploadList' | undefined>();
    const [cardview, setCardview] = useState(true);

    return wrapSSR(
        <div className={classString} style={style}>
            <div className={classNames(`${prefixCls}-body`, hashId)}>
                <div className={classNames(`${prefixCls}-aside`, hashId)}>
                    <div className={classNames(`${prefixCls}-treeDom`, hashId)} >
                        {`props?.treeDom`}
                    </div>
                </div>
                <div className={classNames(`${prefixCls}-dashboard`, hashId)}>
                    {/* <div style={{ display: 'flex', flexGrow: 1, flexBasis: '100%', position: 'absolute', background: 'rgba(255, 255, 255, 0.5)', zIndex: -1, width: '100%', height: '100%' }} /> */}
                    <div className={classNames(`${prefixCls}-dashboard-header`, hashId)}>
                        <div className={classNames(`${prefixCls}-dashboard-header-actions`, hashId)}>
                            <div className={classNames(`${prefixCls}-dashboard-header-actions-left`, hashId)}>
                                <AppstoreOutlined
                                    style={{
                                        marginRight: '8px',
                                        cursor: 'pointer',
                                        color: cardview ? token.colorPrimaryTextActive : token.colorTextSecondary,
                                    }}
                                    onClick={() => {
                                        setCardview(true);
                                    }}
                                />
                                <UnorderedListOutlined
                                    style={{
                                        cursor: 'pointer',
                                        color: cardview ? token.colorTextSecondary : token.colorPrimaryTextActive,
                                    }}
                                    onClick={() => {
                                        setCardview(false);
                                    }}
                                />
                                {`props?.dashboard?.header?.left`}
                            </div>
                            <div className={classNames(`${prefixCls}-dashboard-header-actions-right`, hashId)}>
                                {`props?.dashboard?.header?.right`}
                            </div>
                        </div>
                    </div>
                    {cardview ? (
                        <div className={classNames(`${prefixCls}-dashboard-list`, hashId)}>
                            <div className={classNames(`${prefixCls}-dashboard-list-document`, hashId)}>
                                {`props?.dashboard?.list`}
                            </div>
                        </div>
                    ) : (
                        <div className={classNames(`${prefixCls}-dashboard-table`, hashId)}>
                            {`props?.dashboard?.table`}
                        </div>
                    )}
                </div>
                <div style={{ display: displayPanel == 'uploader' || 'uploadList' ? 'flex' : 'none' }}
                    className={classNames(`${prefixCls}-container`, hashId)}>
                    <div className={classNames(`${prefixCls}-body`, hashId)}>
                        <div className={classNames(`${prefixCls}-panel`, hashId)}>
                            
                            <div
                                style={{ display: displayPanel == 'uploader' ? 'flex' : 'none' }}
                                className={classNames(`${prefixCls}-panel-form`, hashId)}
                            >
                                <div className={classNames(`${prefixCls}-panel-config`, hashId)}>
                                    {`config`}
                                </div>
                                <div style={{ display: 'block !important', width: '100%', height: '100%', margin: 0 }}>
                                    <div style={{ width: '100%', height: '95%' }}>
                                        {`Upload`}
                                    </div>
                                </div>
                            </div>

                            <div
                                style={{ display: displayPanel == 'uploadList' ? 'flex' : 'none' }}
                                className={classNames(`${prefixCls}-list-container`, hashId)}
                            >
                                <div className={classNames(`${prefixCls}-list`, hashId)}>
                                    {`Alert`}
                                    <div className={classNames(`${prefixCls}-list-files`, hashId)}>
                                        {`items`}
                                    </div>
                                    <div className={classNames(`${prefixCls}-list-actions-wrap`, hashId)}>
                                        <div className={classNames(`${prefixCls}-list-actions`, hashId)}>
                                            <Button type="text">继续上传</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classNames(`${prefixCls}-footer`, hashId)}>
                {props?.footer}
            </div>
        </div>,
    );
};

export type { ImageSpaceLayoutProps };
export default ImageSpaceLayout;
