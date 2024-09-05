/**
 * title: 销售属性输入组件
 * description: 基本的销售属性输入组件
 */
import { useState } from "react";
import { Button, Form, Input, message, Select, Space, Switch, Typography } from "antd";
import { SalePropCard, SalePropInput, SalePropValueType, ValueType } from "@web-react/biz-components";
import dataJson from './_data.json';
import { DeleteColumnOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const onFinish = (values: any) => {
  console.log('Received values of form:', values);
};

// const single = !!current?.value;
export default () => {
  const [uniqueGroup, setUniqueGroup] = useState<boolean>(true);

  const [form] = Form.useForm();
  return (<>
    <Form
      form={form}
      name="dynamic_form_nest_item"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      autoComplete="off"
    >
      {/* <Form.List name={['saleProp', 'p-1627207']}>
        {(fields, { add, remove }) => (<>
          {fields.map(({ key, name, ...restField }) => (
            <Space key={key} wrap size={[4, 0]} style={{ marginBottom: "0px" }}>
              <Form.Item {...restField} name={[name]}>
                <SalePropInput
                  uniqueGroup={uniqueGroup}
                  options={uniqueGroup
                    ? dataJson.size
                    : dataJson.color
                  }
                />
              </Form.Item>
              <Form.Item>
                <Button type='text' danger
                  shape='circle'
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    remove(name);
                  }}>
                </Button>
              </Form.Item>
            </Space>
          ))}
          <Form.Item>
            <Button
              type='text'
              icon={<PlusOutlined />}
              onClick={() => { add(); }}
              style={{ padding: '2px' }}
            >
              新增
            </Button>
          </Form.Item>
        </>)}
      </Form.List> */}

      <Form.Item noStyle>
        <Form.Item
          name={['saleProp', 'p-20509', 'group']}
          normalize={(value) => {
            return value
              ? { text: value?.label, value: value?.value, }
              : value
          }}
          noStyle
        >
          <Select labelInValue options={dataJson.size} popupMatchSelectWidth />
        </Form.Item>
        <Form.List name={['saleProp', 'p-20509', 'value']}>
          {(fields, { add, remove }) => (<>
            <SalePropInput.Group
              uniqueGroup={uniqueGroup}
              options={uniqueGroup
                ? dataJson.size
                : dataJson.color
              }
              group={form.getFieldValue(['saleProp', 'p-20509', 'group'])}
              values={form.getFieldValue(['saleProp', 'p-20509', 'value'])}
              onGroupChange={(group) => {
                form.setFieldValue(['saleProp', 'p-20509', 'group'], group);
                for (let index = 0; index < fields.length; index++) { remove(index); }
              }}
              onAdd={(values) => {
                values?.forEach((item) => { add(item); });
              }}
            >
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} wrap size={[4, 0]} style={{ marginBottom: "0px" }}>
                  <Form.Item {...restField} name={[name]}>
                    <SalePropInput />
                  </Form.Item>
                  <Form.Item>
                    <Button danger
                      type='text'
                      shape='circle'
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        remove(name);
                      }}>
                    </Button>
                  </Form.Item>
                </Space>
              ))}
            </SalePropInput.Group>
            <Form.Item>
              <Button
                type='text'
                icon={<PlusOutlined />}
                onClick={() => { add(); }}
                style={{ padding: '2px' }}
              >
                新增
              </Button>
            </Form.Item>
          </>)}
        </Form.List>
      </Form.Item>

      <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item>


    </Form>
  </>);
};
