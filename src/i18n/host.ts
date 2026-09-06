import { Children, createElement, useContext, type ReactNode } from 'react';
import { LanguageContext } from './context';
import { translate, type Language } from './translate';

function content(value: ReactNode, language: Language): ReactNode {
  if (typeof value === 'string') return translate(value, language);
  if (Array.isArray(value)) return Children.toArray(value).map(child => content(child, language));
  return value;
}

/** React-owned text localization: no DOM rewriting, extra DOM nodes or remounts.
 * The presentation boundary never localizes values, ids, event handlers or data.
 */
export function LocalizedHost({ tag, original }: { tag: string; original: Record<string, unknown> }) {
  const { language } = useContext(LanguageContext);
  if (original.translate === 'no' || ['script', 'style', 'textarea'].includes(tag)) return createElement(tag, original);
  const props = { ...original };
  if (tag === 'option' && props.value === undefined && typeof props.children === 'string') props.value = props.children;
  for (const key of ['title', 'placeholder', 'aria-label', 'aria-description', 'alt']) {
    if (typeof props[key] === 'string') props[key] = translate(props[key] as string, language);
  }
  props.children = content(props.children as ReactNode, language);
  return createElement(tag, props);
}
