import React from 'react';
import { useState } from 'react';
import Button from '../components/common/Button';
import ProfileSection from '../components/mypage/ProfileSection';
import useUserStore from '../store/userStore';
import { useEffect } from 'react';
import { supabase } from '../api/client';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const user = useUserStore((state) => state.user);

  const [currentTab, setCurrentTab] = useState('selling');
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  // 상품 불러오기
  const fetchProducts = async () => {
    if (!user?.id) return;
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('user_id', user.id);
    if (error) {
      console.error('상품 데이터 가져오기 오류:', error.message);
      return;
    }
    setProducts(data);
  };

  //찜한 상품 불러오기
  const fetchWishlist = async () => {
    if (!user?.id) return;
    const { data, error } = await supabase
      .from('wishes')
      .select('*, products(*)')
      .eq('user_id', user.id);
    if (error) {
      console.error('찜한 상품 데이터 가져오기 오류:', error.message);
      return;
    }

    if (data) {
      const wishProducts = data.map((item) => item.products);
      setWishlist(wishProducts); // 찜 목록을 상품 데이터로 직접 저장
    }
  };

  useEffect(() => {
    if (user) {
      fetchProducts();
      fetchWishlist();
    }
  }, [user]);

  const handleTabChange = (tabType) => {
    setCurrentTab(tabType);
  };

  const getFilteredItems = () => {
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

  return (
    <div className="flex items-center justify-center h-screen gap-14">
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
                  src={
                    item.img ||
                    'https://tzmzehldetwvzvqvprsn.supabase.co/storage/v1/object/public/profileImg/profiles/1740753032690-38589.png'
                  } // 임시
                  alt={item.name}
                  className="object-contain w-full h-[160px] rounded-t-md bg-white" // 질문!
                />
                <div className="w-full h-[120px] p-2">
                  <h3 className="font-semibold truncate text-title-sm">
                    {item.name}
                  </h3>
                  <p className="mb-2 text-md text-deep-mint">{item.price}</p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="flex items-center justify-center gap-4">
                      {currentTab === 'selling' && (
                        <>
                          <Button type="button" variant="outline" size="medium">
                            삭제
                          </Button>
                          <Button type="button" variant="primary" size="medium">
                            수정
                          </Button>
                        </>
                      )}

                      {currentTab === 'sold' && (
                        <Button type="button" variant="outline" size="medium">
                          삭제
                        </Button>
                      )}

                      {currentTab === 'wishlist' && (
                        <Button type="button" variant="outline" size="medium">
                          찜해제
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}

          {/* 추가: 물품 등록하기 버튼 */}
          {currentTab === 'selling' && (
            <article
              className="flex flex-col items-center justify-center w-[250px] h-[280px] bg-gray-100 rounded-md border-2 border-dashed border-light-gray cursor-pointer"
              onClick={() => {
                navigate('/product/registration');
              }}
            >
              <div className="flex flex-col items-center justify-center w-full h-full text-deep-mint">
                <span className="text-title-md">+</span>
                <p className="mt-2 text-title-sm">물품 등록하기</p>
              </div>
            </article>
          )}
        </div>
      </section>
    </div>
  );
};

export default MyPage;
