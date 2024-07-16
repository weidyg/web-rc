import { useContext, useState } from "react";
import { AppstoreOutlined, CopyOutlined, ExpandOutlined, SearchOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Image, Button, Checkbox, ConfigProvider, Input, MenuProps, Select, Space, theme, Typography } from "antd";
import classNames from 'classnames';
import { useStyle } from "./style";

type ImageSpaceProps = {
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: React.CSSProperties;

  children?: React.ReactNode;
  prefixCls?: string;
};

const ImageSpace: React.FC<ImageSpaceProps> = (props) => {
  const { children, style, className } = props;

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = `${props.prefixCls || getPrefixCls('biz')}-image-space`;
  const { wrapSSR, hashId } = useStyle(prefixCls);
  const { token } = theme.useToken();
  const classString = classNames(prefixCls, className, hashId, {});

  type MenuItem = Required<MenuProps>['items'][number];
  const items: MenuItem[] = [
    {
      key: 'sub1',
      label: '全部图片'
    },
    {
      key: 'sub2',
      label: '妙手搬家-勿删',
      children: [
        {
          key: 'g1',
          label: '202407'
        },
      ],
    },
  ];

  const [cardview, setCardview] = useState(true);
  const [okDisabled, setOkDisabled] = useState(true);
  const handleOkClick = (e: any) => {

  };

  type PicCardProps = {
    defaultChecked?: boolean;
    checked?: boolean;
    onChange?: () => void;
  }
  const PicCard: React.FC = (props: PicCardProps) => {
    const { checked = true } = props;
    return (
      <div className={classNames(`${prefixCls}-pic-card`, hashId)} >
        <div className={classNames(`${prefixCls}-pic-background`, hashId)}>
          <label>
            <div className={classNames(`${prefixCls}-pic-imgBox`, hashId)}>
              <img src="https://img.alicdn.com/imgextra/i2/1035339340/O1CN01wu2MZa2IrmD7FVKKo_!!1035339340.png_120x120q90?t=1715407909000" />
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
                800x729
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
              <span>aigc-白底图.jpg</span>
            </div>
          </div>
        </div >
      </div >
    );
  };

  return wrapSSR(
    <div className={classString} style={style}>
      <div className={classNames(`${prefixCls}-body`, hashId)} >
        <div className={classNames(`${prefixCls}-body-aside`, hashId)} >
          <div className={classNames(`${prefixCls}-body-treeDom`, hashId)} />
        </div>
        <div className={classNames(`${prefixCls}-body-dashboard`, hashId)}>
          {/* <div style={{ display: 'flex', flexGrow: 1, flexBasis: '100%', position: 'absolute', background: 'rgba(255, 255, 255, 0.5)', zIndex: -1, width: '100%', height: '100%' }} /> */}
          <div className={classNames(`${prefixCls}-body-dashboard-header`, hashId)}>
            <div className={classNames(`${prefixCls}-body-dashboard-header-actions`, hashId)}>
              <div className={classNames(`${prefixCls}-body-dashboard-header-actions-left`, hashId)}>
                <AppstoreOutlined style={{
                  marginRight: '3px',
                  cursor: 'pointer',
                  color: cardview
                    ? token.colorPrimaryTextActive
                    : token.colorTextSecondary
                }}
                  onClick={() => {
                    setCardview(true);
                  }}
                />
                <UnorderedListOutlined style={{
                  cursor: 'pointer',
                  color: cardview
                    ? token.colorTextSecondary
                    : token.colorPrimaryTextActive
                }}
                  onClick={() => {
                    setCardview(false);
                  }}
                />
                <Button style={{
                  width: "72px",
                  height: "30px",
                  marginLeft: "9px",
                  marginRight: "9px",
                  fontSize: "12px"
                }}>
                  刷新
                </Button>
                <Space.Compact>
                  <Select style={{ width: '100px' }}
                    popupMatchSelectWidth={false}
                    defaultValue={'picture'}
                    options={[
                      { label: '图片', value: 'picture' },
                      { label: '宝贝名称', value: 'name' },
                      { label: '宝贝ID', value: 'id' },
                    ]} />
                  <Input style={{ width: '120px' }}
                    suffix={<SearchOutlined />}
                    placeholder={'搜索'}
                  />
                </Space.Compact>

                <Select defaultValue={'timeDes'}
                  options={[
                    { label: '文件名升序', value: 'nameAsc' },
                    { label: '文件名降序', value: 'nameDes' },
                    { label: '上传时间升序', value: 'timeAsc' },
                    { label: '上传时间降序', value: 'timeDes' },
                  ]}
                  style={{
                    width: '147px',
                    marginRight: '9px',
                    marginLeft: '9px'
                  }}
                />

              </div>
              <div className={classNames(`${prefixCls}-body-dashboard-header-actions-right`, hashId)}>
                <Button type='primary'
                  style={{ height: '30px', fontSize: '12px' }}
                >
                  上传图片
                </Button>
              </div>
            </div>
          </div>
          {cardview
            ? <div className={classNames(`${prefixCls}-body-dashboard-list`, hashId)}>
              <div className={classNames(`${prefixCls}-body-dashboard-list-document`, hashId)}>
                <Image
                  style={{ display: 'none' }}
                  preview={{
                    visible: false,
                    maskStyle: { backgroundColor: 'rgba(0, 0, 0, 0.65)' },
                    src: 'https://img.alicdn.com/imgextra/i2/1035339340/O1CN01wu2MZa2IrmD7FVKKo_!!1035339340.png',
                    onVisibleChange: (value) => {
                      // setVisible(value);
                    },
                  }}
                />
                {Array.from({ length: 100 }).map((item, index) => (
                  <PicCard />
                ))}
                {Array.from({ length: 10 }).map((item, index) => (
                  <i className="PicList_i_dom__CbFP7" style={{
                    visibility: 'hidden',
                    position: 'relative',
                    width: '122px',
                    height: '153px',
                    margin: '10px 12px 0 0'
                  }}></i>
                ))}
              </div>
            </div>
            : <div className={classNames(`${prefixCls}-body-dashboard-table`, hashId)}>

            </div>
          }
        </div>
      </div>
      <div className={classNames(`${prefixCls}-footer`, hashId)}>
        <div style={{ display: 'flex', alignItems: 'center' }} >
          <Typography.Link target="_blank" style={{ marginLeft: '18px' }}>进入图片空间</Typography.Link>
        </div>
        <div style={{ width: 'calc(100% - 460px)' }} />
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }} >
          <Button type='primary'
            className={classNames(`${prefixCls}-footer-selectOk`, hashId)}
            disabled={okDisabled}
            onClick={handleOkClick}
          >
            确定
          </Button>
        </div>
      </div>
    </div>
  );
};

export type { ImageSpaceProps };
export default ImageSpace;
