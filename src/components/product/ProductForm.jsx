import React from 'react';
import Button from '../common/Button';
import ProductMapModal from './ProductMapModal';
import Label from '../ui/Label';
import Input from '../common/Input';
import Select from '../common/Select';
import TextArea from '../common/TextArea';
import {
  PRODUCT_CATEGORIES,
  PRODUCT_QUALITY,
  PRODUCT_REFUND,
} from '../../constants/productConstants';
import { useProductForm } from '../../hooks/useProductForm';
import { useState } from 'react';
import { useRef } from 'react';

const ProductForm = ({ product, onChangeProduct, onSubmit }) => {
  const { name, price, quality, refund, category, description } = product;
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // Input ref들
  const nameInputRef = useRef(null);
  const priceInputRef = useRef(null);

  const { address, handleChange, handleSubmit, handleSelectLocation } =
    useProductForm(product, onChangeProduct);

  // 위치 추가 모달 열기
  const openLocationModal = () => {
    setIsLocationModalOpen(true);
  };

  // input focus 이벤트 핸들러
  const autoFocusHandler = () => {
    console.log(name, price);

    if (!name) {
      return nameInputRef.current.focus();
    }
    if (!price) {
      return priceInputRef.current.focus();
    }
  };

  return (
    <>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          handleSubmit(e);
          autoFocusHandler();
          onSubmit();
        }}
      >
        {/* 판매물품 */}
        <div>
          <Label>판매 물품</Label>
          <Input
            ref={nameInputRef}
            type="text"
            value={name}
            name="name"
            onChange={handleChange}
            placeholder="제목"
          />
        </div>

        {/* 판매금액 */}
        <div>
          <Label>판매 금액</Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              ₩
            </span>
            <Input
              ref={priceInputRef}
              type="text"
              value={price}
              name="price"
              inputMode="numeric"
              onChange={handleChange}
              placeholder="판매금액"
              className="pl-7"
            />
          </div>
        </div>

        <div className="flex gap-4">
          {/* 물품상태 */}
          <div className="flex-1">
            <Label>물품 상태</Label>
            <Select value={quality} name="quality" onChange={handleChange}>
              {PRODUCT_QUALITY.map((quality) => (
                <option value={quality} key={quality}>
                  {quality}
                </option>
              ))}
            </Select>
          </div>

          {/* 교환 가능 여부 */}
          <div className="flex-1">
            <Label>교환 가능 여부</Label>
            <Select value={refund} name="refund" onChange={handleChange}>
              {PRODUCT_REFUND.map((refund) => (
                <option
                  value={Object.values(refund)}
                  key={Object.values(refund)}
                >
                  {Object.keys(refund)}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* 카테고리 */}
        <div>
          <Label>카테 고리</Label>
          <Select value={category} name="category" onChange={handleChange}>
            {PRODUCT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </div>

        {/* 상품 설명 */}
        <div>
          <Label>상품 설명</Label>
          <TextArea
            value={description}
            name="description"
            onChange={handleChange}
            placeholder="상품에 대한 설명을 입력하세요"
          />
        </div>

        {/* 거래위치 */}
        <div className="flex items-center justify-between">
          <Label>거래 위치</Label>
          <span>{address}</span>
          <Button onClick={openLocationModal} variant="outline" size="medium">
            {address ? '변경' : '추가'}
          </Button>
        </div>

        {/* 등록 버튼 */}
        <div className="flex justify-center pt-4">
          <Button type="submit" size="large">
            상품 등록
          </Button>
        </div>
      </form>
      {/* 거래 위치 추가 모달 */}
      <ProductMapModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSelectLocation={handleSelectLocation}
      />
    </>
  );
};

export default ProductForm;
