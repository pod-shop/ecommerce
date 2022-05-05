import { IRect } from "konva/lib/types";

/**
 * 
 */
export default (r1: IRect, r2: IRect) => {
  return !(
    r2.x > r1.x + r1.width ||
    r2.x + r2.width < r1.x ||
    r2.y > r1.y + r1.height ||
    r2.y + r2.height < r1.y
  );
}
