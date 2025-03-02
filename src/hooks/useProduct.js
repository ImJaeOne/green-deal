import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '../service/productService';
import { QUERY_KEYS } from '../constants/queryKeys';

/**
 * useAddProduct
 * @description 상품 등록 mutation 작업을 처리하는 훅
 * @param {object} product - 상품 데이터
 * @param {number} userId - 사용자 id
 * @param {function} onSuccess
 * @returns
 */
export const useAddProduct = (product, userId, onSuccess) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation({
    mutationFn: () => productService(product, userId),
    onSuccess: (data) => {
      queryClient.invalidateQueries(QUERY_KEYS.PRODUCT.LIST);
      if (onSuccess) onSuccess(data);
    },
  });
  return { mutate, isLoading, error };
};
