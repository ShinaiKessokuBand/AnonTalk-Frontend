<template>
  <div class="login-container">
    <div class="typing-container">
      <p class="typing-text">{{ typingText }}</p>
    </div>
    <h1 class="title">Anontalk!</h1>
    <div class="login">
      <form @submit.prevent="login">
        <div>
          <label for="username">用户名:</label>
          <input type="text" v-model="username" id="username" required>
        </div>
        <div>
          <label for="password">密码:</label>
          <input type="password" v-model="password" id="password" required>
        </div>
        <button type="submit">登录</button>
      </form>
      <button @click="goToRegister">注册</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ExitButton from '@/components/ExitButton.vue';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      typingText: ''
    }
  },
  mounted() {
    this.startTypingEffect("我与世界相遇，世界充满梦想  ----欢迎来到 Anontalk 聊天室");
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('/api/login', {
          username: this.username,
          password: this.password
        });
        if (response.data.success) {
          localStorage.setItem('currentUserId', response.data.user.id); // 将用户 ID 存储在本地存储中
          this.$router.push('/home');
        } else {
          alert('用户名或密码错误');
        }
      } catch (error) {
        console.error('Error logging in:', error);
        alert('登录失败，请重试');
      }
    },
    goToRegister() {
      this.$router.push('/register')
    },
    startTypingEffect(text) {
      let index = 0;
      const typingSpeed = 150; // 打字速度，单位毫秒
      const type = () => {
        if (index < text.length) {
          this.typingText += text.charAt(index);
          index++;
          setTimeout(type, typingSpeed);
        }
      };
      type();
    }
  }
}
</script>

<style>
text-style{
font-family:'CustomFont';
}

body {
  margin: 0;
  padding: 0;
  background: url('@/assets/background.jpg') no-repeat center center fixed;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* 从顶部开始排列 */
  padding-top: 0px; /* 距离顶部的间距 */
}

.typing-container {
  margin-bottom: 0px;
}

.typing-text {
  font-size: 36px;
  color: #f2f3f3;
  white-space: nowrap;
  overflow: hidden;
  border-right: 3px solid;
  animation: blink-caret 0.75s step-end infinite;
}

@keyframes blink-caret {
  from, to {
    border-color: transparent;
  }
  50% {
    border-color: #3498db;
  }
}

.login {
  max-width: 500px;
  height: 300px; /* 设置高度 */
  margin: 0 auto; /* 设置位置 */
  padding: 40px;
  border: 3px solid #3498db;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 0px; /* 增加顶部间距 */
}

.title {
  font-size: 300px; /* 更大的字体 */
  color: #f9f8fc;
  margin: 0px 0 0px; /* 增加顶部和底部的间距 */
  animation: flyIn 2s ease-out;
}

@keyframes flyIn {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  50% {
    opacity: 1;
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

.login h2 {
  font-size: 36px;
  color: #3498db;
}

.login label {
  font-size: 24px;
  color: #333;
}

.login input {
  width: calc(100% - 20px);
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.login button {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 4px;
  background-color: #3498db;
  color: white;
  font-size: 18px;
  cursor: pointer;
}

.login button:hover {
  background-color: #2980b9;
}
</style>