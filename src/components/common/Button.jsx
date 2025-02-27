import React from 'react';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
}) => {
  const baseUrl = 'transition-all leading-none duration-200 rounded-full ';
  const sizeStyle = {
    small: 'px-3 py-1 text-caption min-w-[80px] h-[20px]',
    medium: 'px-4 py-2 text-text-md min-w-[100px] h-[40px]',
    large: 'px-6 py-3 text-title-sm min-w-[210px] h-[50px]',
  };
  const variantStyles = {
    primary:
      'text-white bg-deep-mint hover:bg-darkmint hover:border-darkmint border-transparent',
    outline:
      'text-deep-mint border-2 border-deep-mint hover:bg-darkmint hover:border-darkmint hover:text-white',
  };
  return (
    <button
      type={type}
      className={`${baseUrl} ${sizeStyle[size]} ${variantStyles[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
