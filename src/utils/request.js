// src/utils/request.js
import axios from 'axios';

// 创建 axios 实例
const service = axios.create({
  baseURL: '/api', // 基础请求路径（可以根据实际情况修改）
  timeout: 5000,   // 请求超时时间（单位：毫秒）
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前处理，比如：添加 token
    const token = localStorage.getItem('token'); // 假设 token 存储在 localStorage 中
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // 将 token 添加到请求头中
    }
    return config;
  },
  error => {
    // 处理请求错误
    console.error('请求错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 统一处理响应数据
    return response.data; // 直接返回数据部分
  },
  error => {
    // 处理响应错误
    console.error('响应错误:', error.response || error);
    return Promise.reject(error);
  }
);

export default service;
