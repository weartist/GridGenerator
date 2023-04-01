import React, { useState } from 'react';
import Config from '../api/config';


export type CardRadio = '16:9' | '1:1'

interface Props {
  onSelect: (selectedNumber: CardRadio) => void;
  initialRadio: CardRadio;
  name: string;
}

export const CardRadioSelect: React.FC<Props> = ({ onSelect, initialRadio, name }) => {
  const [selectedRadio, setSelectedRadio] = useState(initialRadio);
  const defaultTitle = '图片比例：' + selectedRadio;
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected: CardRadio = event.target.value as CardRadio;
    setSelectedRadio(selected);
    onSelect(selected);
  };

  return (
    <select className={name} title={defaultTitle} value={defaultTitle} onChange={handleSelect}>
      <option value={selectedRadio}>{defaultTitle}</option>
        <option key={'16:9'} value={'16:9'}>
          {'16:9'}
        </option>
        <option key={'1:1'} value={'1:1'}>
          {'1:1'}
        </option>
    </select>
  );
};

