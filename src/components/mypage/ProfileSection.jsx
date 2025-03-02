import React from 'react';
import Button from '../common/Button';
import ProfileImage from './ProfileImage';
import useProfileInfo from '../../hooks/useProfileInfo';
import useProfileImage from '../../hooks/useProfileImage';

const ProfileSection = ({ user }) => {
  const {
    userdata,
    nickname,
    setNickname,
    isUpdating,
    errorMessage,
    handleProfileUpdate,
  } = useProfileInfo(user);
  const { imageUrl, handleImageChange } = useProfileImage(userdata);

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-[300px] h-[458px] px-10 py-[30px] bg-white">
      <ProfileImage imageUrl={imageUrl} handleImageChange={handleImageChange} />
      {isUpdating ? (
        <>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value.trim())}
            className="w-[210px] h-[32px] border border-dark rounded-md text-center"
          />
          {errorMessage && (
            <p className="mt-1 text-text-sm text-point-color">{errorMessage}</p>
          )}
        </>
      ) : (
        <p className="text-title-sm">{userdata?.name ?? '닉네임'}</p>
      )}
      <p className="text-title-sm">{userdata?.email ?? '이메일'}</p>
      <Button
        type="button"
        variant="primary"
        size="large"
        onClick={handleProfileUpdate}
      >
        {isUpdating ? '프로필 수정 완료' : '프로필 수정'}
      </Button>
    </div>
  );
};

export default ProfileSection;
