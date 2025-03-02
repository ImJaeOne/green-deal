import { useEffect, useState } from 'react';

export const useImageUpload = ({ onChangeImage }) => {
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    return () => {
      if (imageUrl) {
        // blob url 삭제
        URL.revokeObjectURL(imageUrl);
        setImageUrl(null);
      }
    };
  }, [imageUrl]);

  // 이미지 선택 처리
  const setChangeImage = (file) => {
    if (!file) return;

    // 이미지 url 생성
    setImageUrl(URL.createObjectURL(file));

    // 이미지 저장
    onChangeImage(file);
  };

  return { imageUrl, setChangeImage, resetImage: () => setImageUrl(null) };
};
