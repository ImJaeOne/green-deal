import { useState } from 'react';
import { INITIAL_ADD_PRODUCT_DATA } from '../constants/productConstants';
import useUserStore from '../store/userStore';
import { useAddProduct } from './useProduct';

/**
 * useProductRegistration
 * @description - 상품 등록 훅
 * @param {function} onSuccess - 성공 시 콜백 함수
 * @returns {object} - 상품 등록 관련 데이터
 */
export const useProductRegistration = (onSuccess) => {
  const [product, setProduct] = useState(INITIAL_ADD_PRODUCT_DATA);
  const user = useUserStore((state) => state.user);
  const { mutate, isLoading, error } = useAddProduct(
    product,
    user.id,
    onSuccess,
  );
  const handleImageChange = (newImg) => {
    setProduct((value) => ({
      ...value,
      img: newImg,
    }));
  };
  const handleProductChange = (product) => {
    setProduct((value) => ({
      ...value,
      ...product,
    }));
  };

  const handleSubmit = () => mutate();

  return {
    product,
    error,
    isLoading,
    handleImageChange,
    handleProductChange,
    handleSubmit,
  };
};
