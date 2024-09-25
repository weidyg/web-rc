/**
 * iframe: true
 * title: 图片上传器
 * description: 基本的图片空间展示
 */
import { useEffect, useRef, useState } from 'react';
import { Button, Flex, Input, Select, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import dataJson from './_data.json';
import { DirType, ImageFile, ImageSpace, ImageSpaceRef, ImageUploader } from '@web-react/biz-components';
export default () => {
  const _ref = useRef<ImageSpaceRef>(null);
  const [isUpload, setIsUpload] = useState(false);
  const [searchParam, setSearchParam] = useState({ type: 'picture', value: '', order: 'timeDes', });
  useEffect(() => {
    handleRefresh();
  }, [searchParam.order]);

  const handleRefresh = () => {
    _ref?.current?.refresh();
  }
  return (
    <div style={{
      width: 'calc(100vw - 0px)',
      height: 'calc(100vh - 0px)',
      overflow: 'hidden',
    }}>
      {isUpload ? (
        <ImageUploader
          configRender={(dom) => {
            return <Flex style={{ width: '100%' }}
              align='center' justify='space-between'>
              {dom}
              <Button onClick={() => {
                setIsUpload(false);
              }}>取消上传</Button>
            </Flex>
          }}
          defaultFolder={'0'}
          folders={() => {
            return new Promise<any[]>((resolve, reject) => {
              setTimeout(() => {
                resolve(dataJson.dirs);
              }, 1000);
            })
          }}
          upload={{
            action: 'http://localhost:49007/api/services/app/ProductPublish/UploadImages',
            normalize: {
              uploadResponse: (res) => {
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
      ) : (
        <ImageSpace
          ref={_ref}
          actionsRender={(dom) => {
            return <Flex style={{ width: '100%' }}
              align='flex-start' justify='space-between'>
              <Space wrap>
                {dom}
                <Space.Compact>
                  <Select
                    style={{ width: '100px' }}
                    popupMatchSelectWidth={false}
                    value={searchParam.type}
                    options={[
                      { label: '图片', value: 'picture' },
                      { label: '宝贝名称', value: 'name' },
                      { label: '宝贝ID', value: 'id' },
                    ]}
                    onChange={(value) => {
                      setSearchParam(data => ({ ...data, type: value }));
                    }}
                  />
                  <Input
                    allowClear
                    style={{ width: '180px' }}
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
                </Space.Compact>
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
                  }}
                  style={{ width: '147px', }}
                />
              </Space>
              <Button onClick={() => {
                setIsUpload(true);
              }}>上传</Button>
            </Flex>
          }}
          defaultFolder={'0'}
          folders={() => {
            return new Promise<any[]>((resolve, reject) => {
              setTimeout(() => {
                resolve(dataJson.dirs);
              }, 1000);
            })
          }}
          fetchData={(param) => {
            const queryParam = { ...param, ...searchParam }
            const { page, size } = queryParam;
            return new Promise<{ items: ImageFile[], total: number, }>((resolve, reject) => {
              setTimeout(() => {
                const newData: ImageFile[] = dataJson.files
                  .slice((page - 1) * size, page * size)
                  .map((file) => ({ ...file, id: file.id + '_' + page, }));
                resolve({ items: newData, total: dataJson.files.length, });
              }, 1000);
            })
          }}
        />
      )}
    </div>);
};
