import axios from 'axios';

// 创建一个 axios 实例
const apiClient = axios.create({
    baseURL: 'http://localhost:8089/api',
  headers: {
    'Content-Type': 'application/json'
  }
});



//  API 调用函数（注册新用户）
export const createUser = async (userData) => {
  try {
    const response = await apiClient.post('/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

//  API 调用函数（用户登录）
export const loginUser = async (userData) => {
  try {
    const response = await apiClient.post('/login', userData);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

//  API 调用函数（更新用户信息）
export const updateUser = async (userId, userData) => {
  try {
    const response = await apiClient.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};


