import { forwardRef, Key, Ref, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Button, Input, Select, Space } from 'antd';
import { DeleteOutlined, EditOutlined, FileImageOutlined, SearchOutlined } from '@ant-design/icons';
import { DescImgEditor, DisplayPanelType, FolderTreeType, ImageFile, ImageSpace, ImageSpaceRef, } from '@web-react/biz-components';

import dataJson from './_data.json';
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

const Add = (props: { onOk?: (url: string[]) => void | Promise<void>; }) => {
  const { onOk } = props;
  const _ref = useRef<ImageSelectRef>(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (!isOpen) {
      _ref?.current?.clearSelected();
      _ref?.current?.setDisplay('none');
    }
  }, [isOpen]);
  return (<>
    <ImageSpace.Modal
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <ImageSelect
        ref={_ref}
        mutiple={true}
        onOk={(files) => {
          const urls = files.map((file) => file.fullUrl!);
          onOk?.(urls);
          setIsOpen(false);
        }}
      />
    </ImageSpace.Modal>

    <Button icon={<FileImageOutlined />}
      shape="round" type="primary"
      onClick={() => {
        setIsOpen(true);
      }}>
      添加图片
    </Button>
  </>
  )
};

const Edit = (props: { onOk?: (url: string) => void | Promise<void>; }) => {
  const { onOk } = props;
  const _ref = useRef<ImageSelectRef>(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (!isOpen) {
      _ref?.current?.clearSelected();
      _ref?.current?.setDisplay('none');
    }
  }, [isOpen]);
  return (<>
    <ImageSpace.Popover
      open={isOpen}
      onOpenChange={setIsOpen}
      content={
        <ImageSelect
          ref={_ref}
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
      <EditOutlined style={{ cursor: 'pointer' }} />
    </ImageSpace.Popover>
  </>
  )
};

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
    <DescImgEditor
      value={value}
      onChange={(v) => {
        setValue(v);
      }}
      renderActions={{
        add: <Add onOk={handleAdd} />,
        edit: (index) => <Edit onOk={(url) => handleEdit(index, url)} />,
        remove: (index) => <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => handleRemove(index)} />,
      }}
    />
  </>);
};
