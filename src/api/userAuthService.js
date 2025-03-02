import { SOCIAL_LOGIN_REDIRECT_URL } from '../constants/constants';
import { supabase } from './client';

export const authSignUp = async (email, password, userName) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: userName,
        },
      },
    });

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(`회원가입 실패: ${error.message}`);
  }
};

export const authSignIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(`로그인 실패 : ${error.message}`);
  }
};

export const authSignOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  } catch (error) {
    throw new Error(`로그아웃 실패: ${error.message}`);
  }
};
export const authGoogleSignIn = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: SOCIAL_LOGIN_REDIRECT_URL,
      },
    });

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(`구글 로그인 실패: ${error.message}`);
  }
};

export const authKakaoSignIn = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: SOCIAL_LOGIN_REDIRECT_URL,
      },
    });

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(`카카오 로그인 실패: ${error.message}`);
  }
};
