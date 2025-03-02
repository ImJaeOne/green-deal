import React from 'react';
import { Link } from 'react-router-dom';
import { useUserData } from '../../hooks/useUserQuery';
import NavAuthStatus from './NavAuthStatus';
import useUserStore from '../../store/userStore';

const Nav = () => {
  const user = useUserStore((state) => state.user);
  // user_id를 통해 user 테이블에서 user 정보 가져오기 - profile_img를 위해
  const { data: userData, isPending } = useUserData(user?.id ?? null);

  // useQuery가 실행이 되지 않더라도 isPending의 default 값이 true
  // authData가 없을 시 강제로 false 설정
  const isLoading = !user ? false : isPending;

  return (
    <nav className="fixed top-0 flex items-center justify-between w-full h-[60px] bg-deep-mint px-7 text-white text-base font-light shadow-sm">
      <h1>
        <Link to="/product">
          <img src="/public/Logo.jpeg" className="h-14" />
        </Link>
      </h1>
      <NavAuthStatus isLoading={isLoading} userData={userData} />
    </nav>
  );
};

export default Nav;
