import React from 'react';

const TextArea = ({
  value = '',
  name = '',
  onChange = () => {},
  placeholder = '',
}) => {
  return (
    <textarea
      value={value}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full h-24 p-2 border rounded-[10px] resize-none border-gray focus:outline-none focus:ring-1 focus:ring-graish-green"
    ></textarea>
  );
};

export default TextArea;
