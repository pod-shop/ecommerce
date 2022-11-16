
import { kebabCase } from 'lodash';

export default (el: SVGSVGElement | string) => {
  // let el = typeof svg === 'string' ? null : svg;
  let svg: SVGSVGElement;

  if (typeof el === 'string') {
    const div = document.createElement('div');
    div.innerHTML = el;
    svg = div.getElementsByTagName('svg')[0];
  } else {
    svg = el;
  }

  console.log('svg:', svg)
  console.log('children:', getChildrenRecursively(svg.children))
}

const parseElement = (el: SVGElement) => {
  const els = [];

}

const getChildrenRecursively = (els: HTMLCollection): Array<Element> => {
  const result: Array<Element> = [];
  for (const el of els) {
    if (el.children.length) {
      result.push(...getChildrenRecursively(el.children));
    } else {
      result.push(el);
    }
  }
  return result;
}

const parseAttrs = (el: Element): Record<string, string> => {
  const attrs: Record<string, string> = {};
  for (const { name, value } of el.attributes) {
    attrs[kebabCase(name)] = value;
  }
  return attrs;
}
