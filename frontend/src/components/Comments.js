import { useState } from 'react';
import { addComment, deleteComment, updateComment } from '../api/comments';

function Comments({ post, currentUser, onRefresh }) {
  const [text, setText] = useState('');

  const submit = async () => {
    if (!text.trim()) return;
    await addComment(post.id, text);
    setText('');
    onRefresh();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="comments-section">
      <div className="comments-list">
        {post.comments && post.comments.length > 0 ? (
          post.comments.map(comment => {
            const isOwner = currentUser && comment.user_id === currentUser.id;

            return (
              <div key={comment.id} className="comment">
                <img
                  src={comment.user?.image ? (comment.user.image.startsWith('http') ? comment.user.image : `http://localhost:8000/storage/${comment.user.image}`) : '/default-avatar.png'}
                  alt={comment.user?.name}
                  className="comment-avatar"
                  onError={(e) => {e.target.src = '/default-avatar.png'}}
                />
                <div className="comment-content">
                  <div className="comment-header">
                    <strong className="comment-author">{comment.user?.name || 'Anonymous'}</strong>
                    {isOwner && (
                      <button
                        className="comment-delete"
                        onClick={() => deleteComment(comment.id).then(onRefresh)}
                        title="Delete comment"
                      >
                        ×
                      </button>
                    )}
                  </div>
                  <p className="comment-text">{comment.body}</p>
                  <span className="comment-time">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-comments">No comments yet. Be the first!</p>
        )}
      </div>

      {currentUser && (
        <div className="comment-input-section">
          <img
            src={currentUser.image ? (currentUser.image.startsWith('http') ? currentUser.image : `http://localhost:8000/storage/${currentUser.image}`) : '/default-avatar.png'}
            alt={currentUser.name}
            className="comment-avatar-self"
            onError={(e) => {e.target.src = '/default-avatar.png'}}
          />
          <textarea
            className="comment-input"
            placeholder="Write a comment..."
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            rows="2"
          />
          <button className="comment-submit" onClick={submit}>
            Post
          </button>
        </div>
      )}
    </div>
  );
}

export default Comments;
