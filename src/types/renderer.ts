import { ContainerConfig } from 'konva/lib/Container';
import { NodeConfig } from 'konva/lib/Node';
import { Shape, ShapeConfig, shapes } from 'konva/lib/Shape';
import { Arc, ArcConfig } from 'konva/lib/shapes/Arc';
import { Arrow, ArrowConfig } from 'konva/lib/shapes/Arrow';
import { Circle, CircleConfig } from 'konva/lib/shapes/Circle';
import { Ellipse, EllipseConfig } from 'konva/lib/shapes/Ellipse';
import { Image, ImageConfig } from 'konva/lib/shapes/Image';
import { Tag, TagConfig } from 'konva/lib/shapes/Label';
import { Line, LineConfig } from 'konva/lib/shapes/Line';
import { Path, PathConfig } from 'konva/lib/shapes/Path';
import { Rect, RectConfig } from 'konva/lib/shapes/Rect';
import { RegularPolygon, RegularPolygonConfig } from 'konva/lib/shapes/RegularPolygon';
import { Ring, RingConfig } from 'konva/lib/shapes/Ring';
import { Sprite, SpriteConfig } from 'konva/lib/shapes/Sprite';
import { Star, StarConfig } from 'konva/lib/shapes/Star';
import { Text, TextConfig } from 'konva/lib/shapes/Text';
import { TextPath, TextPathConfig } from 'konva/lib/shapes/TextPath';
import { Wedge, WedgeConfig } from 'konva/lib/shapes/Wedge';

export type Shapes = Rect | Circle | Ellipse | Wedge | Line | Sprite | Text | TextPath | Star | Ring | Arc | Tag | Path | RegularPolygon | Arrow | Image | Shape;
export type ShapeTypes = 'Rect' | 'Circle' | 'Ellipse' | 'Wedge' | 'Line' | 'Sprite' | 'Text' | 'TextPath' | 'Star' | 'Ring' | 'Arc' | 'Tag' | 'Path' | 'RegularPolygon' | 'Arrow' | 'Image' | 'Shape' | 'Group';

export type ShapeProps = {
  id: string
  type: ShapeTypes
} & (RectConfig
  | CircleConfig
  | EllipseConfig
  | WedgeConfig
  | LineConfig
  | SpriteConfig
  | TextConfig
  | TextPathConfig
  | StarConfig
  | RingConfig
  | ArcConfig
  | TagConfig
  | PathConfig
  | RegularPolygonConfig
  | ArrowConfig
  | (ImageConfig & { src: string })
  | ShapeConfig
  | NodeConfig
  | (ContainerConfig & { children: Array<ShapeProps> }));
