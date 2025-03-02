import React from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../api/client';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import useUserStore from '../../store/userStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// 댓글 목록 가져오기
const fetchComments = async (productId) => {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('product_id', productId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

// 댓글 추가
const addComment = async ({ productId, content, userId }) => {
  const { data, error } = await supabase
    .from('comments')
    .insert([{ content, user_id: userId, product_id: productId }])
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
};

// 댓글 수정
const updateComment = async ({ commentId, content }) => {
  const { error } = await supabase
    .from('comments')
    .update({ content })
    .eq('id', commentId);
  if (error) throw new Error(error.message);
};

// 댓글 삭제
const deleteComment = async (commentId) => {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId);
  if (error) throw new Error(error.message);
};

const Comments = ({ users, seller }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const productId = id; //

  const currentUser = useUserStore((state) => state.user); // 로그인한 사용자 정보

  // 댓글 목록 가져오기
  const {
    data: comments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['comments', productId],
    queryFn: () => fetchComments(productId),
  });

  // 댓글 추가
  const addCommentMutation = useMutation({
    mutationFn: ({ content }) =>
      addComment({ productId, content, userId: currentUser.id }),
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', productId]); // 댓글 목록 갱신
    },
  });

  // 댓글 수정
  const updateCommentMutation = useMutation({
    mutationFn: ({ commentId, content }) =>
      updateComment({ commentId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', productId]); // 댓글 목록 갱신
    },
  });

  // 댓글 삭제
  const deleteCommentMutation = useMutation({
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', productId]); // 댓글 목록 갱신
    },
  });

  if (isLoading) {
    return <div>댓글 로딩중...</div>;
  }

  if (error) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <div className="p-6 bg-white rounded-sm">
      <div className="mb-6">
        <p className="mb-3 font-semibold text-black">
          댓글/문의 <span className="text-deep-mint">{comments.length}개</span>
        </p>
        {/* 댓글 입력 폼 */}
        <CommentForm
          productId={productId}
          addCommentMutation={addCommentMutation}
        />
      </div>

      {/* 댓글 목록 */}
      <CommentList
        comments={comments}
        users={users}
        seller={seller}
        updateCommentMutation={updateCommentMutation}
        deleteCommentMutation={deleteCommentMutation}
      />
    </div>
  );
};

export default Comments;
