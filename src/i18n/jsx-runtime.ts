import { jsx as reactJsx, jsxs as reactJsxs } from 'react/jsx-runtime';
import { LocalizedHost } from './host';
export { Fragment } from 'react/jsx-runtime';
export type { JSX } from 'react/jsx-runtime';

export const jsx: typeof reactJsx = (type, props, key) => typeof type === 'string'
  ? reactJsx(LocalizedHost, { tag: type, original: props }, key)
  : reactJsx(type, props, key);
export const jsxs: typeof reactJsxs = (type, props, key) => typeof type === 'string'
  ? reactJsx(LocalizedHost, { tag: type, original: props }, key)
  : reactJsxs(type, props, key);
