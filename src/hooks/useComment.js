import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants/queryKeys';
import {
  addComment,
  deleteComment,
  getComments,
  updateComment,
} from '../api/commentService';
import useUserStore from '../store/userStore';

/**
 * useGetComments
 * @description 특정 상품의 댓글 목록을 가져오는 훅
 * @param {number} productId - 조회할 상품 ID
 * @returns {object} - 댓글 목록 Query 객체
 */
export const useGetComments = (productId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.COMMENT.LIST, productId],
    queryFn: () => getComments(productId),
    enabled: !!productId,
  });
};

/**
 * useAddComment
 * @description 특정 상품에 댓글을 추가하는 훅
 * @param {number} productId - 댓글을 추가할 상품 ID
 * @returns {object} - 댓글 추가 Mutation 객체
 */
export const useAddComment = (productId) => {
  const queryClient = useQueryClient();
  const currentUser = useUserStore((state) => state.user);

  return useMutation({
    mutationFn: ({ content }) =>
      addComment({ productId, content, userId: currentUser.id }),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.COMMENT.CONTENT, productId]); // 댓글 목록 갱신
    },
  });
};

/**
 * useUpdateComment
 * @description 특정 댓글을 수정하는 훅
 * @returns {object} - 댓글 수정 Mutation 객체
 */
export const useUpdateComment = (productId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId, content }) =>
      updateComment({ commentId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.COMMENT.CONTENT, productId]); // 댓글 목록 갱신
    },
  });
};

/**
 * useDeleteComment
 * @description 특정 댓글을 삭제하는 훅
 * @returns {object} - 댓글 삭제 Mutation 객체
 */
export const useDeleteComment = (productId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.COMMENT.CONTENT, productId]); // 댓글 목록 갱신
    },
  });
};
