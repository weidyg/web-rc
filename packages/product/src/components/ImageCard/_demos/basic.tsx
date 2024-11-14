/**
 * title: 基本使用
 * description: 基本的图片卡片
 */

import { ReactNode, useEffect, useRef, useState } from 'react';
import { DirType, ImageFile, ImageCard, ImageSpace, ImageSpaceRef, ImageUploader } from '@web-rc/biz-components';
import { Button, Flex, Form, FormItemProps, Input, MenuProps, Popover, Segmented, Select, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

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

export default () => {
  const [value, setValue] = useState<string>();
  const [type, setType] = useState<'mini' | '1_1' | '3_4'>('mini');
  const [searchParam, setSearchParam] = useState({ type: 'picture', value: '', order: 'timeDes' });

  const defaultFolder = '0';
  const [folderLoading, setFolderLoading] = useState(false);
  const [folders, setFolders] = useState<DirType[]>();
  const [isOpen, setIsOpen] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const _imageSpaceRef = useRef<ImageSpaceRef>(null);

  useEffect(() => {
    if (isOpen && folders == undefined) {
      loadDirs();
    }
  }, [isOpen]);

  const handleRefresh = () => {
    _imageSpaceRef?.current?.refresh();
  };
  const handleOpen = (open: boolean) => {
    setIsOpen(open);
    setTimeout(() => {
      setIsUpload(false);
      _imageSpaceRef?.current?.clearSelected();
    }, 500);
  };
  const loadDirs = async () => {
    setFolderLoading(true);
    setTimeout(() => {
      setFolders(dirs);
      setFolderLoading(false);
    }, 1000);
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: '替换',
      onClick: () => {
        setIsOpen(true);
      },
    },
    {
      key: '2',
      label: '删除',
      onClick: () => {
        setValue(undefined);
      },
    },
    {
      key: '3',
      label: '裁剪',
      onClick: () => { },
    },
  ];

  const { status } = Form.Item.useStatus();
  return (
    <div style={{ margin: 20 }}>
      <Button
        onClick={() => {
          setValue(files[0].fullUrl);
        }}
      >
        重置
      </Button>

      <Segmented<string>
        options={['mini', '1_1', '3_4']}
        onChange={(value) => {
          setType(value as any);
        }}
      />

      <ImageCard
        status={status}
        menus={items}
        value={value}
        onChange={(value) => {
          setValue(value);
        }}
        placeholder={type == 'mini' ? undefined : '上传图片'}
        style={type == '1_1' ? { width: 90, height: 90 } : type == '3_4' ? { width: 90, height: 120 } : undefined}
      >
        {(children) => {
          return (
            <Popover
              title="选择图片"
              trigger={'click'}
              arrow={false}
              content={
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
                    mutiple={false}
                    onChange={({ files }) => {
                      if (files?.length > 0) {
                        handleOpen(false);
                        setValue(files[0]?.fullUrl);
                      }
                    }}
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
              }
              open={isOpen}
              destroyTooltipOnHide={false}
              onOpenChange={(open, e) => {
                if (!value || (value && !open)) {
                  handleOpen?.(open);
                }
              }}
            >
              {children}
            </Popover>
          );
        }}
      </ImageCard>
    </div>
  );
};
