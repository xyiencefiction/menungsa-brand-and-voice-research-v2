import { jsxDEV as reactJsxDEV } from 'react/jsx-dev-runtime';
import { LocalizedHost } from './host';
export { Fragment } from 'react/jsx-dev-runtime';
export type { JSX } from 'react/jsx-dev-runtime';

export const jsxDEV: typeof reactJsxDEV = (type, props, key, staticChildren, source, self) => {
  // Keep React's development validation of compiler-generated static children.
  const element = reactJsxDEV(type, props, key, staticChildren, source, self);
  return typeof type === 'string'
    ? reactJsxDEV(LocalizedHost, { tag: type, original: element.props }, key, false, source, self)
    : element;
};
