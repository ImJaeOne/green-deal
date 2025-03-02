export const BUCKET_NAME = 'profileImg';
export const PROFILES_DIRECTORY = 'profiles';
export const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png'];
export const PRODUCT_DEFAULT_IMG = '/profile_default.png';

export const MIN_NICKNAME_LENGTH = 3;
export const ERROR_MESSAGES = {
  invalidLength: `닉네임은 최소 ${MIN_NICKNAME_LENGTH}자 이상이어야 합니다.`,
  duplicate: '이미 사용 중인 닉네임입니다.',
  updateFailed: '프로필 업데이트 중 오류가 발생했습니다.',
  checkFailed: '중복 검사 중 오류가 발생했습니다.',
};
