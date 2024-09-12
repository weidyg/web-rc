import { CSSProperties, forwardRef, Key, ReactNode, Ref, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { Button, Flex, message, Modal, ModalProps, Popover, PopoverProps, Spin, Typography, UploadFile } from 'antd';
import { classNames, useMergedState } from '@web-react/biz-utils';
import { useStyle } from './style';
import React from 'react';
import FolderTree, { FolderTreeType } from './FolderTree';

type BaseRequestParam = {
  page: number,
  size: number,
  folderId?: Key
}

type ImageSpaceProps = {
  className?: string;
  style?: CSSProperties;
  defaultFolder?: FolderTreeType;
  fetchFolders?: () => Promise<FolderTreeType[]>;
};

interface ImageSpaceRef {

}

const InternalImageSpace = forwardRef<ImageSpaceRef, ImageSpaceProps>((
  props: ImageSpaceProps,
  ref: Ref<ImageSpaceRef>
) => {
  const { prefixCls, wrapSSR, hashId, token } = useStyle();
  const { defaultFolder, fetchFolders } = props;
  const [dirloading, setDirLoading] = useState(false);
  const [folderId, setFolderId] = useState<Key>(defaultFolder?.value || '');
  const [folders, setFolders] = useState<FolderTreeType[]>(defaultFolder ? [defaultFolder] : []);

  useImperativeHandle(ref, () => ({

  }));

  useEffect(() => {
    loadDirs();
    // loadData({ page: curPage + 1, fist: true });
  }, []);

  useEffect(() => {
    // if (folderId) { loadData({ page: 1 }); }
  }, [folderId]);

  const loadDirs = async () => {
    setDirLoading(true);
    try {
      const data = await fetchFolders?.() || [];
      const folders = defaultFolder && !data.some(s => s.value === defaultFolder.value)
        ? [defaultFolder, ...data]
        : data;
      setFolders(folders);
    } catch (error: any) {
      message.error(error?.message || '加载失败');
    } finally {
      setDirLoading(false);
    }
  };

  return wrapSSR(
    <div className={classNames(`${prefixCls}`, hashId)}>
      {/* <div className={classNames(`${prefixCls}-header`, hashId)}>

      </div> */}
      <div className={classNames(`${prefixCls}-body`, hashId)}>
        <div className={classNames(`${prefixCls}-aside`, hashId)}>
          <div className={classNames(`${prefixCls}-treeDom`, hashId)} >
            {/* {dirloading &&
              <div className={classNames(`${prefixCls}-mask`, hashId)}>
                <Spin spinning={true} />
              </div>
            } */}
            <FolderTree
              data={folders}
              value={folderId}
              onChange={(val) => {
                setFolderId(val);
              }} />
          </div>
        </div>
        <div className={classNames(`${prefixCls}-container`, hashId)}>
          <div className={classNames(`${prefixCls}-container-top`, hashId)}>

          </div>
          <div className={classNames(`${prefixCls}-container-list`, hashId)}>
            <div style={{ height: '1000px', }}>

            </div>
          </div>
        </div>
      </div>
      <div className={classNames(`${prefixCls}-footer`, hashId)}>
        2
      </div>
    </div>
  );
}
);


type CompoundedComponent = typeof InternalImageSpace & {

};
const ImageSpace = InternalImageSpace as CompoundedComponent;

export default ImageSpace;
export type {
  ImageSpaceProps,
  ImageSpaceRef,
};