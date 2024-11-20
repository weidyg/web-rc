/**
 * title: 基本使用
 * description: 基本的描述图编辑器
 */
import { forwardRef, ReactNode, Ref, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Button, Flex, Input, Modal, Popover, Select, Space } from 'antd';
import { DeleteOutlined, EditOutlined, FileImageOutlined, SearchOutlined } from '@ant-design/icons';
import {
  BizConfigProvider,
  DirType,
  ImageDesc,
  ImageFile,
  ImageSpace,
  ImageSpaceRef,
  ImageUploader,
} from '@web-rc/biz-components';

const dirs: DirType[] = Array.from({ length: 10 }, (_, i) => ({
  value: `${i}`,
  label: i == 0 ? '全部图片' : `目录${i}`,
  children:
    i / 3 == 0
      ? [
          {
            value: `sub${i}`,
            label: `子目录${i}`,
            children: [],
          },
        ]
      : [],
}));

const files: ImageFile[] = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  name: `图片${i}`,
  size: 8000,
  pixel: '220*220',
  fullUrl: `https://picsum.photos/id/${i}/220/220`,
}));

const Add = ({ onOk }: { onOk: (url: string[]) => void }) => {
  const _imageSpaceRef = useRef<ImageSpaceRef>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [urls, setUrls] = useState<string[]>([]);
  const handleOpen = (open: boolean) => {
    setIsOpen(open);
    setTimeout(() => {
      setUrls([]);
      _imageSpaceRef?.current?.clearSelected();
    }, 10);
  };
  return (
    <>
      <Modal
        title="选择图片"
        width={'fit-content'}
        styles={{ content: { width: 'fit-content' } }}
        open={isOpen}
        onCancel={() => handleOpen(false)}
        okButtonProps={{ disabled: urls.length == 0 }}
        onOk={() => {
          onOk?.(urls);
          handleOpen(false);
        }}
      >
        <ImageSpaceDom
          ref={_imageSpaceRef}
          mutiple={true}
          onChange={(urls) => {
            setUrls(urls);
          }}
        />
      </Modal>

      <Button
        icon={<FileImageOutlined />}
        shape="round"
        type="primary"
        onClick={() => {
          handleOpen(true);
        }}
      >
        添加图片
      </Button>
    </>
  );
};
const Edit = ({ onOk }: { onOk: (url: string) => void }) => {
  const _imageSpaceRef = useRef<ImageSpaceRef>(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = (open: boolean) => {
    setIsOpen(open);
    setTimeout(() => {
      _imageSpaceRef?.current?.clearSelected();
    }, 10);
  };
  return (
    <Popover
      title="选择图片"
      trigger={'click'}
      arrow={false}
      content={
        <ImageSpaceDom
          ref={_imageSpaceRef}
          mutiple={false}
          onChange={(urls) => {
            if (urls.length > 0) {
              onOk?.(urls[0]);
              setIsOpen(false);
            }
          }}
        />
      }
      open={isOpen}
      destroyTooltipOnHide={false}
      onOpenChange={(open, e) => {
        handleOpen?.(open);
      }}
    >
      <EditOutlined style={{ cursor: 'pointer' }} />
    </Popover>
  );
};

const ImageSpaceDom = forwardRef(
  (
    props: {
      mutiple?: boolean;
      onChange: (url: string[]) => void;
    },
    ref: Ref<ImageSpaceRef>,
  ) => {
    const { mutiple, onChange } = props;

    const [searchParam, setSearchParam] = useState({ type: 'picture', value: '', order: 'timeDes' });

    const defaultFolder = '0';
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
    };

    const handleChange = ({ files }: { files: ImageFile[] }) => {
      const urls = files.filter((f) => f != undefined).map((m) => m.fullUrl!) || [];
      onChange?.(urls);
    };
    const loadDirs = async () => {
      setFolderLoading(true);
      setTimeout(() => {
        setFolders(dirs);
        setFolderLoading(false);
      }, 1000);
    };
    return (
      <div style={{ width: '760px', height: '400px' }}>
        <ImageSpace
          ref={_imageSpaceRef}
          style={{ display: !isUpload ? '' : 'none' }}
          actionsRender={(dom) => {
            return (
              <Flex gap={4} style={{ width: '100%' }} wrap>
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
                      setSearchParam((data) => ({ ...data, type: value }));
                    }}
                  />
                  <Input
                    allowClear
                    style={{ width: '120px' }}
                    suffix={<SearchOutlined />}
                    placeholder={'搜索'}
                    value={searchParam.value}
                    onChange={(e) => {
                      setSearchParam((data) => ({ ...data, value: e.target.value }));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleRefresh();
                      }
                    }}
                  />
                </Space.Compact>
                ,
                <Select
                  options={[
                    { label: '文件名升序', value: 'nameAsc' },
                    { label: '文件名降序', value: 'nameDes' },
                    { label: '上传时间升序', value: 'timeAsc' },
                    { label: '上传时间降序', value: 'timeDes' },
                  ]}
                  value={searchParam.order}
                  onChange={(value) => {
                    setSearchParam((data) => ({ ...data, order: value }));
                    setTimeout(() => {
                      handleRefresh();
                    }, 500);
                  }}
                  style={{ width: '128px' }}
                />
                <Flex gap={4} flex={1} justify="flex-end">
                  <Button
                    onClick={() => {
                      setIsUpload(true);
                    }}
                  >
                    上传
                  </Button>
                </Flex>
              </Flex>
            );
          }}
          folderLoading={folderLoading}
          defaultFolder={defaultFolder}
          folders={folders || []}
          fetchData={(param) => {
            const queryParam = { ...param, ...searchParam };
            const { page, size } = queryParam;
            // console.log('queryParam', queryParam);
            return new Promise<{ items: ImageFile[]; total: number }>((resolve, reject) => {
              setTimeout(() => {
                let newData: ImageFile[] = files
                  .slice((page - 1) * size, page * size)
                  .map((file) => ({ ...file, id: file.id + '_' + page }));
                resolve({ items: newData, total: files.length });
              }, 1000);
            });
          }}
          mutiple={mutiple}
          onChange={handleChange}
        />
        <ImageUploader
          style={{ display: isUpload ? '' : 'none' }}
          configRender={(dom: ReactNode) => (
            <Flex style={{ width: '100%' }} align="center" justify="space-between">
              {dom}
              <Button
                onClick={() => {
                  setIsUpload(false);
                }}
              >
                取消上传
              </Button>
            </Flex>
          )}
          folderLoading={folderLoading}
          defaultFolder={defaultFolder}
          folders={folders}
          upload={{
            action: '/',
            normalize: {
              uploadResponse: (res: { Error: any; Result: {} }) => {
                const error = res.Error;
                const result = res.Result || {};
                const data = { ...result, error };
                // console.log('uploadResponse', data);
                return data;
              },
            },
          }}
          onUploaDone={() => {
            setTimeout(() => {
              setIsUpload(false);
            }, 1000);
          }}
        />
      </div>
    );
  },
);
export default () => {
  const [value, setValue] = useState<string[]>([]);
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

  return (
    <BizConfigProvider>
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
    </BizConfigProvider>
  );
};
