export const PRODUCT_CATEGORIES = [
  '디지털기기',
  '생활가전',
  '가구/인테리어',
  '생활/주방',
  '여성패션/잡화',
  '남성패션/잡화',
  '뷰티/미용',
  '스포트/레저',
  '취미/게임/도서',
  '티켓/교환권',
  '식품',
  '반려동식물용품',
  '기타',
];

export const INITIAL_ADD_PRODUCT_DATA = {
  name: '',
  category: '',
  price: '',
  quality: '',
  refund: '',
  location: { lat: null, lng: null },
  description: '',
  img: null,
  soldout: false,
  updated_at: null,
};

export const PRODUCT_QUALITY = [
  '최상',
  '상',
  '중상',
  '보통',
  '중하',
  '하',
  '최하',
];

export const PRODUCT_REFUND = [
  { '교환 가능': 'true' },
  { '교환 불가능': 'false' },
];
