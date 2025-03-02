import React from 'react';
import Button from '../common/Button';
import { useRef } from 'react';
import { useImageUpload } from '../../hooks/useImageUpload';

const ProductImageUpload = ({ onChangeImage }) => {
  const fileInputRef = useRef();
  const { imageUrl, setChangeImage, resetImage } = useImageUpload({
    onChangeImage,
  });

  // 이미지 선택 처리
  const handleImageChange = (e) => {
    setChangeImage(e.target.files[0]);
  };

  // 이미지 추가 버튼 클릭 핸들러
  const handleImageAdd = () => {
    // 이미지 선택 파일 다이얼로그 열기
    document.getElementById('image-upload').click();
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="flex items-center justify-center w-full mb-4 bg-white border border-gray-300 rounded-lg h-[25rem]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="업로드된 이미지"
            className="object-contain max-w-full max-h-full"
          />
        ) : (
          <span className="text-gray-400">이미지 영역</span>
        )}
      </div>

      {/* 숨겨진 파일 업로드 입력 */}
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleImageChange}
      />

      {/* 추가하기 버튼 */}
      <Button onClick={handleImageAdd} size="large">
        이미지 등록
      </Button>
    </div>
  );
};

export default ProductImageUpload;
