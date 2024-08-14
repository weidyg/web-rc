import { useEffect, useMemo, useState } from 'react';
import { Button, Input, Select, Space, Tree, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { classNames } from '@web-react/biz-utils';
import PicUploader, { DisplayPanelType, FolderType } from './Uploader';
import PicDashboard, { ImageFile } from './PicDashboard';
import { useStyle } from './style';


type ImageSpaceProps = {
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: React.CSSProperties;
  /** 自定义样式前缀 */
  prefixCls?: string;

  pageSize?: number;
  fetchFolders?: () => Promise<FolderType[]>;
  fetchData: (page: number, size: number) => Promise<{ items: ImageFile[], total: number, }>;
};

const ImageSpace = (props: ImageSpaceProps) => {
  const { style, className, pageSize = 20, fetchData, fetchFolders } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyle(props.prefixCls);
  const classString = classNames(prefixCls, className, hashId, {});
  const [displayPanel, setDisplayPanel] = useState<DisplayPanelType>('none');
  const [selectKeys, setSelectKeys] = useState<(string | number)[]>([]);

  const [folders, setFolders] = useState<FolderType[]>([]);

  useEffect(() => {
    loadDirs();
  }, [])



  const handleOk = (e: any) => {

  };

  const loadDirs = async () => {
    const data = await fetchFolders?.() || [];
    setFolders(data);
  };
  const loadData = async (page: number, size: number) => {
    return await fetchData?.(page, size);
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

  function geTreeData(list: FolderType[]): any[] {
    return list.map((m) => {
      return {
        key: m.value,
        title: m.label,
        children: m.children && geTreeData(m.children),
      };
    });
  }

  const FolderTree = () => {
    const defaultValue = folders?.length > 0 ? folders[0].value : '';
    const [folderId, setFolderId] = useState<string | number>(defaultValue);

    const options = folders.flatMap((node) => {
      if (node.children) {
        const nodes = node.children.flatMap((child) => [child, ...flatTreeHelper(child.children)]);
        return [node, ...nodes];
      }
      return node;
    });
    function flatTreeHelper(children: any[] | undefined): any[] {
      if (!children || children.length === 0) { return []; }
      return children.flatMap(child => [child, ...flatTreeHelper(child.children)]);
    }
    const treeData = geTreeData(folders);
    return <>
      <Select style={{ width: '100%', marginBottom: '8px' }}
        showSearch
        options={options}
        value={folderId}
        onChange={(value) => {
          setFolderId(value);
        }}
      />
      <Tree
        blockNode
        showIcon={true}
        treeData={treeData}
        selectedKeys={[folderId]}
        onSelect={(value) => {
          const val = value[0] as string | number;
          setFolderId(val);
        }}
      />
    </>
  }

  const selectCount = useMemo(() => {
    return selectKeys?.length || 0;
  }, [selectKeys])

  return wrapSSR(
    <div className={classString} style={style}>
      <div className={classNames(`${prefixCls}-body`, hashId)}>
        <div className={classNames(`${prefixCls}-aside`, hashId)}>
          <div className={classNames(`${prefixCls}-treeDom`, hashId)} >
            <FolderTree />
          </div>
        </div>
        <PicDashboard
          selectKeys={selectKeys}
          onSelect={(keys) => {
            setSelectKeys(keys);
          }}
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
          pageSize={pageSize}
          loadData={loadData}
        />
        <PicUploader
          folders={folders}
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
            确定{selectCount > 0 && `（${selectCount}）`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export type { ImageSpaceProps, ImageFile, FolderType };
export default ImageSpace;
