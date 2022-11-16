import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import { MouseEventHandler } from 'react';

export type LeftSidePanelProps = {
  onSelectProduct: MouseEventHandler<HTMLButtonElement>
  onAddDesign: MouseEventHandler<HTMLButtonElement>
  onAddText: MouseEventHandler<HTMLButtonElement>
  onLoadMedia: MouseEventHandler<HTMLButtonElement>
}

export const LeftSidePanel = ({ onSelectProduct, onAddDesign, onAddText, onLoadMedia }: Partial<LeftSidePanelProps>) => {
  return (
    <>
      <div style={{ maxWidth: '280px' }}>
        <div className="flex flex-column justify-content-around">
          <Button
            onClick={onSelectProduct}
            label="Elige un producto"
            icon={PrimeIcons.DATABASE}
            className="p-button-rounded p-button-raised p-button-text bg-white m-2 mb-5"
          />
          <Button
            onClick={onAddDesign}
            label="Elige un diseño"
            icon={PrimeIcons.STAR}
            className="p-button-rounded p-button-raised p-button-text bg-white m-2"
          />
          <Button
            onClick={onAddText}
            label="Añade un texto"
            icon={PrimeIcons.PENCIL}
            className="p-button-rounded p-button-raised p-button-text bg-white m-2"
          />
          <Button
            onClick={onLoadMedia}
            label="Carga una imagen"
            icon={PrimeIcons.IMAGE}
            className="p-button-rounded p-button-raised p-button-text bg-white m-2"
          />
        </div>
      </div>
    </>
  );
}

export default LeftSidePanel;
