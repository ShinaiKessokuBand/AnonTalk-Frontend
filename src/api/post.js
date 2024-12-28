// api/post.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/posts',
  headers: {
    'Content-Type': 'application/json'
  }
});
//创建新的帖子
export const createPost = async (postData) => {
  try {
    const response = await apiClient.post('/', postData);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};
//获取所有帖子信息并且显示
export const getAllPosts = async () => {
  try {
    const response = await apiClient.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};
//点进去帖子查看详细信息
export const getPostById = async (postId) => {
    try {
      const response = await apiClient.get(`/${postId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  };
//点赞帖子
export const likePost = async (postId, username) => {
  try {
    const response = await apiClient.post(`/${postId}/like`, null, { params: { username } });
    return response.data;
  } catch (error) {
    console.error('Error liking post:', error);
    throw error;
  }
};
//评论帖子
export const commentPost = async (postId, commentData) => {
  try {
    const response = await apiClient.post(`/${postId}/comment`, commentData);
    return response.data;
  } catch (error) {
    console.error('Error commenting on post:', error);
    throw error;
  }
};