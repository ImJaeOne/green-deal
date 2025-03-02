import { supabase } from '../api/client';

/**
 * uploadProductImage
 * @description 상품 이미지를 업로드합니다.
 * @param {File} file - 업로드할 이미지 파일
 * @param {string} userId - 사용자 ID
 * @returns string - 업로드된 이미지 URL
 */
export const uploadProductImage = async (file, userId) => {
  if (!file) throw new Error('이미지 파일이 없습니다.');

  const timestamp = Date.now();
  const fileExt = file.name.split('.').pop();
  const fileName = `product_${userId + timestamp}.${fileExt}`; // 임시 파일명
  const filePath = `products/${fileName}`;

  const { error: uploadStgError } = await supabase.storage
    .from('productsImg')
    .upload(filePath, file, { upsert: true });

  if (uploadStgError) {
    throw new Error('이미지 업로드 실패: ' + uploadStgError.message);
  }

  return `${import.meta.env.VITE_APP_SUPABASE_STORAGE_URL}/${filePath}`;
};
