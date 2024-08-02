import { useState } from 'react';
import classNames from 'classnames';
import { Image, Button, Checkbox, Input, Segmented, Select, Space, Table, Tree, Typography, Spin, List } from 'antd';
import { AppstoreOutlined, BarsOutlined, SearchOutlined } from '@ant-design/icons';
import PicCard from './PicCard';
import PicUploader, { DisplayPanelType } from './Uploader';
import { useStyle } from './style';
import dataJson from './data.json';
import { convertByteUnit } from '@web-react/biz-utils';
import PicDashboard from './PicDashboard';

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
  const [showType, setShowType] = useState<'list' | 'table'>('list');
  const [imageFiles, setImageFiles] = useState<ImageFile[]>(files);
  const [selectKeys, setSelectKeys] = useState<(string | number)[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [current, setCurrent] = useState(0);

  const handleOk = (e: any) => {

  };


  const fetchData = (current: number) => {
    if (current > totalPage) { return; }
    setLoading(true);
    setTimeout(() => {

      const newData = files.map((file, index) => {
        return {
          ...file,
          id: file.id + '_' + current,
        };
      });

      const newImageFiles = current > 1
        ? [...imageFiles, ...newData]
        : newData;
      setImageFiles(newImageFiles);
      setCurrent(current);
      setTotalPage(current + 1);
      setLoading(false);
    }, 1000);
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

  return wrapSSR(
    <div className={classString} style={style}>
      <div className={classNames(`${prefixCls}-body`, hashId)}>
        <div className={classNames(`${prefixCls}-aside`, hashId)}>
          <div className={classNames(`${prefixCls}-treeDom`, hashId)} >
            <FolderTree />
          </div>
        </div>
        <PicDashboard
          actions={{
            left: <SearchForm />,
            right: <Button
              type="primary"
              onClick={() => {
                setDisplayPanel('uploader')
              }}
            >
              上传图片
            </Button>,
          }}
        />
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
            {selectKeys?.length > 0 && `（${selectKeys?.length}）`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export type { ImageSpaceProps };
export default ImageSpace;
