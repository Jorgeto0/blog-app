import api from './axios';

export const fetchPosts = () => {
  return api.get('/posts');
};

export const createPost = (data) => {
  return api.post('/posts', data);
};

export const updatePost = (id, data) => {
  return api.put(`/posts/${id}`, data);
};

export const deletePost = (id) => {
  return api.delete(`/posts/${id}`);
};

