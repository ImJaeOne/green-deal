import { useState, useEffect } from 'react';
import { checkNicknameDuplication, updateProfile, validateNickname } from '../utils/profileUtils';
import { fetchUserData } from '../api/userInfoService';

const useProfileInfo = (user) => {
  const [userdata, setUserdata] = useState(null);
  const [nickname, setNickname] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      if (!user?.id) return;

      const { data, error } = await fetchUserData(user.id);

      if (error) {
        console.error('유저 데이터 가져오기 오류:', error);
        return;
      }

      setUserdata(data);
      setNickname(data.name);
    };

    getUserData();
  }, [user]);

  const handleProfileUpdate = async () => {
    if (!isUpdating) {
      setIsUpdating(true);
      setErrorMessage('');
      return;
    }

    if (!userdata?.user_id) {
      alert('사용자 정보를 찾을 수 없습니다.');
      setIsUpdating(false);
      return;
    }

    // 유효성 검사
    const validation = validateNickname(nickname, userdata.name);
    if (!validation.valid) {
      setErrorMessage(validation.error);
      validation.isUnchanged && setIsUpdating(false); 
      return;
    }
    // 닉네임 중복 검사
    const duplicationCheck = await checkNicknameDuplication(nickname);
    if (!duplicationCheck.valid) {
      setErrorMessage(duplicationCheck.error);
      return;
    }

    // 프로필 업데이트
    const result = await updateProfile(nickname, userdata);
    if (result.success) {
      setIsUpdating(false);
      await fetchUserData();
      alert('프로필이 성공적으로 업데이트되었습니다.');
    } else {
      setErrorMessage(result.error);
    }
  };

  return {
    userdata,
    nickname,
    setNickname,
    isUpdating,
    errorMessage,
    handleProfileUpdate,
    fetchUserData,
  };
};

export default useProfileInfo;
