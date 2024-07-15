export type ImageSpaceProps = {
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: React.CSSProperties;

  children?: React.ReactNode;
};

export const WaterMark: React.FC<ImageSpaceProps> = (props) => {
  const { children, style, className } = props;

  return <div>{children}</div>;
};
