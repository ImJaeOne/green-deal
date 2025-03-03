import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants/queryKeys';
import {
  addProduct,
  getProducts,
  getProductDetail,
  updateProduct,
} from '../api/productService';


/**
 * useGetProduct
 * @description 상품 정보를 가져오는 query 작업을 수행하는 훅
 * @param {String} search - 검색어
 * @returns
 */
export const useGetProducts = (search = '') => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCT.LIST, search],
    queryFn: () => getProducts(search),
  });
};

/**
 * useAddProduct
 * @description 상품 등록 mutation 작업을 처리하는 훅
 * @param {object} product - 상품 데이터
 * @param {number} userId - 사용자 id
 * @param {function} onAddSuccess
 * @returns
 */
export const useAddProduct = (product, userId, onAddSuccess) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation({
    mutationFn: () => addProduct(product, userId),
    onSuccess: (data) => {
      queryClient.invalidateQueries(QUERY_KEYS.PRODUCT.LIST);
      if (onAddSuccess) onAddSuccess(data);
    },
  });
  return { mutate, isLoading, error };
};

/**
 * useUpdateProduct
 * @description 상품정보 수정 mutation 작업을 처리하는 훅
 * @param {object} product - 수정할 상품 데이터
 * @param {number} userId - 사용자 id
 * @param {number} productId - 상품 id
 * @param {function} onUpdateSuccess
 * @returns
 */
export const useUpdateProduct = (
  product,
  userId,
  productId,
  onUpdateSuccess,
) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: () => updateProduct(product, userId, productId),
    onSuccess: (data) => {
      queryClient.invalidateQueries(QUERY_KEYS.PRODUCT.LIST);
      if (onUpdateSuccess) onUpdateSuccess(data);
    },
  });
  return { mutate, isLoading, error };
};

/**
 * useGetProductDetail
 * @description 상품 상세 정보 조회 mutation 작업을 처리하는 훅
 * @param {number} productId
 * @returns
 */
export const useGetProductDetail = (productId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCT.DETAIL, productId],
    queryFn: () => getProductDetail(productId),
    enabled: !!productId,
  });
};
