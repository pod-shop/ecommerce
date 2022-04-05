import { UIEvent } from 'react';

/**
 * 
 */
export default (event: UIEvent<HTMLElement>): number => {
  const containerHeight = event.currentTarget.clientHeight;
  const scrollHeight = event.currentTarget.scrollHeight;
  const scrollTop = event.currentTarget.scrollTop;

  return ((scrollTop + containerHeight) / scrollHeight) * 100;
}
