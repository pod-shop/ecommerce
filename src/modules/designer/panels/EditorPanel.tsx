import dynamic from 'next/dynamic';
import { Button } from 'primereact/button';
import { ShapeProps } from '@/types/renderer';
import ImageEditor from '../editors/ImageEditor';
// import { TextEditor } from '../editors';

const TextEditor = dynamic(
  () => import('../editors/TextEditor'),
  { ssr: false }
);

export type EditorPanelProps = {
  shape: ShapeProps
  onChange: (shapeProps: ShapeProps) => void
  onBringForward: (id: string) => void
  onSendBackward: (id: string) => void
  onDuplicate: (id: string) => void
  onRemove: (id: string) => void
}

export const EditorPanel = ({ shape, onChange, onBringForward, onSendBackward, onDuplicate, onRemove }: Partial<EditorPanelProps>) => {

  const onChangeText = (text: string) => {
    const attrs = {
      ...(shape || {}),
      text: text
    }
    onChange?.(attrs as ShapeProps);
  }

  const onChangeTextColor = (color: string) => {
    const attrs = {
      ...(shape || {}),
      fill: color
    }
    onChange?.(attrs as ShapeProps);
  }

  const onChangeTextStyle = (style: string) => {
    const attrs = {
      ...(shape || {}),
      fontStyle: style
    }
    onChange?.(attrs as ShapeProps);
  }

  const onChangeTextFamily = (family: string) => {
    const attrs = {
      ...(shape || {}),
      fontFamily: family
    }
    onChange?.(attrs as ShapeProps);
  }

  const onChangeTextAlignment = (alignment: string) => {
    const attrs = {
      ...(shape || {}),
      align: alignment
    }
    onChange?.(attrs as ShapeProps);
  }

  const onChangeTextDecoration = (decoration: string) => {
    const attrs = {
      ...(shape || {}),
      textDecoration: decoration
    }
    onChange?.(attrs as ShapeProps);
  }

  if (!shape) return null;

  return (
    <>
      <div className='card bg-white shadow-1'>
        {shape.type === 'Text' &&
          <TextEditor
            text={shape.text}
            color={shape.fill}
            style={shape.fontStyle}
            family={shape.fontFamily}
            alignment={shape.align}
            decoration={shape.textDecoration}
            onChangeText={onChangeText}
            onChangeColor={onChangeTextColor}
            onChangeStyle={onChangeTextStyle}
            onChangeFamily={onChangeTextFamily}
            onChangeAlignment={onChangeTextAlignment}
            onChangeDecoration={onChangeTextDecoration}
          />
        }
        {shape.type === 'Image' &&
          <ImageEditor />
        }
        <div>
          <Button
            icon="pi pi-cloud-upload"
            className='p-button-text'
            onClick={() => onBringForward?.(shape.id)}
          />
          <Button
            icon="pi pi-cloud-download"
            className='p-button-text'
            onClick={() => onSendBackward?.(shape.id)}
          />
          <Button
            icon="pi pi-copy"
            className='p-button-text'
            onClick={() => onDuplicate?.(shape.id)}
          />
          <Button
            icon="pi pi-trash"
            className='p-button-text'
            onClick={() => onRemove?.(shape.id)}
          />
        </div>
      </div>
    </>
  )
}

export default EditorPanel;
