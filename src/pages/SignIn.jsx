import React from 'react';
import UserForm from '../components/auth/UserForm';
import { Link, useNavigate } from 'react-router-dom';
import { authGoogleSignIn, authKakaoSignIn } from '../api/userAuthService';

const SignIn = () => {
  const handleSocialLogin = async (e) => {
    const socialChannel = e.target.closest('button').getAttribute('data-type');

    if (socialChannel === 'google') {
      try {
        authGoogleSignIn();
      } catch (error) {
        alert('구글 로그인 실패 : ' + error.message);
      }
    } else if (socialChannel === 'kakao') {
      try {
        await authKakaoSignIn();
      } catch (error) {
        alert('카카오 로그인 실패 : ' + error.message);
      }
    }
  };

  return (
    <section className="py-40 min-w-[1024px]">
      <div className="flex flex-col items-center w-3/6 max-w-lg gap-12 p-10 m-auto border-2 rounded-xl border-graish-green">
        <h2 className="w-full font-semibold text-left text-title-md text-darkmint">
          로그인
        </h2>
        <UserForm />
        <span className="relative items-center flex gap-2 w-full before:block text-gray text-title-sm before:h-[1px] before:bg-gray before:w-full after:block after:h-[1px] after:bg-gray after:w-full">
          OR
        </span>
        <div className="flex gap-6 ">
          <button
            type="button"
            data-type="kakao"
            className="w-10 h-10 aspect-square"
            onClick={(e) => handleSocialLogin(e)}
          >
            <img
              className="w-full h-full"
              src="/icon_kakao.png"
              alt="카카오 간편 로그인"
            />
          </button>
          <button
            type="button"
            data-type="google"
            className="w-10 h-10 aspect-square"
            onClick={(e) => handleSocialLogin(e)}
          >
            <img
              className="w-full h-full"
              src="/icon_google.png"
              alt="구글 간편 로그인"
            />
          </button>
        </div>
        <div className="text-sm text-deep-gray">
          계정이 없으신가요?{' '}
          <Link to={'/signup'} className="ml-1 font-semibold text-deep-mint">
            회원가입
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
