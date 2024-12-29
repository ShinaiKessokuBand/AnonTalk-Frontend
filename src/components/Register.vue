<template>
  <div class="register-container">
    <h1 class="title">Anontalk!</h1>
    <div class="register">
      <form @submit.prevent="register">
        <div>
          <label for="phone">手机号:</label>
          <input type="text" v-model="phone" id="phone" required>
        </div>
        <div>
          <label for="username">用户名:</label>
          <input type="text" v-model="username" id="username" required>
        </div>
        <div>
          <label for="password">密码:</label>
          <input type="password" v-model="password" id="password" required>
        </div>
        <div>
          <label for="conpassword">确认密码:</label>
          <input type="password" v-model="conpassword" id="conpassword" required>
        </div>
        <button type="submit">注册</button>
        <p class="typing-text2">{{ typingText2 }}</p>
      </form>
    </div>
    <ExtiButton/>
  </div>
</template>

<script>
import { createUser } from '@/api/user.js'
import ExitButton from '@/components/ExitButton.vue'
export default {
  name: 'Register',
  components: {
    ExitButton
  },
  data() {
    return {
      phone: '',
      username: '',
      password: '',
      conpassword: '',
      typingText2: ''
    }
  },
  mounted() {
    this.startTypingEffect2("加入我们，获得不一样的交友体验~");
  },
  methods: {
    async register() {
      if (this.password !== this.conpassword) {
        alert('密码和确认密码不一致');
        return;
      }

      const userData = {
        phone: this.phone,
        username: this.username,
        password: this.password
      };

      try {
        const response = await createUser(userData);
        console.log('User created successfully:', response);
        this.$router.push('/home');
      } catch (error) {
        console.error('Error creating user:', error);
        alert('注册失败，请重试');
      }
    },
    startTypingEffect2(text2) {
      let index = 0;
      const typingSpeed2 = 100; // 打字速度，单位毫秒
      const type = () => {
        if (index < text2.length) {
          this.typingText2 += text2.charAt(index);
          index++;
          setTimeout(type, typingSpeed2);
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
  height: 100vh;
}

.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* 从顶部开始排列 */
  padding-top: 100px; /* 距离顶部的间距 */
}

.typing-container {
  margin-bottom: 20px;
}

.typing-text2 {
  font-size: 24px;
  color: #59a84d;
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
    border-color: #59a84d;
  }
}

.register {
  max-width: 600px; /* 设置最大宽度 */
  height: 600px; /* 设置高度 */
  margin: 0 auto; /* 设置位置 */
  padding: 60px;
  border: 3px solid #59a84d;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 50px; /* 增加顶部间距 */
}

.title {
  font-size: 200px; /* 更大的字体 */
  color: #f8f9f9;
  margin: 40px 0 20px; /* 增加顶部和底部的间距 */
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

.register h2 {
  font-size: 24px;
  color: #59a84d;
}

.register label {
  font-size: 18px;
  color: #333;
}

.register input {
  width: calc(100% - 20px);
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.register button {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 4px;
  background-color: #59a84d;
  color: white;
  font-size: 18px;
  cursor: pointer;
}

.register button:hover {
  background-color: #59a84d;
}
</style>