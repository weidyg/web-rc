import { SliderEvent } from "..";

export function getEventPageCoordinate(e: SliderEvent): [number, number] {
  if ('pageX' in e) {
    return [e.pageX, e.pageY];
  } else if ('touches' in e && e.touches[0]) {
    const ev = e.touches[0];
    return [ev.pageX, ev.pageY];
  }
  return [0, 0];
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