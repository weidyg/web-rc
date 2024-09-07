/**
 * title: 销售属性输入组件
 * description: 基本的销售属性输入组件
 */
import { useState } from "react";
import { Button, Form, Input, message, Select, Space, Switch, Typography } from "antd";
import { DeleteColumnOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { SalePropCard, SalePropInput, SalePropValueType, ValueType } from "@web-react/biz-components";
import dataJson from './_data.json';

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
      <Form.Item noStyle shouldUpdate>
        {(form) => {
          const groupName = ['saleProp', 'p-20509', 'group'];
          const valueName = ['saleProp', 'p-20509', 'value'];
          return <>
            <Form.Item name={groupName} hidden noStyle>
              <Input />
            </Form.Item>
            <Form.List name={valueName}>
              {(fields, { add, remove }) => {
                return <>
                  <SalePropInput.Group
                    uniqueGroup={uniqueGroup}
                    options={uniqueGroup ? dataJson.size : dataJson.color}
                    group={form.getFieldValue(groupName)}
                    onGroupChange={(group) => {
                      form.setFieldValue(groupName, group);
                    }}


                    onAdd={(values) => {
                      // console.log("onAdd", values);
                      values?.forEach((item) => { add(item); });
                    }}
                  >
                    {fields.map(({ key, name, ...restField }) => (
                      <Form.Item key={key}  {...restField} name={[name]}>
                        <SalePropInput allowCustom onRemove={() => { remove(name); }} />
                      </Form.Item>
                    ))}
                  </SalePropInput.Group>
                  <Form.Item>
                    <Button
                      type='text'
                      icon={<PlusOutlined />}
                      onClick={() => { add(); }}
                    >
                      新 增
                    </Button>
                  </Form.Item>
                </>
              }}
            </Form.List>
          </>
        }}
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
