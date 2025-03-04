import { supabase } from './client';

// 댓글 목록 가져오기
export const getComments = async (productId) => {
  const { data, error } = await supabase
    .from('comments')
    .select('*, users(*)')
    .eq('product_id', productId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

// 댓글 추가
export const addComment = async ({ productId, content, userId }) => {
  const { data, error } = await supabase
    .from('comments')
    .insert([{ content, user_id: userId, product_id: productId }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

// 댓글 수정
export const updateComment = async ({ commentId, content }) => {
  const { error } = await supabase
    .from('comments')
    .update({ content })
    .eq('id', commentId);

  if (error) throw new Error(error.message);
};

// 댓글 삭제
export const deleteComment = async (commentId) => {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId);

  if (error) throw new Error(error.message);
};
