import { Button } from "primereact/button";
import { PrimeIcons } from 'primereact/api';
import { MouseEventHandler } from "react";

export type HistoryPanelProps = {
  onUndo: MouseEventHandler<HTMLButtonElement>
  onRedo: MouseEventHandler<HTMLButtonElement>
  onReset: MouseEventHandler<HTMLButtonElement>
  canUndo: boolean
  canRedo: boolean
}

export const HistoryPanel = ({ onUndo, onRedo, onReset, canUndo, canRedo }: Partial<HistoryPanelProps>) => {
  return (
    <>
      <div className="flex justify-content-end">
        <Button
          onClick={onUndo}
          icon={PrimeIcons.REPLAY}
          className="p-button-raised p-button-text bg-white mx-1"
          tooltip="Undo"
          tooltipOptions={{ position: 'bottom' }}
          disabled={!canUndo}
        />
        <Button
          onClick={onRedo}
          icon={PrimeIcons.REFRESH}
          className="p-button-raised p-button-text bg-white mx-1"
          tooltip="Redo"
          tooltipOptions={{ position: 'bottom' }}
          disabled={!canRedo}
        />
        <Button
          onClick={onReset}
          icon={PrimeIcons.HISTORY}
          className="p-button-raised p-button-text bg-white mx-1"
          tooltip="Reset"
          tooltipOptions={{ position: 'bottom' }}
        />
      </div>
    </>
  );
}

export default HistoryPanel;
