import axios from 'axios';
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/messages',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
// 获取聊天历史记录接口
export const getChatHistory = async (chatId) => {
    try {
      const response = await apiClient.get(`/${chatId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching chat history:', error);
      throw error;
    }
  };