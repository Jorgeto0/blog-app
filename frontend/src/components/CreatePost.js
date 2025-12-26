import { useState } from 'react';
import { createPost } from '../api/posts';

function CreatePost({ onCreated }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');

  const submit = async (e) => {
    e.preventDefault();

    const tagList = tags.split(',').map((t) => t.trim()).filter(Boolean);

    try {
      await createPost({
        title,
        body,
        tags: tagList,
      });

      setTitle('');
      setBody('');
      setTags('');
      onCreated();
    } catch {
      alert('Post creation failed');
    }
  };

  return (
    <form onSubmit={submit} className="create-post-form">
      <h3>✨ Create New Post</h3>

      <input
        placeholder="Post title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="What's on your mind? (This will expire in 24 hours)..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows="6"
        required
      />

      <input
        placeholder="Add tags (comma separated, optional)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <button type="submit">Publish Post</button>
    </form>
  );
}

export default CreatePost;
