/**
 * 제품 이름 유효성 검사
 */
export const validateProductName = (name) => {
  if (!name.trim()) {
    return '판매 물품을 입력하세요';
  }
  return true;
};

/**
 * 제품 가격 유효성 검사
 */
export const validatePrice = (price) => {
  if (!price) {
    return '판매 금액을 입력하세요';
  }
  return true;
};

/**
 * 제품 품질 유효성 검사
 */
export const validateQuality = (quality) => {
  if (!quality) {
    return '물품 상태를 선택하세요';
  }
  return true;
};

/**
 * 교환 가능 여부 유효성 검사
 */
export const validateRefund = (refund) => {
  if (refund === '') {
    return '교환 가능 여부를 선택하세요';
  }
  return true;
};

/**
 * 카테고리 유효성 검사
 */
export const validateCategory = (category) => {
  if (!category) {
    return '카테고리를 선택하세요';
  }
  return true;
};

/**
 * 상품 설명 유효성 검사
 */
export const validateDescription = (description) => {
  if (!description.trim()) {
    return '상품 설명을 입력하세요';
  }
  return true;
};

/**
 * 거래 위치 유효성 검사
 */
export const validateLocation = (location) => {
  if (!(location?.lat || location?.lng)) {
    return '거래 위치를 선택하세요';
  }
  return true;
};

/**
 * 제품 이미지 유효성 검사
 */
export const validateProductImage = (img) => {
  if (!img) {
    return '이미지를 업로드하세요';
  }
  return true;
};

/**
 * 전체 제품 폼 유효성 검사
 */
export const validateProductForm = (product) => {
  const { name, price, quality, refund, category, description, location, img } =
    product;

  const nameValidation = validateProductName(name);
  if (nameValidation !== true) return nameValidation;

  const priceValidation = validatePrice(price);
  if (priceValidation !== true) return priceValidation;

  const qualityValidation = validateQuality(quality);
  if (qualityValidation !== true) return qualityValidation;

  const refundValidation = validateRefund(refund);
  if (refundValidation !== true) return refundValidation;

  const categoryValidation = validateCategory(category);
  if (categoryValidation !== true) return categoryValidation;

  const descriptionValidation = validateDescription(description);
  if (descriptionValidation !== true) return descriptionValidation;

  const locationValidation = validateLocation(location);
  if (locationValidation !== true) return locationValidation;

  const imageValidation = validateProductImage(img);
  if (imageValidation !== true) return imageValidation;
};
