
import { DeleteOutlined, EditOutlined, FileImageOutlined, SearchOutlined } from '@ant-design/icons';
import { DescImgEditor, FolderTreeType, ImageFile, ImageSpace, ImageSpaceRef, useMergedState, } from '@web-react/biz-components';
import { Button, Input, Select, Space, Typography } from 'antd';
import { forwardRef, Key, Ref, SetStateAction, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';

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

import dataJson from './_data.json';
import { DisplayPanelType } from '../../ImageSpace/Uploader';

type ImageSelectProps = {
  mutiple?: boolean;
  onOk?: (files: ImageFile[]) => void | Promise<void>;
}
type ImageSelectRef = {
  clearSelect: () => void,
  setDisplay: (display: DisplayPanelType) => void,
}
const ImageSelect = forwardRef<ImageSelectRef, ImageSelectProps>((
  props: ImageSelectProps,
  ref: Ref<ImageSelectRef>
) => {
  const { mutiple, onOk } = props;
  const _ref = useRef<ImageSpaceRef>(null);
  const [searchParam, setSearchParam] = useState({ type: 'picture', value: '', order: 'timeDes', });

  const [selectKeys, setSelectKeys] = useState<Key[]>([]);
  const [selectFiles, setSelectFiles] = useState<ImageFile[]>([]);
  const [displayPanel, setDisplayPanel] = useState<DisplayPanelType>('none');

  const changeSelect = (keys: Key[], files: ImageFile[]) => {
    setSelectKeys(keys);
    setSelectFiles(files);
  }

  useImperativeHandle(ref, () => ({
    clearSelect: () => {
      changeSelect([], []);
    },
    setDisplay: (display: DisplayPanelType) => {
      setDisplayPanel(display);
    }
  }))

  useEffect(() => {
    handleRefresh();
  }, [searchParam.order]);

  const handleRefresh = () => {
    _ref?.current?.onRefresh();
  }

  const handleSelect = async () => {
    await onOk?.(selectFiles);
    changeSelect([], []);
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
            onClick={handleSelect}
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
      // defaultValue={defaultValue}
      value={selectKeys}
      onChange={async (keys, files) => {
        changeSelect(keys, files);
        if (!mutiple) {
          await handleSelect();
        }
      }}
      display={displayPanel}
      onDisplayChange={setDisplayPanel}
      style={{
        width: '880px',
        height: '600px',
      }}
      mutiple={mutiple}
    />
  </>);
});


export default () => {
  const [value, setValue] = useState<string[]>(imgList);

  function handleRemove(index: number) {
    const newImgList = [...value];
    newImgList.splice(index, 1);
    setValue(newImgList);
  }

  function handleEdit(index: number) {

  }

  function handleAdd() {
    setMutiple(true);
    handleModalOpenChange(true);
  }


  const _ref = useRef<ImageSelectRef>(null);
  const [mutiple, setMutiple] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpenChange = (open: boolean) => {
    setIsModalOpen(open);
    if (open) {
      _ref?.current?.setDisplay('none');
      _ref?.current?.clearSelect();
    }
  };

  const children = <ImageSelect
    ref={_ref}
    mutiple={mutiple}
    onOk={(files) => {
      console.log('onOk', files);
      const urls = files.map((file) => file.fullUrl!);
      setValue([...value, ...urls]);
      handleModalOpenChange(false);
    }}
  />;

  return (<>
    <ImageSpace.Modal
      open={isModalOpen}
      onOpenChange={handleModalOpenChange}
    >
      {children}
    </ImageSpace.Modal>

    <DescImgEditor
      value={value}
      onChange={(v) => {
        setValue(v);
      }}
      renderActions={{
        add: <Button icon={<FileImageOutlined />} shape="round" type="primary" onClick={handleAdd}>添加图片</Button>,
        edit: (index) => <EditOutlined style={{ cursor: 'pointer' }} onClick={() => handleEdit(index)} />,
        remove: (index) => <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => handleRemove(index)} />,
      }}
    />
  </>);
};
