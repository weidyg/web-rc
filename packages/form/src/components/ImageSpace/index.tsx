import { useContext, useState } from "react";
import { AppstoreOutlined, SearchOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Image, Button, ConfigProvider, Input, MenuProps, Select, Space, theme, Typography } from "antd";
import classNames from 'classnames';
import { useStyle } from "./style";
import PicCard from "./PicCard";

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
  const _prefixCls = `${props.prefixCls || getPrefixCls('biz')}-image-space`;
  const { prefixCls, wrapSSR, hashId } = useStyle(_prefixCls);
  console.log('prefixCls', prefixCls, _prefixCls);

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



  return wrapSSR(
    <div className={classString} style={style}>
      <div className={classNames(`${prefixCls}-body`, hashId)} >
        <div className={classNames(`${prefixCls}-aside`, hashId)} >
          <div className={classNames(`${prefixCls}-treeDom`, hashId)} />
        </div>
        <div className={classNames(`${prefixCls}-dashboard`, hashId)}>
          <Image
            wrapperStyle={{ display: 'none' }}
            src="https://img.alicdn.com/imgextra/i2/1035339340/O1CN01wu2MZa2IrmD7FVKKo_!!1035339340.png"
            preview={{
              visible: false,
              maskStyle: { backgroundColor: 'rgba(0, 0, 0, 0.65)' },
              src: 'https://img.alicdn.com/imgextra/i2/1035339340/O1CN01wu2MZa2IrmD7FVKKo_!!1035339340.png',
              onVisibleChange: (value) => {
                // setVisible(value);
              },
            }}
          />
          {/* <div style={{ display: 'flex', flexGrow: 1, flexBasis: '100%', position: 'absolute', background: 'rgba(255, 255, 255, 0.5)', zIndex: -1, width: '100%', height: '100%' }} /> */}
          <div className={classNames(`${prefixCls}-dashboard-header`, hashId)}>
            <div className={classNames(`${prefixCls}-dashboard-header-actions`, hashId)}>
              <div className={classNames(`${prefixCls}-dashboard-header-actions-left`, hashId)}>
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
              <div className={classNames(`${prefixCls}-dashboard-header-actions-right`, hashId)}>
                <Button type='primary'
                  style={{ height: '30px', fontSize: '12px' }}
                >
                  上传图片
                </Button>
              </div>
            </div>
          </div>
          {cardview
            ? (
              <div className={classNames(`${prefixCls}-dashboard-list`, hashId)}>
                <div className={classNames(`${prefixCls}-dashboard-list-document`, hashId)}>
                  {Array.from({ length: 100 }).map((item, index) => (
                    <PicCard />
                  ))}
                  {Array.from({ length: 10 }).map((item, index) => (
                    <i className={classNames(`${prefixCls}-pic-dom`, hashId)} />
                  ))}
                </div>
              </div>
            ) : (
              <div className={classNames(`${prefixCls}-dashboard-table`, hashId)}>

              </div>
            )
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
