/**
 * title: 基本使用
 * description: 基本的描述图编辑器
 */


import { forwardRef, Key, ReactNode, Ref, useEffect, useImperativeHandle, useInsertionEffect, useRef, useState } from 'react';
import dataJson from './_data.json';
import { DirType, ImageDesc, ImageFile, ImageSpace, ImageSpaceRef, ImageUploader } from '@web-react/biz-components';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Flex, Input, Popover, Select, Space } from 'antd';

const imgList = [
  'https://pics.17qcc.com/imgextra/product/202408/20/15656633466472.jpg',
  'https://pics.17qcc.com/imgextra/product/202408/20/10453139457026.jpg',
  'https://pics.17qcc.com/imgextra/product/202408/20/10453141053334.jpg',
  'https://pics.17qcc.com/imgextra/product/202408/20/15656633466472.jpg',
  'https://pics.17qcc.com/imgextra/product/202408/20/10453139457026.jpg',
  'https://pics.17qcc.com/imgextra/product/202408/20/10453141053334.jpg',
  'https://pics.17qcc.com/imgextra/product/202408/20/15656633466472.jpg',
  'https://pics.17qcc.com/imgextra/product/202408/20/10453139457026.jpg',
  'https://pics.17qcc.com/imgextra/product/202408/20/10453141053334.jpg',
  'https://pics.17qcc.com/imgextra/product/202408/20/15656633466472.jpg',
  'https://pics.17qcc.com/imgextra/product/202408/20/10453139457026.jpg',
  'https://pics.17qcc.com/imgextra/product/202408/20/10453141053334.jpg',
  'https://pics.17qcc.com/imgextra/product/202408/20/15656633466472.jpg',
  'https://pics.17qcc.com/imgextra/product/202408/20/10453139457026.jpg',
  'https://pics.17qcc.com/imgextra/product/202408/20/10453141053334.jpg',
]

const Add = ({ onOk }: { onOk: (url: string[]) => void }) => {
  return <>

  </>
};
const Edit = ({ onOk }: { onOk: (url: string) => void }) => {
  const _imageSpaceRef = useRef<ImageSpaceRef>(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = (open: boolean) => {
    setIsOpen(open);
    setTimeout(() => {
      _imageSpaceRef?.current?.clearSelected();
    }, 10);
  }
  return <Popover
    title='选择图片'
    trigger={'click'}
    arrow={false}
    content={<ImageSpaceDom
      ref={_imageSpaceRef}
      mutiple={false}
      onOk={(urls) => {
        onOk?.(urls[0]);
        setIsOpen(false);
      }} />
    }
    open={isOpen}
    destroyTooltipOnHide={false}
    onOpenChange={(open, e) => {
      handleOpen?.(open);
    }}>
    <EditOutlined style={{ cursor: 'pointer' }} />
  </Popover>
};

const ImageSpaceDom = forwardRef((
  props: {
    mutiple?: boolean,
    onOk: (url: string[]) => void
  },
  ref: Ref<ImageSpaceRef>
) => {
  const { mutiple, onOk } = props;

  const [searchParam, setSearchParam] = useState({ type: 'picture', value: '', order: 'timeDes', });

  const defaultFolder = "0";
  const [folderLoading, setFolderLoading] = useState(false);
  const [folders, setFolders] = useState<DirType[]>();
  const [isUpload, setIsUpload] = useState(false);
  const _imageSpaceRef = useRef<ImageSpaceRef>(null);

  useImperativeHandle(ref, () => ({
    refresh: () => {
      return handleRefresh();
    },
    clearSelected: () => {
      setIsUpload(false);
      _imageSpaceRef?.current?.clearSelected();
    },
  }));

  useEffect(() => {
    if (folders == undefined) {
      loadDirs();
    }
  }, []);

  const handleRefresh = () => {
    _imageSpaceRef?.current?.refresh();
  }

  const handleChange = (files: ImageFile[]) => {
    const urls = files.map(m => m.fullUrl).filter(f => f != undefined) || [];
    onOk?.(urls);
  }
  const loadDirs = async () => {
    setFolderLoading(true);
    setTimeout(() => {
      setFolders(dataJson.dirs)
      setFolderLoading(false);
    }, 1000);
  };
  return <>
    <div style={{ width: '760px', height: '400px', }}>
      <ImageSpace
        ref={_imageSpaceRef}
        style={{ display: !isUpload ? '' : 'none' }}
        actionsRender={(dom) => {
          return <Flex gap={4} style={{ width: '100%' }} wrap>
            {dom}
            <Space.Compact>
              <Select
                style={{ width: '100px' }}
                popupMatchSelectWidth={false}
                value={searchParam.type}
                options={[
                  { label: '图片', value: 'picture' },
                  { label: '名称', value: 'name' },
                  { label: '宝贝ID', value: 'id' },
                ]}
                onChange={(value) => {
                  setSearchParam(data => ({ ...data, type: value }));
                }}
              />
              <Input
                allowClear
                style={{ width: '120px' }}
                suffix={<SearchOutlined />}
                placeholder={'搜索'}
                value={searchParam.value}
                onChange={(e) => {
                  setSearchParam(data => ({ ...data, value: e.target.value, }));
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleRefresh();
                  }
                }}
              />
            </Space.Compact>,
            <Select
              options={[
                { label: '文件名升序', value: 'nameAsc' },
                { label: '文件名降序', value: 'nameDes' },
                { label: '上传时间升序', value: 'timeAsc' },
                { label: '上传时间降序', value: 'timeDes' },
              ]}
              value={searchParam.order}
              onChange={(value) => {
                setSearchParam(data => ({ ...data, order: value, }));
                setTimeout(() => { handleRefresh(); }, 500);
              }}
              style={{ width: '128px', }}
            />
            <Flex gap={4} flex={1} justify='flex-end'>
              <Button onClick={() => { setIsUpload(true); }}>上传</Button>
            </Flex>
          </Flex>
        }}
        folderLoading={folderLoading}
        defaultFolder={defaultFolder}
        folders={folders || []}
        fetchData={(param) => {
          const queryParam = { ...param, ...searchParam }
          const { page, size } = queryParam;
          // console.log('queryParam', queryParam);
          return new Promise<{ items: ImageFile[], total: number, }>((resolve, reject) => {
            setTimeout(() => {
              let newData: ImageFile[] = dataJson.files
                .slice((page - 1) * size, page * size)
                .map((file) => ({ ...file, id: file.id + '_' + page, }));
              resolve({ items: newData, total: dataJson.files.length, });
            }, 1000);
          })
        }}
        mutiple={mutiple}
        onChange={(ids: Key[], files: ImageFile[]) => {
          if (files?.length > 0) {
            handleChange(files);
          }
        }}
      />
      <ImageUploader
        style={{ display: isUpload ? '' : 'none' }}
        configRender={(dom: ReactNode) => (
          <Flex style={{ width: '100%' }} align='center' justify='space-between'>
            {dom}
            <Button onClick={() => { setIsUpload(false); }}>
              取消上传
            </Button>
          </Flex>
        )}
        folderLoading={folderLoading}
        defaultFolder={defaultFolder}
        folders={folders}
        upload={{
          action: 'http://localhost:49007/api/services/app/ProductPublish/UploadImages',
          normalize: {
            uploadResponse: (res: { Error: any; Result: {}; }) => {
              const error = res.Error;
              const result = res.Result || {};
              const data = { ...result, error }
              // console.log('uploadResponse', data);
              return data;
            }
          }
        }}
        onUploaDone={() => {
          setTimeout(() => {
            setIsUpload(false);
          }, 1000);
        }}
      />
    </div>
  </>
});
export default () => {
  const [value, setValue] = useState<string[]>(imgList);
  function handleRemove(index: number) {
    const newImgList = [...value];
    newImgList.splice(index, 1);
    setValue(newImgList);
  }
  function handleEdit(index: number, url: string) {
    const newImgList = [...value];
    newImgList[index] = url;
    setValue(newImgList);
  }
  function handleAdd(url: string[]) {
    setValue([...value, ...url]);
  }



  return (<>
    <ImageDesc
      value={value}
      onChange={(v) => {
        setValue(v);
      }}
      actionsRender={{
        add: <Add onOk={handleAdd} />,
        edit: (index) => <Edit onOk={(url) => handleEdit(index, url)} />,
        remove: (index) => <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => handleRemove(index)} />,
      }}
    />
  </>);
};
