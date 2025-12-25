import { useEffect, useState } from 'react';
import { fetchPosts } from '../api/posts';

import CreatePost from '../components/CreatePost';
import Expiration from '../components/Expiration';

function Posts() {
  const [posts, setPosts] = useState([]);

  const loadPosts = () => {
    fetchPosts()
      .then((res) => setPosts(res.data))
      .catch(() => alert('Failed to load posts'));
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div>
      <CreatePost onCreated={loadPosts} />

      <h2>Posts</h2>

      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <Expiration expiresAt={post.expires_at} />
        </div>
      ))}
    </div>
  );
}


export default Posts;
