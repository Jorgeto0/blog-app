import { useState } from 'react';
import { addComment, deleteComment, updateComment } from '../api/comments';

function Comments({ post, currentUser, onRefresh }) {
  const [text, setText] = useState('');

  const submit = async () => {
    await addComment(post.id, text);
    setText('');
    onRefresh();
  };

  return (
    <div>
      <h4>Comments</h4>

      {post.comments.map(comment => {
        const isOwner = currentUser && comment.user_id === currentUser.id;

        return (
          <div key={comment.id}>
            <p>{comment.body}</p>

            {isOwner && (
              <>
                <button onClick={() => deleteComment(comment.id).then(onRefresh)}>
                  Delete
                </button>
              </>
            )}
          </div>
        );
      })}

      <input
        placeholder="Write a comment"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={submit}>Add</button>
    </div>
  );
}

export default Comments;
