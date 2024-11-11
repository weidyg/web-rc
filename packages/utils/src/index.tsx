export * from './images';
import classNames from 'classnames';
import useMergedState from './hooks/useMergedState';
import useForceUpdate from './hooks/useForceUpdate';
import useCountdown from './hooks/useCountdown';
import useInterval from './hooks/useInterval';
import useCopyClick from './hooks/useCopyClick';
import TransButton from './transButton';

const convertByteUnit = (bytes: number, digits?: number): string => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let unitIndex = 0;
  while (bytes >= 1024 && unitIndex < units.length - 1) {
    bytes /= 1024;
    unitIndex++;
  }
  return `${bytes.toFixed(digits || 2)} ${units[unitIndex]}`;
};

export {
  classNames,
  TransButton,
  useCopyClick,
  convertByteUnit,
  useMergedState,
  useForceUpdate,
  useCountdown,
  useInterval,
};
