import React from 'react';

const Input = ({
  ref = null,
  type = 'text',
  value = '',
  name = '',
  inputMode = '',
  onChange = () => {},
  placeholder = '',
  onKeyDown = () => {},
  className = '',
}) => {
  const INPUT_DEFAULT_STYLE =
    'w-full p-2 border rounded-[10px] border-gray focus:outline-none focus:ring-1 focus:ring-graish-green';

  return (
    <input
      ref={ref}
      type={type}
      value={value}
      name={name}
      inputMode={inputMode}
      onChange={onChange}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
      className={`${INPUT_DEFAULT_STYLE} ${className}`}
    />
  );
};

export default Input;
