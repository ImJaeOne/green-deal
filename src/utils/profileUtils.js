import { supabase } from '../api/client';
import { checkNickname } from '../api/userInfoService';
import { ERROR_MESSAGES } from '../constants/mypageConstants';

// 유효성 검사
export const validateNickname = (nickname, currentName) => {
  if (nickname.length < 3) {
    return { valid: false, error: ERROR_MESSAGES.invalidLength };
  }
  if (nickname === currentName) {
    return {
      valid: false,
      isUnchanged: true, // 변경 없으면 그냥 다시 원래대로 (원래는 알럿창을 띄웠음)
    };
  }
  return { valid: true };
};
// 닉네임 중복 검사
export const checkNicknameDuplication = async (nickname) => {
  const { data, error: checkError } = await checkNickname(nickname);

  if (checkError) {
    console.error('닉네임 중복 검사 오류:', checkError);
    return { valid: false, error: ERROR_MESSAGES.checkFailed };
  }

  if (data.length > 0) {
    return { valid: false, error: ERROR_MESSAGES.duplicate };
  }

  return { valid: true };
};

// 프로필 업데이트
export const updateProfile = async (nickname, userdata) => {
  const { error } = await supabase
    .from('users')
    .update({ name: nickname })
    .eq('user_id', userdata.user_id);

  if (error) {
    console.error('프로필 업데이트 오류:', error.message);
    return { success: false, error: ERROR_MESSAGES.updateFailed };
  }

  return { success: true };
};
