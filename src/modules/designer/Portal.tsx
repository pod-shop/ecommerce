import React, { ReactNode, useEffect, useLayoutEffect, useRef } from 'react';
import Konva from 'konva';
import { Group } from 'react-konva';

export type PortalProps = {
  selector: string
  enabled: boolean
  children: Array<ReactNode>
}

/**
 * Allows to create portal from one Konva container (such as Layer or Group) into another.
 * 
 * @param param0 
 * @returns 
 */
export const Portal = ({ selector, enabled, children }: PortalProps) => {
  // "selector" is a string to find another container to insert all internals
  // if can be like ".top-layer" or "#overlay-group"
  const outer = useRef<Konva.Group>(null);
  const inner = useRef<Konva.Group>(null);

  const safeRef = useRef<Konva.Group>();
  const shouldMove = enabled ?? true;

  useLayoutEffect(() => {
    if (!outer.current || !inner.current) {
      return;
    }
    safeRef.current = inner.current;
    const stage = outer.current.getStage() as Konva.Stage;
    const newContainer = stage.findOne(selector);
    if (shouldMove && newContainer) {
      inner.current.moveTo(newContainer);
    } else {
      inner.current.moveTo(outer.current);
    }
    // manually redraw layers
    outer?.current?.getLayer()?.batchDraw();
    if (newContainer) {
      newContainer.getLayer()?.batchDraw();
    }
  }, [selector, shouldMove]);

  useEffect(() => {
    return () => {
      // manually destroy
      safeRef.current?.destroy();
    };
  }, []);

  // for smooth movement we will have to use two group
  // outer - is main container, will be placed on old position
  // inner - that we will move into another container
  return (
    <Group name="_outer_portal" ref={outer}>
      <Group name="_inner_portal" ref={inner}>
        {children}
      </Group>
    </Group>
  );
};

export default Portal;
