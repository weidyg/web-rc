/**
 * title: 基本使用
 * description: 基本的图片输入组件
 */

import { useMemo, useRef, useState } from "react";
import { ImageFile, ImageInput, ImageInputRef, ImageSpaceProps, ImageSpaceRef } from "@web-react/biz-components";
import { Button, Input, MenuProps, Segmented, Select, Space } from "antd";

import dataJson from './_data.json';
import { SearchOutlined } from "@ant-design/icons";

export default () => {
  const [value, setValue] = useState<string>();
  const [type, setType] = useState<'mini' | '1_1' | '3_4'>('mini');

  const [searchParam, setSearchParam] = useState({ type: 'picture', value: '', order: 'timeDes', });
  const ActionLeft = () => {
    const _ref = useRef<ImageSpaceRef>(null);
    const [searchParam, setSearchParam] = useState({ type: 'picture', value: '', order: 'timeDes', });
    return <Space>
      <Space.Compact>
        <Select
          style={{ width: '100px' }}
          popupMatchSelectWidth={false}
          options={[
            { label: '图片', value: 'picture' },
            { label: '宝贝名称', value: 'name' },
            { label: '宝贝ID', value: 'id' },
          ]}
          value={searchParam.type}
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
              _ref?.current?.refresh();
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
    </Space>;
  }

  const _imageInputRef = useRef<ImageInputRef>(null);
  const items: MenuProps['items'] = [
    {
      key: '1', label: '替换', onClick: () => {
        _imageInputRef?.current?.onOpen();
      }
    },
    {
      key: '2', label: '删除', onClick: () => {
        setValue(undefined);
      }
    },
    {
      key: '3', label: '裁剪', onClick: () => {

      }
    },
  ];

  return (
    <div style={{ margin: 20 }}>
      <Button onClick={() => {
        setValue("https://img.alicdn.com/imgextra/i3/1035339340/O1CN01e6wCqc2IrmErsQuYd_!!1035339340.jpg_320x320q80_.webp")
      }
      }>
        重置
      </Button>

      <Segmented<string>
        options={['mini', '1_1', '3_4']}
        onChange={(value) => {
          setType(value as any);
        }}
      />

      <ImageInput
        ref={_imageInputRef}
        menus={items}
        value={value}
        onChange={(value) => {
          setValue(value);
        }}
        placeholder={type == 'mini' ? undefined : '上传图片'}
        style={type == '1_1'
          ? { width: 90, height: 90 }
          : type == '3_4'
            ? { width: 90, height: 120 }
            : undefined
        }
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
              let newData: ImageFile[] = dataJson.files
                .slice((page - 1) * size, page * size)
                .map((file) => ({ ...file, id: file.id + '_' + page, }));
              resolve({ items: newData, total: newData.length, });
            }, 1000);
          })
        }}
      />
    </div>
  );
};
