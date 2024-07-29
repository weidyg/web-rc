import { ReactNode, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Image, Button, Checkbox, Input, Segmented, Select, Space, Table, Tree, Typography } from 'antd';
import { AppstoreOutlined, BarsOutlined, SearchOutlined } from '@ant-design/icons';
import PicCard from './PicCard';
import PicUploader, { DisplayPanelType } from './Uploader';
import { useStyle } from './style';
import dataJson from './data.json';
import { convertByteUnit } from '@web-react/biz-utils';

const files = dataJson.files.fileModule.map(m => {
  return {
    id: m.pictureId,
    name: m.name,
    size: m.sizes,
    pixel: m.pixel,
    fullUrl: m.fullUrl,
    isRef: m.ref,
  }
});

type ImageFile = {
  id: string | number;
  name?: string;
  size?: number;
  pixel?: string;
  fullUrl?: string;
  isRef?: boolean;
}

type ImageSpaceProps = {
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: React.CSSProperties;
  /** 自定义样式前缀 */
  prefixCls?: string;
};

const ImageSpace: React.FC<ImageSpaceProps> = (props) => {
  const { style, className } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyle(props.prefixCls);
  const classString = classNames(prefixCls, className, hashId, {});
  const [displayPanel, setDisplayPanel] = useState<DisplayPanelType>('none');
  const [showType, setShowType] = useState<'list' | 'table'>('table');
  const [imageFiles, setImageFiles] = useState<ImageFile[]>(files);
  const [selectKeys, setSelectKeys] = useState<(string | number)[]>([]);


  const handleOk = (e: any) => {

  };
  const isChecked = (id: string | number): boolean => {
    return selectKeys?.includes(id) ?? false;
  };
  const checkChange = (id: string | number, checked: boolean) => {
    setSelectKeys(keys => {
      return keys.includes(id)
        ? (checked ? keys : keys.filter(k => k !== id))
        : (checked ? [...keys, id] : keys);
    });
  };

  const SearchForm = () => {
    return <Space>
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
        style={{ width: '147px', }}
      />
    </Space>
  }
  const FolderTree = () => {
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
    return <>
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
      />
    </>
  }
  const RenderFileName = ({ file }: { file: ImageFile }) => {
    const [preview, setPreview] = useState(false);
    return <div className={classNames(`${prefixCls}-fileName`, hashId)}>
      <div className={classNames(`${prefixCls}-fileName-checkbox`, hashId)}>
        <Checkbox
          checked={isChecked(file.id)}
          onChange={(e) => {
            checkChange(file.id, e.target.checked);
          }}
        />
      </div>
      <div className={classNames(`${prefixCls}-fileName-img`, hashId)}>
        <Image
          src={file?.fullUrl}
          onClick={() => { setPreview(true); }}
          preview={{
            visible: preview,
            maskStyle: { backgroundColor: 'rgba(0, 0, 0, 0.65)' },
            src: file?.fullUrl,
            mask: undefined,
            onVisibleChange: (value: boolean, prevValue: boolean) => {
              if (value == false && prevValue == true) {
                setPreview(value);
              }
            },
          }} />
      </div>
      <div className={classNames(`${prefixCls}-fileName-title`, hashId)} >
        <p>{file?.name}</p>
      </div>
    </div>
  }

  const listRef = useRef<HTMLDivElement>(null);
  const lastElementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      const lastElement = lastElementRef.current?.lastElementChild;
      if (!lastElement) { return; }
      const rect = lastElement.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
      if (isVisible) {
        console.log('lastElementChild', isVisible);
      }
    };

    listRef.current?.addEventListener('scroll', handleScroll);
    return () => {
      listRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return wrapSSR(
    <div className={classString} style={style}>
      <div className={classNames(`${prefixCls}-body`, hashId)}>
        <div className={classNames(`${prefixCls}-aside`, hashId)}>
          <div className={classNames(`${prefixCls}-treeDom`, hashId)} >
            <FolderTree />
          </div>
        </div>
        <div className={classNames(`${prefixCls}-dashboard`, hashId)}>
          <div className={classNames(`${prefixCls}-dashboard-header`, hashId)}>
            <div className={classNames(`${prefixCls}-dashboard-header-actions`, hashId)}>
              <div className={classNames(`${prefixCls}-dashboard-header-actions-left`, hashId)}>
                <Space>
                  <Segmented
                    defaultValue={showType}
                    options={[
                      { value: 'list', icon: <AppstoreOutlined /> },
                      { value: 'table', icon: <BarsOutlined /> },
                    ]}
                    onChange={(value: any) => {
                      setShowType(value)
                    }}
                  />
                  <Button>刷新</Button>
                  <SearchForm />
                </Space>
              </div>
              <div className={classNames(`${prefixCls}-dashboard-header-actions-right`, hashId)}>
                <Button type="primary" onClick={() => { setDisplayPanel('uploader') }}>
                  上传图片
                </Button>
              </div>
            </div>
          </div>
          {showType == 'list' &&
            <div // style={{ display: showType == 'list' ? 'block' : 'none' }}
              ref={listRef} className={classNames(`${prefixCls}-dashboard-list`, hashId)}>
              <div ref={lastElementRef}
                className={classNames(`${prefixCls}-dashboard-list-document`, hashId)}>
                {imageFiles.map((item, index) => (
                  <PicCard
                    key={index}
                    id={item.id}
                    name={item.name}
                    fullUrl={item.fullUrl}
                    pixel={item.pixel}
                    isRef={item.isRef}
                    checked={isChecked(item.id)}
                    onChange={(value: boolean, prevValue: boolean) => {
                      console.log('PicCard onChange', value, prevValue);
                      checkChange(item.id, value);
                    }}
                  />
                ))}
                {Array.from({ length: 10 }).map((item, index) => (
                  <i key={index} className={classNames(`${prefixCls}-picCard-dom`, hashId)} />
                ))}
              </div>
            </div>
          }
          {showType == 'table' &&
            <div // style={{ display: showType == 'table' ? 'block' : 'none' }}
              className={classNames(`${prefixCls}-dashboard-table`, hashId)}>
              <Table
                tableLayout='auto'
                size="middle"
                scroll={{ y: 'calc(-180px + 100vh)' }}
                pagination={false}
                // internalRefs={ }
                onScroll={(e) => {
                  const lastElement = (e.target as HTMLDivElement)?.lastElementChild;
                  if (!lastElement) { return; }
                  const rect = lastElement.getBoundingClientRect();
                  const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
                  if (isVisible) {
                    console.log('onScroll lastElementChild', isVisible);
                  }
                }}
                columns={[
                  {
                    dataIndex: 'name', title: '文件',
                    render: (_, record) => (<RenderFileName key={record.id} file={record} />),
                  },
                  { dataIndex: 'pixel', title: '尺寸' },
                  {
                    dataIndex: 'size', title: '大小',
                    render: (value) => convertByteUnit(value)
                  },
                  // { dataIndex: 'status', title: '状态' },
                  // { dataIndex: 'gmtModified', title: '修改时间' },
                ]}
                dataSource={imageFiles}
              />
            </div>
          }
        </div>
        <PicUploader
          display={displayPanel}
          onDisplayChange={(val) => {
            setDisplayPanel(val)
          }}
        />
      </div>
      <div className={classNames(`${prefixCls}-footer`, hashId)}>
        <div className={classNames(`${prefixCls}-footer-left`, hashId)}>
          <Typography.Link target="_blank">
            进入图片空间
          </Typography.Link>
        </div>
        <div className={classNames(`${prefixCls}-footer-right`, hashId)}>
          <Button
            type="primary"
            disabled={selectKeys?.length == 0}
            onClick={handleOk}
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
