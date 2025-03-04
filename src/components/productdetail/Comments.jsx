import React from 'react';
import { useParams } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { useGetComments } from '../../hooks/useComment';

const Comments = ({ seller }) => {
  const { id } = useParams();
  const productId = +id;

  // 댓글 목록 가져오기
  const { data: comments = [], isLoading, error } = useGetComments(productId);

  if (isLoading) {
    return <div>댓글 로딩중...</div>;
  }

  if (error) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <div className="p-6 bg-white rounded-sm max-w-1280">
      <div className="mb-6">
        <p className="mb-3 font-semibold text-black">
          댓글/문의 <span className="text-deep-mint">{comments.length}개</span>
        </p>
        {/* 댓글 입력 폼 */}
        <CommentForm productId={productId} />
      </div>

      {/* 댓글 목록 */}
      <CommentList comments={comments} seller={seller} productId={productId} />
    </div>
  );
};

export default Comments;
