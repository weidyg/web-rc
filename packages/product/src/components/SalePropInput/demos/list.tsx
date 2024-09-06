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

  return (<>
    <Form
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
      <Form.Item noStyle shouldUpdate>
        {(form) => (<>
          <Form.Item name={['saleProp', 'p-20509', 'group']} hidden noStyle>
            <Input />
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
                  console.log("onGroupChange", group);
                  var old = form.getFieldValue(['saleProp', 'p-20509', 'group']);
                  if (old?.value && group?.value != old.value && uniqueGroup) {
                    for (let index = 0; index < fields.length; index++) {
                      console.log("remove", index, form.getFieldValue(['saleProp', 'p-20509', 'value', fields[index].name]));
                      remove(index);
                    }
                  }
                  form.setFieldValue(['saleProp', 'p-20509', 'group'], group);
                }}
                // onAdd={(values) => {
                //   console.log("onAdd", values);
                //   values?.forEach((item) => { add(item); });
                // }}
              >
                {fields.map(({ key, name, ...restField }) => (
                  <Form.Item key={key}  {...restField} name={[name]}>
                    <SalePropInput onRemove={() => { remove(name); }} />
                  </Form.Item>
                ))}
              </SalePropInput.Group>
              <Form.Item>
                <Button
                  type='text'
                  icon={<PlusOutlined />}
                  onClick={() => { add(); }}
                >
                  新增
                </Button>
              </Form.Item>
            </>)}
          </Form.List>
        </>)}
      </Form.Item>

      <Form.Item noStyle shouldUpdate>
        {(form) => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item>


    </Form>
  </>);
};
