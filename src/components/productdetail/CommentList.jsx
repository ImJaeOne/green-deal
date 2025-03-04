import React, { useState } from 'react';
import Button from '../common/Button';
import useUserStore from '../../store/userStore';
import { useDeleteComment, useUpdateComment } from '../../hooks/useComment';

const CommentList = ({ comments, seller, productId }) => {
  // 현재 로그인한 사용자 정보 가져오기
  const currentUser = useUserStore((state) => state.user);
  const [editingCommentId, setEditingCommentId] = useState(null); //현재 수정 중인 댓글 id 상태
  const [editContent, setEditContent] = useState(''); // 수정할 댓글 내용 상태

  // 댓글 수정
  const updateCommentMutation = useUpdateComment(productId);
  // 댓글 삭제
  const deleteCommentMutation = useDeleteComment(productId);

  // 댓글 수정 클릭시 호출
  const handleEdit = (comment) => {
    setEditingCommentId(comment.id); // 수정할 댓글 id
    setEditContent(comment.content); // 기존 댓글 내용 입력필드에 설정
  };

  // 댓글 수정 완료 후 저장시 호출
  const handleUpdateComment = async (commentId) => {
    if (!editContent.trim()) return;

    updateCommentMutation.mutate({
      commentId,
      content: editContent,
    });
    setEditingCommentId(null);
  };

  // 댓글 삭제시 호출
  const handleRemoveComment = async (commentId) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;

    deleteCommentMutation.mutate(commentId);
  };

  return (
    <ul className="space-y-6">
      {/* map으로 뿌리기 */}
      {comments.length > 0 ? (
        comments.map((comment) => {
          // 댓글 작성자 찾기
          const user = comment.users;

          // 현재 로그인한 사용자가 댓글 작성자인지 확인
          const isAuthor = currentUser?.id === comment.user_id;

          // 상품 작성자와 댓글 작성자가 같은지 확인
          const isProductOwnerComment =
            seller && user?.user_id === seller.user_id;

          return (
            <li
              key={comment.id}
              className={`p-4 border rounded-lg border-light-gray ${
                isProductOwnerComment && ' bg-light-gray'
              }`}
            >
              <div className="flex justify-between gap-3">
                <div className="flex items-start w-full gap-3">
                  {/* 프로필이미지 */}
                  <img
                    src={user.profile_img}
                    alt={user.name}
                    className="w-12 h-12 rounded-full bg-deep-mint"
                  />
                  <div className="w-full">
                    <div className="flex items-center gap-3">
                      {/* 작성자 닉네임 */}
                      <h3 className="text-sm font-semibold text-black">
                        {user.name}
                      </h3>

                      {/* 작성날짜 */}
                      <span className="text-xs text-deep-gray">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    {/* 댓글 내용 (수정중 ? textarea : p) */}
                    {editingCommentId === comment.id ? (
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full p-2 text-sm rounded-md focus:ring-1 focus:ring-mint focus:outline-none"
                      />
                    ) : (
                      <p className="text-sm text-deep-gray">
                        {comment.content}
                      </p>
                    )}
                  </div>
                </div>

                {/* 댓글 작성자만 수정/삭제 버튼 표시 */}
                {isAuthor && (
                  <div className="flex items-center gap-2">
                    {editingCommentId === comment.id ? (
                      <Button
                        type="button"
                        size="small"
                        onClick={() => handleUpdateComment(comment.id)}
                      >
                        저장
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        size="small"
                        onClick={() => handleEdit(comment)}
                      >
                        수정
                      </Button>
                    )}
                    <Button
                      type="button"
                      size="small"
                      variant="outline"
                      onClick={() => handleRemoveComment(comment.id)}
                    >
                      삭제
                    </Button>
                  </div>
                )}
              </div>
            </li>
          );
        })
      ) : (
        <p>아직 댓글이 없습니다.</p>
      )}
    </ul>
  );
};

export default CommentList;
