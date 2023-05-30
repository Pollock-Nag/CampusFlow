import React from 'react';

const Chip = ({
  name,
  padding,
  round,
  customColor,
  borderColor,
  textColor,
}) => {
  return (
    <div
      className={`badge bg-${customColor} text-black p-${padding}   rounded-${round} border-2 border-${borderColor} text-${textColor}`}
    >
      {name}
    </div>
  );
};
export default Chip;
