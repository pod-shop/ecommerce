import { useEffect, useState } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { SelectButton } from 'primereact/selectbutton';
import { Dropdown } from 'primereact/dropdown';
import { ColorPicker } from 'primereact/colorpicker';
import { kebabCase } from 'lodash';
import WebFontLoader from 'webfontloader';
import { fontFamilies } from '@/constants/renderer';

export type TextEditorProps = {
  text: string
  color: string
  style: string
  family: string
  alignment: string
  decoration: string
  onChangeText: (text: string) => void
  onChangeColor: (color: string) => void
  onChangeStyle: (style: string) => void
  onChangeFamily: (family: string) => void
  onChangeAlignment: (alignment: string) => void
  onChangeDecoration: (decoration: string) => void
}

type Option = { name: string, code: string }

export const TextEditor = ({ text, color, style, family, alignment, decoration, onChangeText, onChangeColor, onChangeAlignment, onChangeStyle, onChangeFamily, onChangeDecoration }: Partial<TextEditorProps>) => {
  const [fonts, setFonts] = useState<Array<Option>>([]);

  useEffect(() => {
    setFonts(fontFamilies.map(e => ({ name: e, code: kebabCase(e) })));

    const loadFonts = async () => {
      WebFontLoader.load({
        google: {
          families: fontFamilies
        }
      });
    }
    loadFonts();
  }, [])

  const updateStyle = (styles: Array<string>) => {
    onChangeStyle?.(!styles.length ? 'normal' : styles.join(' '));
  }

  const styleOptions = [
    { name: 'N', value: 'bold' },
    { name: 'I', value: 'italic' },
    // { name: 'Aa', value: '' }
  ];

  const decorationOptions = [
    { name: 'A', value: 'underline' },
    { name: 'A', value: 'line-through' },
    // { name: 'Aa', value: '' }
  ];

  const alignmentOptions = [
    { icon: 'pi pi-align-left', value: 'left' },
    { icon: 'pi pi-align-center', value: 'center' },
    { icon: 'pi pi-align-right', value: 'right' },
    // { icon: 'pi pi-align-justify', value: 'justify' }
  ];

  const decorationTemplate = (option: any) => (
    <span className='p-button-label p-c' style={{ textDecoration: option.value }}>{option.name}</span>
  )

  const alignmentTemplate = (option: any) => (
    <i className={option.icon}></i>
  )

  const fontFamilyOptionTemplate = (option: any) => {
    return (
      <div className="font-family-item">
        <span style={{ fontFamily: option.name }}>{option.name}</span>
      </div>
    );
  }

  const selectedFontFamilyTemplate = (option: Option, props: { placeholder: string }) => {
    if (option) {
      return (
        <div className="font-family-item font-family-item-value">
          <span style={{ fontFamily: option.name }}>{option.name}</span>
        </div>
      );
    }

    return (
      <span>
        {props.placeholder}
      </span>
    );
  }

  return (
    <>
      <div className=''>
        <InputTextarea
          value={text}
          className='m-2'
          rows={5}
          cols={30}
          autoResize
          onChange={(e) => onChangeText?.(e.target.value ?? '')}
        />

        <SelectButton
          value={style !== 'normal' ? style?.split(' ') : undefined}
          options={styleOptions}
          onChange={(e) => updateStyle(e.value)}
          optionLabel="name"
          multiple
        />

        <SelectButton
          value={decoration}
          options={decorationOptions}
          onChange={(e) => onChangeDecoration?.(e.value)}
          itemTemplate={decorationTemplate}
        />

        <SelectButton
          value={alignment}
          options={alignmentOptions}
          onChange={(e) => onChangeAlignment?.(e.value)}
          itemTemplate={alignmentTemplate}
        />

        <Dropdown
          value={fonts.find(e => e.name === family)}
          options={fonts}
          onChange={(e) => onChangeFamily?.(e.value?.name ?? 'Arial')}
          optionLabel="name"
          filterBy="name"
          filter
          placeholder={family ?? 'Select a font'}
          valueTemplate={selectedFontFamilyTemplate}
          itemTemplate={fontFamilyOptionTemplate}
        />

        <br />
        <span>Color: </span>
        <ColorPicker
          value={color}
          onChange={(e) => onChangeColor?.(`#${e.value}`)}
        />

      </div>
    </>
  )
}

export default TextEditor;
