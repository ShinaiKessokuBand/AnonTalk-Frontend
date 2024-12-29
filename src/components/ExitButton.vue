<template>
    <div class="exit-button" @click="exitPage">
      <button>退出</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ExitButton',
    methods: {
      async exitPage() {
        try {
        // 调用后端的登出 API
        await axios.post('/api/logout');
        // 移除本地存储中的用户 ID
        //localStorage.removeItem('currentUserId');
        // 尝试关闭当前窗口
        window.close();
        // 如果 window.close() 不起作用，可以使用以下代码重定向到一个空白页
        window.location.href = 'about:blank';
      } catch (error) {
        console.error('Error logging out:', error);
        alert('登出失败，请重试');
      }
      }
    }
  };
  </script>
  
  <style scoped>
  text-style{
font-family:'CustomFont';
}
  .exit-button {
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 1000;
  }
  
  button {
    padding: 10px 20px;
    background-color: #3c8ce7;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #2a6ebd;
  }
  </style>