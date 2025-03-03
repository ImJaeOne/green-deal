import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchProducts,
  fetchWishlist,
  removeProduct,
  removeWishItem,
} from '../api/userProductService';

const useUserProduct = (sub) => {
  const queryClient = useQueryClient();

  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery({
    queryKey: ['products', sub],
    queryFn: () => fetchProducts(sub),
    enabled: !!sub,
  });

  const {
    data: wishlist,
    isLoading: wishlistLoading,
    isError: wishlistError,
  } = useQuery({
    queryKey: ['wishlist', sub],
    queryFn: () => fetchWishlist(sub),
    enabled: !!sub,
  });

  const { mutate: removeProductMutation } = useMutation({
    mutationFn: (productId) => removeProduct(sub, productId),
    onSuccess: () => {
      queryClient.invalidateQueries(['products', sub]);
    },
  });

  const { mutate: removeWishItemMutation } = useMutation({
    mutationFn: (wishId) => removeWishItem(wishId),
    onSuccess: () => {
      queryClient.invalidateQueries(['wishlist', sub]);
    },
  });
  return {
    products,
    productsLoading,
    productsError,
    wishlist,
    wishlistLoading,
    wishlistError,
    removeProductMutation,
    removeWishItemMutation,
  };
};

export default useUserProduct;
