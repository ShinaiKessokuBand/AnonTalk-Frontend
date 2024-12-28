import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// 获取所有用户信息接口
export const getAllUsers = async () => {
  try {
    const response = await apiClient.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
// export const getUserData = async (userId) => {
//   try {
//     const response = await apiClient.get(`/users/${userId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     throw error;
//   }
// };
// 获取当前在线用户数量接口
export const getOnlineUserCount = async () => {
  try {
    const response = await apiClient.get('/users/online');
    return response.data;
  } catch (error) {
    console.error('Error fetching online user count:', error);
    throw error;
  }
};

// 禁用用户接口
export const disableUser = async (userId) => {
    try {
      await apiClient.delete(`/users/${userId}`);
    } catch (error) {
      console.error('Error disabling user:', error);
      throw error;
    }
  };
// 导出聊天记录接口
export const exportChatHistory = async () => {
  try {
    const response = await apiClient.get('/chat/export');
    return response.data;
  } catch (error) {
    console.error('Error exporting chat history:', error);
    throw error;
  }
};