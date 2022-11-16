/**
 * 
 */
export default <T = unknown>(arr: Array<T> = [], from: number, to: number): Array<T> => {
  const _arr = [...arr];
  const element = _arr[from];
  _arr.splice(from, 1);
  _arr.splice(to, 0, element);
  return _arr
}
