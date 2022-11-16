import { RefObject, useEffect, useRef, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { ShapeProps } from '@/types/renderer';
import { Stage as StageType } from 'konva/lib/Stage';
import TransformableShape from './TransformableShape';

export type RendererProps = {
  width?: number
  height?: number
  shapes: Array<ShapeProps>
  onChange: (shape: ShapeProps) => void
  onStageRef?: (ref: RefObject<StageType>) => void
  onSelectShape?: (id?: string) => void
}

export const Renderer = ({ width = 100, height = 100, shapes = [], onChange, onStageRef, onSelectShape }: RendererProps) => {
  const stageRef = useRef<StageType>(null);
  const [selectedShape, setSelectedShape] = useState<string>();

  useEffect(() => {
    onStageRef?.(stageRef);
  }, [onStageRef, stageRef])

  useEffect(() => {
    onSelectShape?.(selectedShape);
  }, [onSelectShape, selectedShape])

  useEffect(() => {
    const handleClick = (event: Event) => {
      if (!stageRef?.current?.content.contains(event.target as Node)) {
        setSelectedShape(undefined);
      }
    };

    if (selectedShape) {
      //document.addEventListener('click', handleClick);
    } else {
      //document.removeEventListener('click', handleClick);
    }

    return () => {
      //document.removeEventListener('click', handleClick);
    }
  }, [selectedShape])

  useEffect(() => {
    const handleKeyDowm = (event: KeyboardEvent) => {
      const currentShape = shapes.find(e => e.id === selectedShape);
      const DELTA = 1;
      if (currentShape) {
        const attrs = { ...currentShape };
        if (event.key === 'ArrowLeft') {
          if (attrs.x !== undefined) attrs.x = attrs.x - DELTA;
        } else if (event.key === 'ArrowRight') {
          if (attrs.x !== undefined) attrs.x = attrs.x + DELTA;
        } else if (event.key === 'ArrowUp') {
          if (attrs.y !== undefined) attrs.y = attrs.y - DELTA;
        } else if (event.key === 'ArrowDown') {
          if (attrs.y !== undefined) attrs.y = attrs.y + DELTA;
        } else {
          return;
        }
        onChange(attrs);
        event.preventDefault();
      }
    };

    if (selectedShape) {
      document.addEventListener('keydown', handleKeyDowm);
    } else {
      document.removeEventListener('keydown', handleKeyDowm);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDowm);
    }
  }, [onChange, selectedShape, shapes])

  const checkDeselect = (e: KonvaEventObject<MouseEvent | TouchEvent | PointerEvent>) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedShape(undefined);
    }
  }

  return (
    <>
      <Stage
        id='renderer-stage'
        ref={stageRef}
        width={width}
        height={height}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        className='designer-stage'
      >
        <Layer>
          {shapes?.map((shape, i) => {
            return (
              <TransformableShape
                key={shape.id || `${shape.type ?? 'shape'}-${i}`}
                shapeProps={shape}
                isSelected={shape.id === selectedShape}
                onSelect={() => {
                  setSelectedShape(shape.id);
                }}
                onChange={onChange}
              />
            );
          })}
        </Layer>
        <Layer name='top-layer' />
      </Stage>
    </>
  )
}

export default Renderer;
