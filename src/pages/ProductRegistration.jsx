import React from 'react';
import ProductImageUpload from '../components/product/ProductImageUpload';
import ProductForm from '../components/product/ProductForm';
import { useNavigate } from 'react-router-dom';
import { useProductRegistration } from '../hooks/useProductRegistration';

const ProductRegistration = () => {
  const navigate = useNavigate();

  const onSuccess = (data) => {
    if (data) {
      alert('상품이 등록되었습니다.');
      navigate('/product');
    }
  };

  const {
    product,
    error,
    loading,
    handleImageChange,
    handleProductChange,
    handleSubmit,
  } = useProductRegistration(onSuccess);

  return (
    <div className="min-h-screen">
      <div className="flex flex-row">
        {/* 좌측 - 이미지 등록 영역 */}
        <div className="w-1/3 p-[3.125rem] bg-light-gray">
          {/* 이미지 영역 */}
          <ProductImageUpload onChangeImage={handleImageChange} />
        </div>

        {/* 우측 - 폼 영역 */}
        <div className="w-2/3 p-6">
          <ProductForm
            product={product}
            onChangeProduct={handleProductChange}
            onSubmit={handleSubmit}
            isLoading={loading}
            isError={error}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductRegistration;
