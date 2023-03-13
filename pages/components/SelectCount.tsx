import React, { useState } from 'react';

interface Props {
  onSelect: (selectedNumber: number) => void;
  initialCount: number;
  name: string;
}

const NumberDropdown: React.FC<Props> = ({ onSelect, initialCount, name }) => {
  const [selectedNumber, setSelectedNumber] = useState(initialCount);
  const defaultTitle = '每行数量：' + selectedNumber;
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = parseInt(event.target.value, 10);
    setSelectedNumber(selected);
    onSelect(selected);
  };

  return (
    <select className={name} title={defaultTitle} value={defaultTitle} onChange={handleSelect}>
      <option value={selectedNumber}>{defaultTitle}</option>
      {[2, 3, 4, 5, 6, 7, 8].map((number) => (
        <option key={number} value={number}>
          {number}
        </option>
      ))}
    </select>
  );
};

export default NumberDropdown;