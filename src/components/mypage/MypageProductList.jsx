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
        onClick: removeProductMutation,
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
        onClick: removeProductMutation,
      },
    ],
    wishlist: [
      {
        buttonName: '찜해제',
        variant: 'outline',
        onClick: removeWishMutation,
      },
    ],
  };

  if (getFilteredItems().length === 0 && currentTab === 'selling') {
    return (
      <div className="flex flex-col items-center justify-center md:block">
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

  if (productsLoading || wishlistLoading) {
    return <div>Loading...</div>;
  }

  if (productsError || wishlistError) {
    return <div>Error: {productsError?.message || wishlistError?.message}</div>;
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
                  onClick={() =>
                    onClick(currentTab === 'wishlist' ? item.wishId : item.id)
                  }
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
