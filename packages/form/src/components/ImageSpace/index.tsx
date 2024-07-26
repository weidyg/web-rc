import { useContext, useState } from 'react';
import {
  AppstoreOutlined,
  CopyOutlined,
  ExpandOutlined,
  SearchOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import {
  Image,
  Button,
  ConfigProvider,
  Input,
  MenuProps,
  Select,
  Space,
  theme,
  Typography,
  Checkbox,
  Table,
  Flex,
  Menu,
  SelectProps,
  Tree,
  TreeProps,
} from 'antd';
import classNames from 'classnames';
import { useStyle } from './style';
import PicCard from './PicCard';
import dataJson from './data.json';
import PicUploader from './PicUploader';

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

  const { prefixCls, wrapSSR, hashId } = useStyle(props.prefixCls);

  const { token } = theme.useToken();
  const classString = classNames(prefixCls, className, hashId, {});

  type TreeDataType = Required<TreeProps>['treeData'][number];
  type OptionType = Required<SelectProps>['options'][number];
  const items: any[] = [
    {
      key: 'sub1',
      title: '全部图片',
    },
    {
      key: 'sub2',
      title: '妙手搬家-勿删',
      children: [
        {
          key: 'g1',
          title: '202407',
          children: [
            {
              key: 'g11',
              title: '20240711',
              children: [
                {
                  key: 'g1221',
                  title: '20240711222',
                },
              ],
            },
          ]
        },
      ],
    },
  ];

  const options = items.flatMap((node: any) => {
    if (node.children) {
      const nodes = node.children.flatMap((child: any) => [child, ...flatTreeHelper(child.children)]);
      return [node, ...nodes];
    }
    return node;
  });

  function flatTreeHelper(children: any[] | undefined): any[] {
    if (!children || children.length === 0) { return []; }
    return children.flatMap(child => [child, ...flatTreeHelper(child.children)]);
  }


  const [cardview, setCardview] = useState(true);
  const [okDisabled, setOkDisabled] = useState(true);
  const handleOkClick = (e: any) => { };

  return wrapSSR(
    <div className={classString} style={style}>
      <div className="Home_header__LnDec" style={{ display: 'none' }}>
        <div
          style={{
            display: 'none',
            alignItems: 'center',
          }}
        >
          <span className="Home_header-title__W71cm">选择图片</span>
          <span className="Home_header-tip__iQU2C"></span>
        </div>
      </div>
      <span
        className="qn_iconfont qn_close_blod"
        style={{
          cursor: 'pointer',
          position: 'absolute',
          top: '18px',
          right: '15px',
          width: '30px',
          height: '30px',
          fontWeight: '900',
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      ></span>

      <div className={classNames(`${prefixCls}-body`, hashId)}>
        <div className={classNames(`${prefixCls}-aside`, hashId)}>
          <div className={classNames(`${prefixCls}-treeDom`, hashId)} >
            <Select style={{ width: '100%', marginBottom: '8px' }}
              showSearch
              options={options}
            />
            <Tree
              blockNode
              showIcon={true}
              treeData={items}
              onClick={(e) => console.log(e)}
              onSelect={(e) => console.log(e)}
              checkStrictly
              titleRender={(node) => {
                return node.title;
              }}
            />
            {/* <Menu
              style={{ borderRadius: token.borderRadius }}
              items={items}
              mode="inline"
              selectable={true}
            /> */}
            {/* <Menu mode="inline">
              <Menu.Item key="1">1</Menu.Item>
              <Menu.SubMenu>
              </Menu.SubMenu>
            </Menu> */}

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
                <Button
                  style={{
                    width: '72px',
                    height: '30px',
                    marginLeft: '9px',
                    marginRight: '9px',
                    fontSize: '12px',
                  }}
                >
                  刷新
                </Button>
                <Space.Compact>
                  <Select
                    style={{ width: '100px' }}
                    popupMatchSelectWidth={false}
                    defaultValue={'picture'}
                    options={[
                      { label: '图片', value: 'picture' },
                      { label: '宝贝名称', value: 'name' },
                      { label: '宝贝ID', value: 'id' },
                    ]}
                  />
                  <Input style={{ width: '120px' }} suffix={<SearchOutlined />} placeholder={'搜索'} />
                </Space.Compact>
                <Select
                  defaultValue={'timeDes'}
                  options={[
                    { label: '文件名升序', value: 'nameAsc' },
                    { label: '文件名降序', value: 'nameDes' },
                    { label: '上传时间升序', value: 'timeAsc' },
                    { label: '上传时间降序', value: 'timeDes' },
                  ]}
                  style={{
                    width: '147px',
                    marginRight: '9px',
                    marginLeft: '9px',
                  }}
                />
              </div>
              <div className={classNames(`${prefixCls}-dashboard-header-actions-right`, hashId)}>
                <Button type="primary" style={{ height: '30px', fontSize: '12px' }}>
                  上传图片
                </Button>
              </div>
            </div>
          </div>
          {cardview ? (
            <div className={classNames(`${prefixCls}-dashboard-list`, hashId)}>
              <div className={classNames(`${prefixCls}-dashboard-list-document`, hashId)}>
                {dataJson.files.fileModule.map((item, index) => (
                  <PicCard
                    key={index}
                    id={item.pictureId}
                    name={item.name}
                    fullUrl={item.fullUrl}
                    pixel={item.pixel}
                    isRef={item.ref}
                    onChange={(value: boolean, prevValue: boolean) => {
                      console.log('PicCard onChange', value, prevValue);
                    }}
                  />
                ))}
                {Array.from({ length: 10 }).map((item, index) => (
                  <i key={index} className={classNames(`${prefixCls}-pic-dom`, hashId)} />
                ))}
              </div>
            </div>
          ) : (
            <div className={classNames(`${prefixCls}-dashboard-table`, hashId)}>
              <Table
                size="middle"
                scroll={{ y: 'calc(-170px + 100vh)' }}
                pagination={false}
                columns={[
                  {
                    dataIndex: 'name',
                    title: '文件',
                    render: (value, record) => (
                      <div style={{ overflow: 'hidden', display: 'flex' }}>
                        <div
                          style={{
                            marginTop: '8px',
                            marginRight: '10px',
                          }}
                        >
                          <Checkbox></Checkbox>
                        </div>
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '6px',
                            objectFit: 'contain',
                          }}
                        >
                          <img
                            src={record.fullUrl}
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '6px',
                              objectFit: 'contain',
                            }}
                          />
                        </div>
                        <div
                          style={{
                            maxWidth: '105px',
                            fontWeight: '400',
                            fontFamily: 'PingFangSC',
                            marginLeft: '10px',
                            transform: 'translateY(-4px)',
                            cursor: 'pointer',
                          }}
                        >
                          <p
                            style={{
                              fontSize: '12px',
                              textAlign: 'center',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {value}
                          </p>
                        </div>
                      </div>
                    ),
                  },
                  { dataIndex: 'pixel', title: '尺寸' },
                  { dataIndex: 'sizes', title: '大小' },
                  { dataIndex: 'status', title: '状态' },
                  {
                    dataIndex: 'ref',
                    title: '是否引用',
                    render: (value, record) => <> {value + ''}</>,
                  },
                  { dataIndex: 'gmtModified', title: '修改时间' },
                  {
                    dataIndex: 'action',
                    title: '操作',
                    render: (_, record) => (
                      <Flex gap={4}>
                        <Button type="link" style={{ padding: 'unset' }}>
                          预览
                        </Button>
                        <Button type="link" style={{ padding: 'unset' }}>
                          AI图片编辑
                        </Button>
                      </Flex>
                    ),
                  },
                ]}
                dataSource={dataJson.files.fileModule}
              />
            </div>
          )}
        </div>

        <PicUploader />
      </div>
      <div className={classNames(`${prefixCls}-footer`, hashId)}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography.Link target="_blank" style={{ marginLeft: '18px' }}>
            进入图片空间
          </Typography.Link>
        </div>
        <div style={{ width: 'calc(100% - 460px)' }} />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row-reverse',
          }}
        >
          <Button
            type="primary"
            className={classNames(`${prefixCls}-footer-selectOk`, hashId)}
            disabled={okDisabled}
            onClick={handleOkClick}
          >
            确定
          </Button>
        </div>
      </div>
    </div>,
  );
};

export type { ImageSpaceProps };
export default ImageSpace;
