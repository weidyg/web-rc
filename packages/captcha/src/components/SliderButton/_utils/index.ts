import { MouseOrTouchEvent, SliderEvent } from "..";

export function getSliderEvent<T>(e: MouseOrTouchEvent<T>): SliderEvent {
  if ('touches' in e && e.touches[0]) { return e.touches[0]; }
  return e as SliderEvent;
}

export function getOffset(
  wrapperEl?: HTMLDivElement | null,
  actionEl?: HTMLDivElement | null
) {
  const wrapperWidth = wrapperEl?.offsetWidth ?? 220;
  const actionWidth = actionEl?.offsetWidth ?? 40;
  const offset = wrapperWidth - actionWidth - 6;
  return { offset, actionWidth, wrapperWidth };
}