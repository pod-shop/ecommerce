export const deepFreeze = (obj: any) => {
  const propNames = Object.getOwnPropertyNames(obj);
  // Freeze properties before freezing self
  for (const name of propNames) {
    const value = obj[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(obj);
}

export const shallowCopy = (o: any) => {
  if (Array.isArray(o)) {
    return Object.assign([], o);
  }
  return Object.assign({}, o);
}

export const set = (o: any, k: string | number, v: any) => {
  let copy = shallowCopy(o);
  copy[k] = v;
  return copy;
}

export const setIn = (m: any, [k, ...restOfPath]: Array<string | number>, v: any) => {
  let modifiedNode = v;
  if (restOfPath.length > 0) {
    modifiedNode = setIn(m[k], restOfPath, v);
  }
  return set(m, k, modifiedNode);
}
