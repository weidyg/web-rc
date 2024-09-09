/**
 * title: 基本使用
 * description: 基本的图片输入组件
 */

import { forwardRef, Key, Ref, useEffect, useImperativeHandle, useRef, useState } from "react";
import { DisplayPanelType, FolderTreeType, ImageFile, ImageInput, ImageSpace, ImageSpaceRef } from "@web-react/biz-components";
import { Button, Input, Select, Space } from "antd";

import dataJson from './_data.json';
import { SearchOutlined } from "@ant-design/icons";
type ImageSelectProps = {
  mutiple?: boolean;
  onOk?: (files: ImageFile[]) => void | Promise<void>;
}
type ImageSelectRef = {
  clearSelected: () => void,
  setDisplay: (display: DisplayPanelType) => void
}
const ImageSelect = forwardRef<ImageSelectRef, ImageSelectProps>((
  props: ImageSelectProps,
  ref: Ref<ImageSelectRef>
) => {
  const { mutiple = true, onOk } = props;
  const _ref = useRef<ImageSpaceRef>(null);
  const [searchParam, setSearchParam] = useState({ type: 'picture', value: '', order: 'timeDes', });

  const [selectKeys, setSelectKeys] = useState<Key[]>([]);
  const [selectFiles, setSelectFiles] = useState<ImageFile[]>([]);

  const changeSelect = (keys: Key[], files: ImageFile[]) => {
    setSelectKeys(keys);
    setSelectFiles(files);
  }

  useImperativeHandle(ref, () => _ref.current!)

  useEffect(() => {
    handleRefresh();
  }, [searchParam.order]);

  const handleRefresh = () => {
    _ref?.current?.refresh();
  }

  const handleSelect = async (files: ImageFile[]) => {
    await onOk?.(files);
  }

  return (<>
    <ImageSpace
      ref={_ref}
      actions={{
        left: <Space>
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
      }}
      footer={{
        right: mutiple && (
          (count) => <Button
            type="primary"
            disabled={count == 0}
            onClick={() => handleSelect(selectFiles)}
          >
            确定{count > 0 && `（${count}）`}
          </Button>
        )
      }}
      defaultFolder={{ value: '0', label: '全部图片', }}
      fetchFolders={() => {
        return new Promise<FolderTreeType[]>((resolve, reject) => {
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
      value={selectKeys}
      onChange={async (keys, files) => {
        changeSelect(keys, files);
        if (!mutiple) {
          await handleSelect(files);
        }
      }}
      style={{
        width: '880px',
        height: '600px',
      }}
      mutiple={mutiple}
    />
  </>);
});
const Edit = (props: {
  onOk?: (url: string) => void | Promise<void>;
  children: React.ReactNode;
}) => {
  const { children, onOk } = props;
  const [isOpen, setIsOpen] = useState(false);
  return (<>
    <ImageSpace.Popover
      destroyTooltipOnHide
      open={isOpen}
      onOpenChange={setIsOpen}
      content={
        <ImageSelect
          mutiple={false}
          onOk={(files) => {
            const urls = files.map((file) => file.fullUrl!);
            if (urls?.length > 0) {
              onOk?.(urls[0]);
              setIsOpen(false);
            }
          }}
        />
      }
    >
      {children}
    </ImageSpace.Popover>
  </>
  )
};


export default () => {
  const [value, setValue] = useState<string>();
  return (
    <div style={{ margin: 20 }}>
      <Space>

        <Button onClick={() => setValue("https://img.alicdn.com/imgextra/i3/1035339340/O1CN01e6wCqc2IrmErsQuYd_!!1035339340.jpg_320x320q80_.webp")}>重置</Button>

        <ImageInput
          value={value}
          onChange={(value) => {
            setValue(value);
          }}

        />

        <ImageInput
          placeholder='上传图片'
          style={{ width: 90, height: 90 }}
          value={value}
          onChange={(value) => {
            setValue(value);
          }}
        />

        <ImageInput
          placeholder='上传图片'
          style={{ width: 90, height: 120 }}
          value={value}
          onChange={(value) => {
            setValue(value);
          }}
        />
      </Space>
    </div>
  );
};
