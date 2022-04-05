import { CSSProperties, DetailedHTMLProps, HTMLAttributes } from 'react';
import { camelCase } from 'lodash';

export type HTMLObject = {
  tag: string
  attributes: Record<string, string | CSSProperties>
  children: Array<HTMLObject | string>
}

export const elementToJson = (el: Element): HTMLObject | string => {
  // TODO: include text type elements

  const attributes = Array.from(el.attributes).reduce((p, a) => ({ ...p, [a.name]: a.value }), {});

  const children = Array.from(el.children).map(elementToJson);

  return { tag: el.tagName, attributes, children }
}

export const htmlToJson = (el: Element | string): HTMLObject | string => {
  const html: Element = typeof el === 'string' ? parseHtml(el) : el;
  return elementToJson(html);
}

export const parseHtml = (html: string): Element => {
  const parser = new DOMParser();
  return parser.parseFromString(html, 'text/html').body.firstChild as Element;
}

const parseAttrs = (attrs: Record<string, string | CSSProperties>) => {
  const attributes: Record<string, string | CSSProperties> = {}
  for (let [k, v] of Object.entries(attrs)) {
    attributes[parseAttribute(k)] = v;
  }
  return attributes;
}

const reactFormat = (obj: HTMLObject): HTMLObject => {
  return {
    tag: camelCase(obj.tag),
    attributes: parseAttrs(obj.attributes),
    children: (obj.children as Array<HTMLObject>).map(reactFormat)
  }
}

const attributes: Record<string, string> = {
  accept: 'accept',
  ['accept-charset']: 'acceptCharset',
  accesskey: 'accessKey',
  action: 'action',
  alt: 'alt',
  async: 'async',
  autocomplete: 'autoComplete',
  autofocus: 'autoFocus',
  autoplay: 'autoPlay',
  charset: 'charSet',
  checked: 'checked',
  class: 'className',
  cols: 'cols',
  colspan: 'colSpan',
  content: 'content',
  contenteditable: 'contentEditable',
  controls: 'controls',
  coords: 'coords',
  data: 'data',
  datetime: 'dateTime',
  defer: 'defer',
  dir: 'dir',
  disabled: 'disabled',
  download: 'download',
  draggable: 'draggable',
  enctype: 'encType',
  for: 'htmlFor',
  form: 'form',
  formaction: 'formAction',
  headers: 'headers',
  height: 'height',
  hidden: 'hidden',
  high: 'high',
  href: 'href',
  hreflang: 'hrefLang',
  ['http-equiv']: 'httpEquiv',
  id: 'id',
  label: 'label',
  lang: 'lang',
  list: 'list',
  loop: 'loop',
  low: 'low',
  max: 'max',
  maxlength: 'maxLength',
  media: 'media',
  method: 'method',
  min: 'min',
  multiple: 'multiple',
  muted: 'muted',
  name: 'name',
  novalidate: 'noValidate',
  open: 'open',
  optimum: 'optimum',
  pattern: 'pattern',
  placeholder: 'placeholder',
  poster: 'poster',
  preload: 'preload',
  readonly: 'readOnly',
  rel: 'rel',
  required: 'required',
  rows: 'rows',
  rowspan: 'rowSpan',
  sandbox: 'sandbox',
  scope: 'scope',
  selected: 'selected',
  shape: 'shape',
  size: 'size',
  sizes: 'sizes',
  span: 'span',
  spellcheck: 'spellCheck',
  src: 'src',
  srcdoc: 'srcDoc',
  srcset: 'srcSet',
  start: 'start',
  step: 'step',
  style: 'style',
  tabindex: 'tabIndex',
  target: 'target',
  title: 'title',
  type: 'type',
  usemap: 'useMap',
  value: 'value',
  width: 'width',
  wrap: 'wrap',
};

const parseAttribute = (attribute: string) => {
  return attributes[attribute] || attribute;
}
