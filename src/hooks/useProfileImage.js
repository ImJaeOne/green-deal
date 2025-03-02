import { useState, useEffect } from 'react';
import { supabase } from '../api/client';
import {
  ALLOWED_IMAGE_TYPES,
  BUCKET_NAME,
  MAX_FILE_SIZE,
  PRODUCT_DEFAULT_IMG,
  PROFILES_DIRECTORY,
} from '../constants/mypageConstants';

const useProfileImage = (userdata) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (userdata) {
      setImageUrl(userdata.profile_img || PRODUCT_DEFAULT_IMG);
    }
  }, [userdata]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      return alert('2MB 이하의 파일을 선택해주세요.');
    }
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return alert('JPG 또는 PNG 형식의 이미지만 업로드 가능합니다.');
    }

    const isConfirmed = window.confirm('프로필 이미지를 수정하겠습니까?');
    if (!isConfirmed) {
      return;
    }

    const fileName = `${Date.now()}-${Math.floor(Math.random() * 100000)}.${file.name.split('.').pop()}`;
    const filePath = `${PROFILES_DIRECTORY}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, { upsert: false });

    if (uploadError) {
      console.error('이미지 업로드 오류:', uploadError.message);
      return alert('프로필 이미지 업로드에 실패했습니다.');
    }

    const { data: urlData, error: urlError } = await supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    if (urlError) {
      console.error('URL 가져오기 오류:', urlError.message);
      return alert('URL 가져오기 실패');
    }

    setImageUrl(urlData.publicUrl);

    // 프로필 이미지 업데이트
    const { error: updateError } = await supabase
      .from('users')
      .update({ profile_img: urlData.publicUrl })
      .eq('user_id', userdata.user_id);

    if (updateError) {
      console.error('프로필 이미지 업데이트 오류:', updateError.message);
      return alert('프로필 이미지 업데이트에 실패했습니다.');
    }
  };

  return { imageUrl, handleImageChange };
};

export default useProfileImage;
