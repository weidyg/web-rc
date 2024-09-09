/**
 * title: 销售属性输入组件
 * description: 基本的销售属性输入组件
 */
import { useState } from "react";
import { Button, Form, Input, Space, Switch, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dataJson from './_data.json';
import { SaleProp, SalePropValueType } from "@web-react/biz-components";

export default () => {
  const [uniqueGroup, setUniqueGroup] = useState<boolean>(true);
  const [allowCustom, setAllowCustom] = useState<boolean>(false);
  return (<>
    <div style={{ margin: 20, maxWidth: 600 }} >
      <Space align="center" style={{ marginBottom: 16 }}>
        <div>允许自定义: <Switch checked={allowCustom} onChange={setAllowCustom} /></div>
        <div>唯一组合: <Switch checked={uniqueGroup} onChange={setUniqueGroup} /></div>
      </Space>
      <div>
        <Form
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
                    if (fields?.length === 0) { add(); }
                    const group = form.getFieldValue(groupName);
                    const values: SalePropValueType[] = form.getFieldValue(valueName);
                    const disabledAdd = values?.some((item) => !item?.text);
                    return <>
                      <SaleProp
                        uniqueGroup={uniqueGroup}
                        options={uniqueGroup ? dataJson.size : dataJson.color}
                        group={group}
                        values={values}
                        onGroupChange={(group) => {
                          form.setFieldValue(groupName, group);
                        }}
                        onClear={() => {
                          form.setFieldValue(valueName, []);
                        }}
                        onAdd={(values) => {
                          values?.forEach((item) => { add(item); });
                        }}
                      >
                        {fields.map(({ key, name, ...restField }) => (
                          <Form.Item key={key}  {...restField} name={[name]}>
                            <SaleProp.Input allowCustom={allowCustom} onRemove={() => { remove(name); }} />
                          </Form.Item>
                        ))}
                        <Form.Item>
                          <Button
                            type='text'
                            icon={<PlusOutlined />}
                            onClick={() => { add(); }}
                            disabled={disabledAdd}
                          >
                            新 增
                          </Button>
                        </Form.Item>
                      </SaleProp>
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
      </div>
    </div>
  </>);
};
