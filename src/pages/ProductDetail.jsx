import React from 'react';
import Comments from '../components/comments/Comments';
import { useParams } from 'react-router-dom';
import useUserStore from '../store/userStore';
import Button from '../components/common/Button';
import { supabase } from '../api/client';
import ProductHeader from '../components/productdetail/ProductHeader';
import SellerInfo from '../components/productdetail/SellerInfo';
import ProductInfo from '../components/productdetail/ProductInfo';
import ProductDescription from '../components/productdetail/ProductDescription';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// 상품 데이터 가져오기
const fetchProducts = async () => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) throw new Error(error.message);
  return data;
};

// 사용자 데이터 가져오기
const fetchUsers = async () => {
  const { data, error } = await supabase.from('users').select('*');
  if (error) throw new Error(error.message);
  return data;
};

// 상품 판매 완료 처리
const checkAsSold = async (productId) => {
  const { error } = await supabase
    .from('products')
    .update({ soldout: true })
    .eq('id', productId);
  if (error) throw new Error(error.message);
};

const ProductDetail = () => {
  const queryClient = useQueryClient();
  // 로그인한 유저 정보
  const currentUser = useUserStore((state) => state.user);
  const isLogin = useUserStore((state) => state.isLogin);
  const { id } = useParams(); // url에서 상품 id 가져오기

  // 상품 데이터 가져오기
  const {
    data: products,
    error: productError,
    isLoading: isLoadingProducts,
  } = useQuery({ queryKey: ['products'], queryFn: fetchProducts });

  // 사용자 데이터 가져오기
  const {
    data: users,
    error: userError,
    isLoading: isLoadingUsers,
  } = useQuery({ queryKey: ['users'], queryFn: fetchUsers });

  // 상품 판매 완료 처리
  const { mutate: handleCheckAsSold } = useMutation({
    mutationFn: (productId) => checkAsSold(productId),
    onSuccess: () => {
      queryClient.invalidateQueries(['products']); // 상품목록 새로고침
    },
    onError: (error) => {
      console.log('판매완료 처리 에러', error.message);
    },
  });

  // 판매완료 버튼 핸들러
  const handleConfirmSoldout = () => {
    if (
      window.confirm(
        '완료 처리하면 번복이 불가합니다. 상품을 판매완료 처리 하시겠습니까?',
      )
    ) {
      handleCheckAsSold(product.id);
    }
  };

  // 데이터 로드 중 에러발생시
  if (productError || userError) {
    return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;
  }

  // 데이터 로딩중이거나 빈 배열일 경우
  if (isLoadingProducts || isLoadingUsers) {
    return <p>데이터 로딩중...</p>;
  }

  // 현재 상품 찾기
  const product = products.find((item) => item.id === +id);

  if (!product) {
    return (
      <p className="text-center text-title-sm"> 상품을 찾을 수 없습니다.</p>
    );
  }

  // 판매자 정보 찾기
  const seller = users.find((user) => user.user_id === product.user_id);

  // 로그인 유저가 상품의 작성자인지 확인
  const isOwner = isLogin && currentUser?.id === product.user_id;

  return (
    <div>
      <div className="flex gap-12 p-8 mx-auto bg-white max-w-7xl">
        {/* 상품 이미지 */}
        <div className="flex items-center justify-center p-6 w-[580px] h-[730px] bg-light-gray">
          <img
            src={product.img}
            alt={product.name}
            className="object-cover w-full bg-gray-200 rounded-lg"
          />
        </div>

        {/* 상품 정보 */}
        <div className="w-[630]">
          {/* 상품 정보 헤더 컴포넌트 */}
          <ProductHeader product={product} />

          <hr className="border-t-1 border-light-gray" />

          {/* 판매자 정보 컴포넌트 */}
          <SellerInfo seller={seller} />

          <hr className="border-t-1 border-light-gray" />

          <div className="flex flex-col w-[630px]">
            {/* 상품 상세 정보 컴포넌트 */}
            <ProductInfo product={product} />

            <hr className="border-t-1 border-light-gray" />

            {/* 상품 설명 컴포넌트 */}
            <ProductDescription product={product} />

            {/* 지도 영역 */}
            <div className="flex flex-col items-center p-4 bg-gray-200 rounded-lg">
              <div className="w-[400px] h-[250px] rounded-lg bg-gray">
                KKO MAP
              </div>
              <p className="text-sm text-deep-gray">
                서울특별시 강남구 테헤란로 44길 8
              </p>
            </div>

            {/* 판매글 작성자에게만 보이는 판매완료 버튼 */}
            <div className="flex justify-center">
              {isOwner && (
                <Button
                  type="button"
                  onClick={
                    isOwner && !product.soldout
                      ? handleConfirmSoldout
                      : undefined
                  }
                  size="large"
                  variant={isOwner && !product.soldout ? 'outline' : 'disabled'}
                  disabled={!isOwner || product.soldout}
                >
                  {product.soldout ? '거래종료' : '판매완료'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 댓글 컴포넌트 영역 */}
      <Comments users={users} seller={seller} />
    </div>
  );
};

export default ProductDetail;
