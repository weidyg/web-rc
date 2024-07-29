import { Checkbox, Image, message } from 'antd';
import { CheckOutlined, CopyOutlined, ExpandOutlined, LoadingOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useStyle } from './style';
import { useEffect, useState } from 'react';
import useCopyClick from 'antd/es/typography/hooks/useCopyClick';
import TransButton from 'antd/es/_util/transButton';
import useMergedState from 'rc-util/es/hooks/useMergedState';

const refImage =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAD50lEQVR4AdXBQWhbBRzH8e/vvbdlfQtdk8rqdtCB2kmj60mUrDAQhhdRd5DtNHSgB+nFOteDGzRgcR1lXupFsQe32w7bQRBFEKR2F0WdW5Fphe0yO21Su/Q16ZL8DVsYJdj0JU3a+vmIBsyZxUoBSUQfRg8Qx4iZiAFx7kvLyCAyQBoxhTHh+Ex2SBnqJELKmnXlA/plvIJImCEaIGEY10xciviMRaUZQhCrmM9Zd6HIceCoGRGaSeQE5zyX0fZtuk4NoobZwAZkjJjh0UISBRODnb7OsgLxH8wsmg4Yx3iV9SQuxH2OScpSxaWKmUUzC3wHPM/6S+Tu8uLp4aHzqVRqiWUcqqQDxg32sUEM9qUDxqnissxsYAMYb7PxEoMnh+6cGU5dpsKhYj5ne2WMsEnIGJnPWTcVDhWFIu+Y4dFii0tw9SZcvQm3/2FFZniFIsepEGVZs66lgBtmRFjBVz/Dlz/RkN49cPQA91y/BSfOcc+R/XBkPysTuYjPnqg041GWD+jHiFBDOgvTMzTk4RiNMbblA/qBUx5lMg4ZtXVGoXsXoRVLMD3Dmsk4BJzy5sxipYAejJoO9sLBXkLL3YUjH7J2omfOLOaUApJmiE3KDJUCkg6ijxYoFGge0edh9BDCD3/A99OEduMvHmjbwtoYPR4QJ4TfbsEXP9KQ3kdZq7iHEaNFom3w7GPw3F7Wxoh5JuIYdfn0LdjRxqo8l6YwEfeAGHXyBJ7Leoo5/E94QBrYTR3OfQtbtxDa3l1wIMFapD0ZGYPd1OHrX6jL0tNwIEHDZGQ8RAZjVRK4DnUplmgOkfGANCEcTsLhJKHNLcBrH9EsaQcxxWYnphyMCTY7Y8JxfCYljCbL36UpJMzxmfQ6pEw6a1NAghDGv4GFRVb1+20eaPdpnHGtQ8p4lJm4iJEghMlf4e871OXxLhpm4hJlDmURnzGJPCG4DjgCR+AIHIEjcASOwBE4AteBh9rhpWcg+SSNEbmIzxhloiK9YB+b8QYttrgE039yz84dsHMHK5L4JL5db1LmUeG5jBaKvG6GRwu1bYWnHmFVEgXPZZQKl4oP3k/Nnjg5tIDxApuBw7uxNn1OhcsyZ4ZTlwffG0oACTaSuNC5XQMs41Al7nNMcIUNIrgS9zlGFZcqqVRq6fTw0PnFAk8ACdaTuBDfzsuSslQRNcwGNiBjxAyPFpIomBjs9HWWFYhVzOesu1DkOHDUjAhNJJEHPvNcRtu36To1iJCyZl35gH4ZhxA9ZogGSBjGlImLEZ+xqDRDCKIBc2axUkAS0YfRA8QxYibiQIz7MjLSiAyQRkxhTDg+kx1Shjr9C2nCYhQQxQX2AAAAAElFTkSuQmCC';

type PicCardProps = {
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (value: boolean, prevValue: boolean) => void;
  prefixCls?: string;

  id?: string | number;
  name?: string;
  pixel?: string;
  fullUrl?: string;
  isRef?: boolean;
  onAiEdit?: (id?: string | number, fullUrl?: string) => void | Promise<void>;
};
const PicCard: React.FC<PicCardProps> = (props) => {
  const { id, name, fullUrl = '', pixel, isRef, onAiEdit } = props;
  const { prefixCls, wrapSSR, hashId } = useStyle(props?.prefixCls);
  const [preview, setPreview] = useState(false);
  const { copied, copyLoading, onClick: onCopyClick } = useCopyClick({ copyConfig: { text: fullUrl } });
  useEffect(() => {
    if (copied) {
      message.success('复制成功');
    }
  }, [copied]);
  const [checked, setChecked] = useMergedState<boolean>(props?.defaultChecked ?? false, {
    value: props?.checked,
    onChange: props?.onChange,
  });
  return wrapSSR(
    <div className={classNames(`${prefixCls}-picCard`, hashId)}>
      <div className={classNames(`${prefixCls}-picCard-background`, hashId)}>
        <label>
          <div className={classNames(`${prefixCls}-picCard-imgBox`, hashId)}>
            <Image
              src={fullUrl}
              // fallback={errImage}
              preview={{
                visible: preview,
                maskStyle: { backgroundColor: 'rgba(0, 0, 0, 0.65)' },
                src: fullUrl,
                mask: undefined,
                onVisibleChange: (value: boolean, prevValue: boolean) => {
                  if (value == false && prevValue == true) {
                    setPreview(value);
                  }
                },
              }}
            />
            {fullUrl && onAiEdit && (
              <span
                className={classNames(`${prefixCls}-picCard-ai-entry`, hashId)}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onAiEdit?.(id, fullUrl);
                }}
              >
                AI图片编辑
              </span>
            )}
          </div>
          {fullUrl && (
            <>
              <Checkbox
                checked={checked}
                onChange={() => {
                  setChecked(!checked);
                }}
                className={classNames(`${prefixCls}-picCard-checkbox`, hashId, {
                  ['checked']: checked,
                })}
              />
              <div
                className={classNames(`${prefixCls}-picCard-controlWrap`, hashId)}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                {pixel && <span className={classNames(`${prefixCls}-picCard-spec`, hashId)}>{pixel}</span>}
                <TransButton
                  style={{ display: 'none' }}
                  className={classNames(`${prefixCls}-picCard-copy`, hashId)}
                  onClick={onCopyClick}
                >
                  {copied ? <CheckOutlined /> : copyLoading ? <LoadingOutlined /> : <CopyOutlined />}
                </TransButton>
                <ExpandOutlined
                  className={classNames(`${prefixCls}-picCard-fullView`, hashId)}
                  onClick={() => {
                    setPreview(true);
                  }}
                />
              </div>
            </>
          )}
        </label>
        <div className={classNames(`${prefixCls}-picCard-title-wrap`, hashId)}>
          {isRef && (
            <div className={classNames(`${prefixCls}-picCard-title-svg`, hashId)}>
              <img src={refImage} alt="引用图片" style={{ width: '100%', height: '100%' }} />
            </div>
          )}
          <div className={classNames(`${prefixCls}-picCard-title-tip`, hashId)}>
            <span title={name}>{name}</span>
          </div>
        </div>
      </div>
    </div>,
  );
};

export type { PicCardProps };
export default PicCard;
