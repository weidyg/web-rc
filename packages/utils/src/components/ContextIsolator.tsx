import React, { PropsWithChildren, useContext, useMemo } from 'react';
import { Form } from 'antd';
// import { SpaceCompactItemContext } from 'antd/es/space/Compact';

export type NoFormStyleProps = PropsWithChildren<{
  status?: boolean;
  override?: boolean;
}>;
export const NoFormStyle: React.FC<NoFormStyleProps> = ({ children, status, override }) => {
  const FormItemInputContext = (Form.Item.useStatus as any).Context;
  const formItemInputContext: any = useContext(FormItemInputContext);
  const newFormItemInputContext = useMemo(() => {
    const newContext = { ...formItemInputContext };
    if (override) {
      delete newContext.isFormItemInput;
    }
    if (status) {
      delete newContext.status;
      delete newContext.hasFeedback;
      delete newContext.feedbackIcon;
    }
    return newContext;
  }, [status, override, formItemInputContext]);

  return <FormItemInputContext.Provider value={newFormItemInputContext}>{children}</FormItemInputContext.Provider>;
};

// export const NoCompactStyle: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
//   <SpaceCompactItemContext.Provider value={null}>{children}</SpaceCompactItemContext.Provider>
// );

export const ContextIsolator: React.FC<
  Readonly<React.PropsWithChildren<Partial<Record<'space' | 'form', boolean>>>>
> = (props) => {
  const { space, form, children } = props;
  if (children === undefined || children === null) {
    return null;
  }
  let result: React.ReactNode = children;
  if (form) {
    result = (
      <NoFormStyle override status>
        {result}
      </NoFormStyle>
    );
  }
  // if (space) {
  //   result = <NoCompactStyle>{result}</NoCompactStyle>;
  // }
  return result;
};
