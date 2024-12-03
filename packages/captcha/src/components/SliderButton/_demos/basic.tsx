/**
 * title: 基本使用
 * description: 基本使用
 */

import { useState } from 'react';
import { SliderButtonCaptcha } from '@web-rc/biz-components';
export default () => {
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [tracks, setTracks] = useState<{ x: number, y: number, t: number }[]>([]);
  return (<>
    <div style={{ width: 400, padding: 20 }}>
      <SliderButtonCaptcha
        onStart={(ev) => {
          const timestamp = Date.now();
          setStartTime(timestamp)
          setTracks([{ x: ev.pageX, y: ev.pageY, t: timestamp }]);
          console.log('onStart', ev);
        }}
        onMove={(ev) => {
          const timestamp = Date.now();
          setTracks([...tracks, { x: ev.pageX, y: ev.pageY, t: timestamp }]);
          console.log('onMove', ev);
        }}
        onEnd={(ev) => {
          const timestamp = Date.now();
          setEndTime(timestamp);
          setTracks([...tracks, { x: ev.pageX, y: ev.pageY, t: Date.now() }]);
          console.log('onEnd', ev);
        }}
        onVerify={() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(true);
            }, 3000);
          });
        }} />
    </div>
    {/* moveDistance:{moveDistance}<br /> */}
    startTime:{startTime}<br />
    endTime:{endTime}<br />
    tracks:<br />
    {tracks?.map((item, index) => <div key={index}>{index}、x:{item.x},y:{item.y},t:{item.t}</div>)}
  </>
  );
};
