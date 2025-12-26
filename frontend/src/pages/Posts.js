import { useEffect, useState } from 'react';
import { fetchPosts } from '../api/posts';
import { getCurrentUser } from '../auth/user';  

import CreatePost from '../components/CreatePost';
import Expiration from '../components/Expiration';
import PostItem from '../components/PostItem';



function Posts() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

useEffect(() => {
  getCurrentUser().then(setCurrentUser);
  loadPosts();
}, []);

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

      {posts.map(post => (
        <div className="post">
          <PostItem
            key={post.id}
            post={post}
            currentUser={currentUser}
            onRefresh={loadPosts}
          />
        </div>
      ))}
    </div>
  );
}


export default Posts;
