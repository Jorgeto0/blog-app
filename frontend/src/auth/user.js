import api from '../api/axios';

export const getCurrentUser = async () => {
  const { data } = await api.get('/me');
  return data.data;
};