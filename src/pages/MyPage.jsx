import { useState } from 'react';
import ProfileSection from '../components/mypage/ProfileSection';
import useUserStore from '../store/userStore';
import TabNav from '../components/mypage/TabNav';
import MypageProductList from '../components/mypage/MypageProductList';

const MyPage = () => {
  const user = useUserStore((state) => state.user);
  const [currentTab, setCurrentTab] = useState('selling');

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen px-4 mt-16 lg:items-start lg:flex-row lg:mt-32 sm:px-8">
      {/* 왼쪽 프로필 및 탭 */}
      <section className="flex flex-col items-center justify-center gap-6 w-full max-w-[400px] min-h-[600px] p-6 bg-light-gray rounded-md">
        <ProfileSection user={user} />
        <TabNav currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </section>

      {/* 오른쪽 상품 목록 */}
      <section className="flex flex-col items-start flex-grow w-full min-h-screen mt-10 lg:pl-20 lg:mt-0">
        <h1 className="w-full font-bold text-center text-title-lg text-darkmint lg:text-left">
          {currentTab === 'selling'
            ? '판매 중인 물품'
            : currentTab === 'sold'
              ? '판매 완료'
              : '찜한 상품'}
        </h1>
        <MypageProductList currentTab={currentTab} user={user} />
      </section>
    </div>
  );
};

export default MyPage;
