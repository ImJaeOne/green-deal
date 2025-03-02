import React from 'react';
import { useState } from 'react';
import Button from '../components/common/Button';
import ProfileSection from '../components/mypage/ProfileSection';
import useUserStore from '../store/userStore';

const MyPage = () => {
  const user = useUserStore((state) => state.user);

  const [currentTab, setCurrentTab] = useState('selling');
  const [products, setProducts] = useState([
    {
      id: 1,
      createdAt: '2024-02-27T12:34:56.789Z',
      name: '아이폰11',
      category: '디지털기기',
      price: '10000',
      quality: '최상',
      refund: false,
      location: { lat: 33.450701, lng: 126.570667 },
      description: '싸다 싸! 신발보다 싸!',
      img: '',
      user_id: 1,
      soldout: false,
      updated_at: '',
    },
    {
      id: 2,
      createdAt: '2024-02-28T12:34:56.789Z',
      name: '축구공',
      category: '스포츠/레저',
      price: '100000',
      quality: '중상',
      refund: false,
      location: { lat: 33.250701, lng: 126.270667 },
      description: '사용감 살짝 있습니다!',
      img: '',
      user_id: 2,
      soldout: false,
      updated_at: '2024-02-29T12:34:56.789Z',
    },
    {
      id: 3,
      createdAt: '2024-02-27T12:38:56.789Z',
      name: '맥북 Aire',
      category: '디지털기기',
      price: '1000000',
      quality: '최상',
      refund: false,
      location: { lat: 33.550701, lng: 126.670667 },
      description: '개봉만 했습니다.',
      img: '',
      user_id: 1,
      soldout: true,
      updated_at: '',
    },
  ]);

  const [wishlist, setWishlist] = useState([
    {
      id: 2,
      created_at: '2024-03-02T00:00:00.000Z',
      product_id: 2,
      user_id: 1,
    },
  ]); // UI를 위해 임시로 만든 찜한 상품

  const handleTabChange = (tapType) => {
    setCurrentTab(tapType);
  };

  const getFilteredItems = () => {
    switch (currentTab) {
      case 'selling':
        return products.filter((item) => item.user_id === 1 && !item.soldout);
      case 'sold':
        return products.filter((item) => item.user_id === 1 && item.soldout);
      case 'wishlist':
        return products.filter((product) =>
          wishlist.some((wish) => wish.product_id === product.id),
        );
      default:
        return [];
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen gap-14">
      <section className="flex flex-col items-center justify-center gap-10 w-[400px] h-[830px] p-6 bg-light-gray rounded-md">
        <ProfileSection user={user} />

        <div className="w-[300px] h-[210px] rounded-md">
          <button
            onClick={() => handleTabChange('selling')}
            className={`w-full h-[70px] rounded-t-md transition-colors text-title-sm hover:opacity-80
      ${
        currentTab === 'selling'
          ? 'bg-graish-green text-white'
          : 'bg-white text-black'
      }`}
          >
            판매 중인 물품
          </button>

          <button
            onClick={() => handleTabChange('sold')}
            className={`w-full h-[70px] transition-colors text-title-sm hover:opacity-80
      ${
        currentTab === 'sold'
          ? 'bg-graish-green text-white'
          : 'bg-white text-black'
      }`}
          >
            판매 완료
          </button>

          <button
            onClick={() => handleTabChange('wishlist')}
            className={`w-full h-[70px] rounded-b-md transition-colors text-title-sm hover:opacity-80
      ${
        currentTab === 'wishlist'
          ? 'bg-graish-green text-white'
          : 'bg-white text-black'
      }`}
          >
            찜한 상품
          </button>
        </div>
      </section>

      <section className="p-6 min-w-[800px] min-h-screen">
        <h1 className="mb-4 font-bold text-title-lg text-deep-mint">
          {currentTab === 'selling'
            ? '판매 중인 물품'
            : currentTab === 'sold'
              ? '판매 완료'
              : '찜한 상품'}
        </h1>
        <div className="grid grid-cols-3 gap-10 overflow-hidden">
          {getFilteredItems().length === 0 ? (
            <div className="text-lg">아직 아무런 상품도 없습니다. </div>
          ) : (
            getFilteredItems().map((item) => (
              <article
                key={item.id}
                className="flex flex-col items-center justify-center w-[250px] h-[280px] bg-gray-100 rounded-md border-2 border-light-gray"
              >
                <img
                  src={item.img || null} // 이미지가 없을 경우 null로 변경!
                  alt={item.name}
                  className="object-cover w-full h-[160px] rounded-t-md bg-light-gray"
                />
                <div className="w-full h-[120px] p-2">
                  <h3 className="font-semibold text-title-sm">{item.name}</h3>
                  <p className="mb-2 text-md text-deep-mint">{item.price}</p>
                  <div className="flex items-center justify-center gap-4">
                    <Button type="button" variant="outline" size="medium">
                      삭제
                    </Button>
                    <Button type="button" variant="primary" size="medium">
                      수정
                    </Button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default MyPage;
