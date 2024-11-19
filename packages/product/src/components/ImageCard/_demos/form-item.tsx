/**
 * iframe: true
 * title: 图片表单
 */
import BizImageCard from './basic';
import { Form } from 'antd';

export default () => {
  return (
    <Form
      onValuesChange={(_, values) => {
        console.log('values', values);
      }}
    >
      <Form.Item name={['image', 'image1']} rules={[{ required: true }]}>
        <BizImageCard />
      </Form.Item>
    </Form>
  );
};
