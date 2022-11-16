/* eslint-disable react/display-name */
import { forwardRef, Fragment, LegacyRef, RefObject, useEffect, useRef, useState } from 'react';
import { Arc, Arrow, Circle, Ellipse, KonvaNodeEvents, Line, Path, Rect, RegularPolygon, Ring, Shape, Sprite, Star, Tag, Text, TextPath, Transformer, Wedge, Image, Group } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { EllipseConfig } from 'konva/lib/shapes/Ellipse';
import { ArcConfig } from 'konva/lib/shapes/Arc';
import { ArrowConfig } from 'konva/lib/shapes/Arrow';
import { RegularPolygonConfig } from 'konva/lib/shapes/RegularPolygon';
import { SpriteConfig } from 'konva/lib/shapes/Sprite';
import { StarConfig } from 'konva/lib/shapes/Star';
import { WedgeConfig } from 'konva/lib/shapes/Wedge';
import { RingConfig } from 'konva/lib/shapes/Ring';
import { Shape as ShapeType } from 'konva/lib/Shape';
import { Image as ImageType } from 'konva/lib/shapes/Image';
import { Transformer as TransformerType } from 'konva/lib/shapes/Transformer';
//import { Portal, useImage } from 'react-konva-utils';
import Portal from './Portal';
import useImage from '@/hooks/useImage';
import { ShapeProps } from '@/types/renderer';

const MIN_SIZE = 5;

export type TransformableShapeProps = {
  shapeProps: ShapeProps
  isSelected: boolean
  onSelect: (e: KonvaEventObject<Event>) => void
  onChange: (shapeProps: ShapeProps) => void
}

export const TransformableShape = ({ shapeProps, isSelected, onSelect, onChange }: TransformableShapeProps) => {
  const shapeRef = useRef<ShapeType>();
  const transformerRef = useRef<TransformerType>();
  const [isDragging, setIsDragging] = useState<boolean>(false)

  useEffect(() => {
    if (isSelected) {
      shapeRef.current && transformerRef?.current?.nodes([shapeRef.current]);
      transformerRef?.current?.getLayer()?.batchDraw();
    }
  }, [isSelected, transformerRef]);

  const handleDragStart = (e: KonvaEventObject<DragEvent>) => {
    setIsDragging(true)
  }

  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    setIsDragging(false)
    onChange?.({
      ...shapeProps,
      x: e.target.x(),
      y: e.target.y(),
    });
  }

  const handleTransformEnd = (e?: KonvaEventObject<Event>) => {
    const node = shapeRef.current;
    if (node) {
      // const scaleX = node.scaleX();
      // const scaleY = node.scaleY();

      // node.scaleX(1);
      // node.scaleY(1);

      const _shapeProps = {
        ...shapeProps,
        x: node.x(),
        y: node.y(),
        // width: Math.max(MIN_SIZE, node.width() * scaleX),
        // height: Math.max(node.height() * scaleY),
        rotation: node.rotation()
      }

      // if (_shapeProps.type === 'Text' || _shapeProps.type === 'TextPath') {
      // (_shapeProps as TextConfig).fontSize = ((_shapeProps as TextConfig).fontSize ?? 1) * scaleY;
      // }

      onChange?.(_shapeProps);
    }
  }

  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {
    const target = e.target;
    const targetRect = e.target.getClientRect();
    // layer.children.forEach((group) => {
    //   // do not check intersection with itself
    //   if (group === target) {
    //     return;
    //   }
    //   if (haveIntersection(group.getClientRect(), targetRect)) {
    //     group.findOne('.fillShape').fill('red');
    //   } else {
    //     group.findOne('.fillShape').fill('grey');
    //   }
    // });
  }

  const buildShape = (shapeProps: ShapeProps, editable: boolean = true) => {
    const props: ShapeProps & KonvaNodeEvents = !editable ? shapeProps : {
      ...shapeProps,
      ref: shapeRef,
      onClick: onSelect,
      onTap: onSelect,
      onDragStart: handleDragStart,
      onDragEnd: handleDragEnd,
      onTransformEnd: handleTransformEnd,
      onDragMove: handleDragMove
    }

    switch (shapeProps.type) {
      case 'Rect': return <Rect {...props} />;
      case 'Circle': return <Circle {...props} />;
      case 'Ellipse': return <Ellipse {...(props as EllipseConfig)} />;
      case 'Wedge': return <Wedge {...(props as WedgeConfig)} />;
      case 'Line': return <Line {...props} />;
      case 'Sprite': return <Sprite {...(props as SpriteConfig)} />;
      case 'Text': return <Text {...props} />;
      case 'TextPath': return <TextPath {...props} />;
      case 'Star': return <Star {...(props as StarConfig)} />;
      case 'Ring': return <Ring {...(props as RingConfig)} />;
      case 'Arc': return <Arc {...(props as ArcConfig)} />;
      case 'Tag': return <Tag {...props} />;
      case 'Path': return <Path {...props} />;
      case 'RegularPolygon': return <RegularPolygon {...(props as RegularPolygonConfig)} />;
      case 'Arrow': return <Arrow {...(props as ArrowConfig)} />;
      case 'Shape': return <Shape {...props} />;
      case 'Image': return <URLImage {...props} />;
      case 'Shape': return <Shape {...props} />;
      case 'Group': {
        const { children, ...groupProps } = props;
        return <Group {...groupProps}>
          {(children).map((e: any, i: number) => (
            <Fragment key={e.id ?? i}>
              {buildShape({ ...e, draggable: false }, false)}
            </Fragment>
          ))}
        </Group>
      };
      default: return null;
    }
  }

  return (
    <>
      <Portal selector=".top-layer" enabled={isDragging}>
        {buildShape(shapeProps)}
        {isSelected && (
          <Transformer
            id={`tr-${shapeProps.id}`}
            ref={transformerRef as RefObject<TransformerType>}
            padding={1}
            borderDash={[5, 3]}
            enabledAnchors={shapeProps.type === 'Text' ? ['top-left', 'top-right', 'bottom-left', 'bottom-right'] : undefined} //['top-left', 'top-center', 'top-right', 'middle-right', 'middle-left', 'bottom-left', 'bottom-center', 'bottom-right']
            boundBoxFunc={(oldBox, newBox) => {
              if (newBox.width < MIN_SIZE || newBox.height < MIN_SIZE) {
                return oldBox;
              }
              return newBox;
            }}
          />
        )}
      </Portal>
    </>
  );
};

const URLImage = forwardRef(({ src, ...props }: ShapeProps & KonvaNodeEvents, ref?: LegacyRef<ImageType>) => {
  const [image, status] = useImage(src);

  return status === 'loaded' ? <Image alt={''} {...props} ref={ref} image={image} /> : null;
});

export default TransformableShape;
