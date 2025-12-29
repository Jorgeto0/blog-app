import { deletePost, updatePost } from '../api/posts';
import { useState } from 'react';
import Comments from './Comments';
import Expiration from './Expiration';

function PostItem({ post, currentUser, onRefresh }) {
  const isOwner = currentUser?.id === post.user_id;
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [tags, setTags] = useState(post.tags.map(t => t.name).join(','));
 


  const save = async () => {
    await updatePost(post.id, {
      title,
      body,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    });
    setEditing(false);
    onRefresh();
  };

  const remove = async () => {
    if (window.confirm('Delete this post?')) {
      await deletePost(post.id);
      onRefresh();
    }
  };

  return (
    <article className="post">
      <div className="post-header">
        <div className="post-user-info">
          <img
            src={post.user?.image ? (post.user.image.startsWith('http') ? post.user.image : `http://localhost:8000/storage/${post.user.image}`) : '/default-avatar.png'}
            alt={post.user?.name || 'User'}
            className="post-avatar"
            onError={(e) => {e.target.src = '/default-avatar.png'}}
          />
          <div className="post-user-details">
            <h4 className="post-username">{post.user?.name || `User ${post.user_id}`}</h4>
            <span className="post-time">
              {new Date(post.created_at).toLocaleDateString()}
            </span>
            <div className="post-expiration">
              <Expiration expiresAt={post.expires_at} />
            </div>
          </div>
        </div>
        {isOwner && !editing && (
          <div className="post-menu">
            <button onClick={() => setEditing(true)} className="edit">Edit</button>
            <button onClick={remove} className="delete">Delete</button>
          </div>
        )}
      </div>

      {editing ? (
        <div className="edit-form">
          <input placeholder="Post title" value={title} onChange={e => setTitle(e.target.value)} />
          <textarea placeholder="Post content" value={body} onChange={e => setBody(e.target.value)} />
          <input placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} />
          <button onClick={save} className="save">Save Changes</button>
          <button onClick={() => setEditing(false)} className="cancel">Cancel</button>
        </div>
      ) : (
        <>
          <h3>{post.title}</h3>
          <p className="post-body">{post.body}</p>
          {post.tags.length > 0 && (
            <div className="post-tags">
              {post.tags.map(t => (
                <span key={t.id} className="tag">{t.name}</span>
              ))}
            </div>
          )}
        </>
      )}

      <Comments
        post={post}
        currentUser={currentUser}
        onRefresh={onRefresh}
      />
    </article>
  );
}

export default PostItem;
