import axios from 'axios';

// 创建一个 axios 实例
const apiClient = axios.create({
  baseURL: 'http://localhost:8089/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// 普通用户匹配接口
export const matchNormalUser = async () => {
  try {
    const response = await apiClient.get('/match?type=normal');
    return response.data;
  } catch (error) {
    console.error('Error matching normal user:', error);
    throw error;
  }
};

// 会员用户匹配接口
export const matchVipUser = async () => {
  try {
    const response = await apiClient.get('/match?type=vip');
    return response.data;
  } catch (error) {
    console.error('Error matching VIP user:', error);
    throw error;
  }
};