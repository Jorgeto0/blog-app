import api from './axios';

export const addComment = (postId, body) =>
  api.post(`/posts/${postId}/comments`, { body });

export const updateComment = (id, body) =>
  api.put(`/comments/${id}`, { body });

export const deleteComment = (id) =>
  api.delete(`/comments/${id}`);
