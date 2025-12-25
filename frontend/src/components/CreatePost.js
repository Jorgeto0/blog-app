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
    <form onSubmit={submit}>
      <h3>Create Post</h3>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <input
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <button type="submit">Create</button>
    </form>
  );
}

export default CreatePost;
