import { useState } from 'react';
import { validateProductForm } from '../utils/validateProducts';

export const useProductForm = (product, onChangeProduct) => {
  const [address, setAddress] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue;
    if (name === 'price') {
      newValue = Number(value.replace(/[^\d]/g, ''));
    } else if (name === 'refund' && value !== '') {
      newValue = JSON.parse(value.toLowerCase());
    } else {
      newValue = value;
    }

    onChangeProduct({
      [name]: newValue,
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    // 필수 필드 검증
    const validationResult = validateProductForm(product);
    if (validationResult) {
      alert(validationResult);
      return;
    }
  };

  const handleSelectLocation = (location, address) => {
    setAddress(address);

    onChangeProduct({
      location: location,
    });
  };

  return {
    address,
    handleChange,
    handleSubmit,
    handleSelectLocation,
  };
};
