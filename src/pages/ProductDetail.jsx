import { useParams } from 'react-router-dom';
import useUserStore from '../store/userStore';
import Button from '../components/common/Button';
import ProductHeader from '../components/productdetail/ProductHeader';
import SellerInfo from '../components/productdetail/SellerInfo';
import ProductInfo from '../components/productdetail/ProductInfo';
import ProductDescription from '../components/productdetail/ProductDescription';
import Comments from '../components/productdetail/Comments';
import { useProductWithSeller, useSoldoutProduct } from '../hooks/useProduct';
import { useGeocode } from '../hooks/useGeocode';
import ProductLocation from '../components/productdetail/ProductLocation';

const ProductDetail = () => {
  // 로그인한 유저 정보
  const currentUser = useUserStore((state) => state.user);
  const isLogin = useUserStore((state) => state.isLogin);
  const { id } = useParams(); // url에서 상품 id 가져오기
  const productId = +id;

  // 상품 및 판매자 데이터 가져오기
  const { data: product, error, isLoading } = useProductWithSeller(productId);

  // 위도, 경도로 주소 가져오기
  const { data: address, isLoading: isAddressLoading } = useGeocode(
    product?.location?.lat,
    product?.location?.lng,
  );

  // 상품 판매 완료 처리
  const { mutate: handleCheckAsSoldout } = useSoldoutProduct(productId);

  // 판매완료 버튼 핸들러
  const handleConfirmSoldout = () => {
    if (
      window.confirm(
        '판매완료 처리하면 번복이 불가능합니다. 상품을 판매완료하시겠습니까?',
      )
    ) {
      handleCheckAsSoldout(product.id);
    }
  };

  // 반복되는 css
  const HR_BORDER_CSS = 'border-t-1 border-light-gray';
  const UX_TEXT_CSS = 'text-center text-title-sm';

  // 데이터 로딩중
  if (isLoading) {
    return <p className={UX_TEXT_CSS}>데이터 로딩중...</p>;
  }

  // 데이터 로드 중 에러발생시
  if (error) {
    return (
      <p className={UX_TEXT_CSS}>데이터를 불러오는 중 오류가 발생했습니다.</p>
    );
  }

  // 제품이 없는 경우
  if (!product) {
    return <p className={UX_TEXT_CSS}> 상품을 찾을 수 없습니다.</p>;
  }

  // 로그인 유저가 상품의 작성자인지 확인
  const isOwner = isLogin && currentUser?.id === product.user_id;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex gap-12 p-8 mx-auto bg-white h-[860px">
        {/* 상품 이미지 */}
        <div className="flex items-center justify-center p-6 w-[580px] bg-light-gray">
          <img
            src={product.img}
            alt={product.name}
            className="object-cover w-full bg-white rounded-lg"
          />
        </div>

        {/* 상품 정보 */}
        <div className="w-[600]">
          {/* 상품 정보 헤더 컴포넌트 */}
          <ProductHeader product={product} />

          <hr className={HR_BORDER_CSS} />

          {/* 판매자 정보 컴포넌트 */}
          <SellerInfo seller={product.users} />

          <hr className={HR_BORDER_CSS} />

          <div className="flex flex-col w-[600px]">
            {/* 상품 상세 정보 컴포넌트 */}
            <ProductInfo product={product} />

            <hr className={HR_BORDER_CSS} />

            {/* 상품 설명 컴포넌트 */}
            <ProductDescription product={product} />

            {/* 지도 영역 */}
            <ProductLocation
              address={address}
              isAddressLoading={isAddressLoading}
            />

            {/* 판매글 작성자에게만 보이는 판매완료 버튼 */}
            <div className="flex justify-center mt-7">
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
      <Comments seller={product.users} />
    </div>
  );
};

export default ProductDetail;
