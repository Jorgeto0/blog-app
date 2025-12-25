import api from './axios';

export const fetchPosts = () => {
  return api.get('/posts');
};

export const createPost = (data) => {
  return api.post('/posts', data);
};
