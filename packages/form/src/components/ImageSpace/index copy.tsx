// import { ReactNode, useState } from 'react';
// import classNames from 'classnames';
// import { Button, Checkbox, Flex, Input, Segmented, Select, Space, Table, Tree, Typography } from 'antd';
// import { AppstoreOutlined, BarsOutlined, SearchOutlined } from '@ant-design/icons';
// import PicCard from './PicCard';
// import PicUploader, { DisplayPanelType } from './PicUploader';
// import { useStyle } from './style';
// import dataJson from './data.json';

// type ImageSpaceProps = {
//   /** 类名 */
//   className?: string;
//   /** 样式 */
//   style?: React.CSSProperties;
//   /** 自定义样式前缀 */
//   prefixCls?: string;

//   onChange?: (value: boolean, prevValue: boolean) => void;
// };

// const ImageSpace: React.FC<ImageSpaceProps> = (props) => {
//   const { style, className } = props;
//   const { prefixCls, wrapSSR, hashId, token } = useStyle(props.prefixCls);
//   const classString = classNames(prefixCls, className, hashId, {});
//   const [displayPanel, setDisplayPanel] = useState<DisplayPanelType>('uploader');
//   const [showType, setShowType] = useState<'list' | 'table'>('list');
//   const [okDisabled, setOkDisabled] = useState(true);

//   const handleOk = (e: any) => {

//   };
//   const handleRefresh = (e: any) => {

//   };

//   const DataList = () => {
//     return <div className={classNames(`${prefixCls}-dashboard-list-document`, hashId)}>
//       {dataJson.files.fileModule.map((item, index) => (
//         <PicCard
//           key={index}
//           id={item.pictureId}
//           name={item.name}
//           fullUrl={item.fullUrl}
//           pixel={item.pixel}
//           isRef={item.ref}
//           onChange={(value: boolean, prevValue: boolean) => {
//             console.log('PicCard onChange', value, prevValue);
//           }}
//         />
//       ))}
//       {Array.from({ length: 10 }).map((item, index) => (
//         <i key={index} className={classNames(`${prefixCls}-pic-dom`, hashId)} />
//       ))}
//     </div>
//   }
//   const DataTable = () => {
//     return <Table
//       size="middle"
//       scroll={{ y: 'calc(-170px + 100vh)' }}
//       pagination={false}
//       columns={[
//         {
//           dataIndex: 'name',
//           title: '文件',
//           render: (value, record) => (
//             <div style={{ overflow: 'hidden', display: 'flex' }}>
//               <div style={{ margin: '8px 10px 0px 0px', }}>
//                 <Checkbox></Checkbox>
//               </div>
//               <div
//                 style={{
//                   width: '36px',
//                   height: '36px',
//                   borderRadius: '6px',
//                   objectFit: 'contain',
//                 }}
//               >
//                 <img
//                   src={record.fullUrl}
//                   style={{
//                     width: '36px',
//                     height: '36px',
//                     borderRadius: '6px',
//                     objectFit: 'contain',
//                   }}
//                 />
//               </div>
//               <div
//                 style={{
//                   maxWidth: '105px',
//                   fontWeight: '400',
//                   fontFamily: 'PingFangSC',
//                   marginLeft: '10px',
//                   transform: 'translateY(-4px)',
//                   cursor: 'pointer',
//                 }}
//               >
//                 <p
//                   style={{
//                     fontSize: '12px',
//                     textAlign: 'center',
//                     whiteSpace: 'nowrap',
//                     overflow: 'hidden',
//                     textOverflow: 'ellipsis',
//                   }}
//                 >
//                   {value}
//                 </p>
//               </div>
//             </div>
//           ),
//         },
//         { dataIndex: 'pixel', title: '尺寸' },
//         { dataIndex: 'sizes', title: '大小' },
//         { dataIndex: 'status', title: '状态' },
//         {
//           dataIndex: 'ref',
//           title: '是否引用',
//           render: (value, record) => <> {value + ''}</>,
//         },
//         { dataIndex: 'gmtModified', title: '修改时间' },
//         {
//           dataIndex: 'action',
//           title: '操作',
//           render: (_, record) => (
//             <Flex gap={4}>
//               <Button type="link" style={{ padding: 'unset' }}>
//                 预览
//               </Button>
//               <Button type="link" style={{ padding: 'unset' }}>
//                 AI图片编辑
//               </Button>
//             </Flex>
//           ),
//         },
//       ]}
//       dataSource={dataJson.files.fileModule}
//     />
//   }
//   const SearchForm = () => {
//     return <Space>
//       <Space.Compact>
//         <Select
//           style={{ width: '100px' }}
//           popupMatchSelectWidth={false}
//           defaultValue={'picture'}
//           options={[
//             { label: '图片', value: 'picture' },
//             { label: '宝贝名称', value: 'name' },
//             { label: '宝贝ID', value: 'id' },
//           ]}
//         />
//         <Input style={{ width: '120px' }} suffix={<SearchOutlined />} placeholder={'搜索'} />
//       </Space.Compact>
//       <Select
//         defaultValue={'timeDes'}
//         options={[
//           { label: '文件名升序', value: 'nameAsc' },
//           { label: '文件名降序', value: 'nameDes' },
//           { label: '上传时间升序', value: 'timeAsc' },
//           { label: '上传时间降序', value: 'timeDes' },
//         ]}
//         style={{ width: '147px', }}
//       />
//     </Space>
//   }
//   const FolderTree = () => {
//     const items: any[] = [
//       {
//         key: 'sub1',
//         title: '全部图片',
//       },
//       {
//         key: 'sub2',
//         title: '妙手搬家-勿删',
//         children: [
//           {
//             key: 'g1',
//             title: '202407',
//             children: [
//               {
//                 key: 'g11',
//                 title: '20240711',
//                 children: [
//                   {
//                     key: 'g1221',
//                     title: '20240711222',
//                   },
//                 ],
//               },
//             ]
//           },
//         ],
//       },
//     ];
//     const options = items.flatMap((node: any) => {
//       if (node.children) {
//         const nodes = node.children.flatMap((child: any) => [child, ...flatTreeHelper(child.children)]);
//         return [node, ...nodes];
//       }
//       return node;
//     });
//     function flatTreeHelper(children: any[] | undefined): any[] {
//       if (!children || children.length === 0) { return []; }
//       return children.flatMap(child => [child, ...flatTreeHelper(child.children)]);
//     }
//     return <>
//       <Select style={{ width: '100%', marginBottom: '8px' }}
//         showSearch
//         options={options}
//       />
//       <Tree
//         blockNode
//         showIcon={true}
//         treeData={items}
//         onClick={(e) => console.log(e)}
//         onSelect={(e) => console.log(e)}
//       />
//     </>
//   }

//   return wrapSSR(
//     <div className={classString} style={style}>
//       <div className={classNames(`${prefixCls}-body`, hashId)}>
//         <div className={classNames(`${prefixCls}-aside`, hashId)}>
//           <div className={classNames(`${prefixCls}-treeDom`, hashId)} >
//             <FolderTree />
//           </div>
//         </div>
//         <div className={classNames(`${prefixCls}-dashboard`, hashId)}>
//           {/* <div style={{ display: 'flex', flexGrow: 1, flexBasis: '100%', position: 'absolute', background: 'rgba(255, 255, 255, 0.5)', zIndex: -1, width: '100%', height: '100%' }} /> */}
//           <div className={classNames(`${prefixCls}-dashboard-header`, hashId)}>
//             <div className={classNames(`${prefixCls}-dashboard-header-actions`, hashId)}>
//               <div className={classNames(`${prefixCls}-dashboard-header-actions-left`, hashId)}>
//                 <Space>
//                   <Segmented
//                     defaultValue={showType}
//                     options={[
//                       { value: 'list', icon: <AppstoreOutlined /> },
//                       { value: 'table', icon: <BarsOutlined /> },
//                     ]}
//                     onChange={(value: any) => {
//                       setShowType(value)
//                     }}
//                   />
//                   <Button onClick={handleRefresh}>刷新</Button>
//                   <SearchForm />
//                 </Space>
//               </div>
//               <div className={classNames(`${prefixCls}-dashboard-header-actions-right`, hashId)}>
//                 <Button type="primary" onClick={() => { setDisplayPanel('uploader') }}>
//                   上传图片
//                 </Button>
//               </div>
//             </div>
//           </div>
//           {showType == 'list' ? (
//             <div className={classNames(`${prefixCls}-dashboard-list`, hashId)}>
//               <DataList />
//             </div>
//           ) : (
//             <div className={classNames(`${prefixCls}-dashboard-table`, hashId)}>
//               <DataTable />
//             </div>
//           )}
//         </div>
//         <PicUploader
//           display={displayPanel}
//           onDisplayChange={(val) => { setDisplayPanel(val) }}
//         />
//       </div>
//       <div className={classNames(`${prefixCls}-footer`, hashId)}>
//         <Flex align='center'>
//           <></>
//           {/* <Typography.Link target="_blank"
//             href="https://www.volcengine.com/product/imagex"
//             style={{ marginLeft: '18px' }}>
//             进入图片空间
//           </Typography.Link> */}
//         </Flex>
//         <Flex align='center' style={{ flexDirection: 'row-reverse', }}>
//           <Button
//             type="primary"
//             className={classNames(`${prefixCls}-footer-selectOk`, hashId)}
//             disabled={okDisabled}
//             onClick={handleOk}
//           >
//             确定
//           </Button>
//         </Flex>
//       </div>
//     </div>
//   );
// };

// export type { ImageSpaceProps };
// export default ImageSpace;
