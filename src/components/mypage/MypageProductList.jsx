import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { useUserProducts } from '../../hooks/useProduct';
import { useRemoveWish, useUserWishlist } from '../../hooks/useWish';
const MypageProductList = ({ currentTab, user }) => {
  const navigate = useNavigate();

  const { products, productsLoading, productsError, removeProductMutation } =
    useUserProducts(user?.id);

  const { wishlist, wishlistLoading, wishlistError } = useUserWishlist(
    user?.id,
  );

  const { mutate: removeWishMutation } = useRemoveWish(user?.id);

  const getFilteredItems = () => {
    if (!products || !wishlist) return [];
    switch (currentTab) {
      case 'selling':
        return products.filter((item) => !item.soldout);
      case 'sold':
        return products.filter((item) => item.soldout);
      case 'wishlist':
        return wishlist;
      default:
        return [];
    }
  };

  const buttons = {
    selling: [
      {
        buttonName: '삭제',
        variant: 'outline',
        onClick: (productId) => {
          if (window.confirm('상품을 삭제하시겠습니까?')) {
            removeProductMutation(productId);
          }
        },
      },
      {
        buttonName: '수정',
        variant: 'primary',
        onClick: (id) => {
          navigate(`/product/registration?productId=${id}`);
        },
      },
    ],
    sold: [
      {
        buttonName: '삭제',
        variant: 'outline',
        onClick: (productId) => {
          if (window.confirm('상품을 삭제하시겠습니까?')) {
            removeProductMutation(productId);
          }
        },
      },
    ],
    wishlist: [
      {
        buttonName: '찜해제',
        variant: 'outline',
        onClick: (wishId) => {
          if (window.confirm('찜해제 하시겠습니까?')) {
            removeWishMutation(wishId);
          }
        },
      },
    ],
  };

  if (productsLoading || wishlistLoading) {
    if (productsLoading || wishlistLoading) {
      return (
        <div className="flex items-center justify-center w-full min-h-[200px]">
          <div role="status" className="flex items-center justify-center">
            <svg
              aria-hidden="true"
              className="w-10 h-10 text-gray animate-spin dark:text-gray fill-deep-mint"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="text-black sr-only">Loading...</span>
          </div>
        </div>
      );
    }
  }

  if (productsError || wishlistError) {
    return <div>Error: {productsError?.message || wishlistError?.message}</div>;
  }

  if (getFilteredItems().length === 0 && currentTab === 'selling') {
    return (
      <div className="w-[846px]">
        <article
          className="flex flex-col items-center justify-center w-[250px] h-[280px] bg-gray-100 rounded-md border-2 border-dashed border-light-gray cursor-pointer hover:cursor-pointer hover:shadow-lg mt-[34px]"
          onClick={() => navigate('/product/registration')}
        >
          <div className="flex flex-col items-center justify-center w-full h-full text-deep-mint">
            <span className="text-title-md">+</span>
            <p className="mt-2 text-title-sm">물품 등록하기</p>
          </div>
        </article>
      </div>
    );
  }

  if (getFilteredItems().length === 0) {
    return (
      <div className="w-[846px]">
        <div className="text-lg mt-[34px]">등록된 상품이 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 overflow-hidden gap-x-[48px] min-w-[800px]">
      {getFilteredItems().map((item) => (
        <article
          key={item.id}
          onClick={(e) => {
            if (e.target.tagName === 'BUTTON') {
              return;
            }
            navigate(`/product/detail/${item.id}`);
          }}
          className="flex flex-col items-center justify-center w-[250px] h-[280px] bg-gray-100 rounded-md border-2 border-light-gray hover:cursor-pointer hover:shadow-lg mt-[34px]"
        >
          <img
            src={item.img}
            alt={item.name}
            className="object-cover w-full h-[160px] rounded-t-md bg-white"
          />
          <div className="w-full h-[120px] p-2">
            <h3 className="font-semibold truncate text-title-sm">
              {item.name}
            </h3>
            <p className="mb-2 text-md text-deep-mint">
              {Number(item.price).toLocaleString()}
            </p>
            <div className="flex items-center justify-center gap-4">
              {buttons[currentTab].map(({ buttonName, variant, onClick }) => (
                <Button
                  key={buttonName}
                  type="button"
                  variant={variant}
                  size="medium"
                  onClick={() => {
                    const id =
                      currentTab === 'wishlist' ? item.wishId : item.id;
                    onClick(id);
                  }}
                  className={
                    currentTab === 'sold' || currentTab === 'wishlist'
                      ? 'w-full'
                      : ''
                  }
                >
                  {buttonName}
                </Button>
              ))}
            </div>
          </div>
        </article>
      ))}

      {currentTab === 'selling' && (
        <article
          className="flex flex-col items-center justify-center w-[250px] h-[280px] bg-gray-100 rounded-md border-2 border-dashed border-light-gray cursor-pointer hover:cursor-pointer hover:shadow-lg mt-[34px]"
          onClick={() => navigate('/product/registration')}
        >
          <div className="flex flex-col items-center justify-center w-full h-full text-deep-mint">
            <span className="text-title-md">+</span>
            <p className="mt-2 text-title-sm">물품 등록하기</p>
          </div>
        </article>
      )}
    </div>
  );
};

export default MypageProductList;
