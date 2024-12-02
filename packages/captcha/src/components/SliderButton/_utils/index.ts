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

export function toggleTransitionCls(
  barEl: HTMLDivElement | null,
  actionEl: HTMLDivElement | null,
  value: boolean
) {
  if (actionEl) { actionEl.classList[value ? 'add' : 'remove']('transition-left'); }
  if (barEl) { barEl.classList[value ? 'add' : 'remove']('transition-width'); }
}