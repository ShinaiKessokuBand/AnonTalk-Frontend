<template>
  <div class="settings">
    <button class="back-button" @click="goBack">
      <img src="@/assets/back-icon.png" alt="返回" class="button-icon">
      <span>返回</span>
    </button>
    <h2>个人设置</h2>
    <div class="settings-section">
      <h3>个人信息</h3>
      <form @submit.prevent="updatePersonalInfo">
        <div class="form-group">
          <label for="userId">用户ID</label>
          <input type="text" id="userId" v-model="userId" disabled />
        </div>
        <div class="form-group">
          <label for="username">用户名</label>
          <input type="text" id="username" v-model="personalInfo.username" />
        </div>
        <div class="form-group">
          <label for="gender">性别</label>
          <select id="gender" v-model="personalInfo.gender">
            <option value="male">男</option>
            <option value="female">女</option>
            <option value="other">其他</option>
          </select>
        </div>
        <div class="form-group">
          <label for="hobbies">爱好</label>
          <input type="text" id="hobbies" v-model="personalInfo.hobbies" />
        </div>
        <button type="submit">保存个人信息</button>
      </form>
    </div>
    <div class="settings-section">
      <h3>账号安全</h3>
      <form @submit.prevent="updateAccountSecurity">
        <div class="form-group">
          <label for="password">新密码</label>
          <input type="password" id="password" v-model="accountSecurity.password" />
        </div>
        <div class="form-group">
          <label for="phone">手机号</label>
          <input type="text" id="phone" v-model="accountSecurity.phone" />
        </div>
        <button type="submit">保存账号安全设置</button>
      </form>
    </div>
    <ExitButton />
  </div>
</template>

<script>
import {getUserData, updateUser, updateUserSecurity} from '@/api/user.js';
import ExitButton from '@/components/ExitButton.vue';

export default {
  name: 'Settings',
  components: {
    ExitButton
  },
  data() {
    return {
      userId: 0, // 添加用户ID字段
      personalInfo: {
        username: '', // 将 nickname 替换为 username
        gender: '',
        hobbies: ''
      },
      accountSecurity: {
        password: '',
        phone: ''
      }
    };
  },
  async created() {
    // 获取用户ID并设置到data中
    const currentUserId = localStorage.getItem('currentUserId'); // 假设用户ID存储在用户本地localStorage中
    if (currentUserId) {
      try {
        const userData = await getUserData(currentUserId);
        this.userId = userData.id; // 将 nickname 替换为 username
        this.personalInfo.gender = userData.gender;
        this.personalInfo.hobbies = userData.hobbies;
        this.accountSecurity.phone = userData.phone;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  },
  methods: {
    async updatePersonalInfo() {
      const userData = {
        username: this.personalInfo.username,
        gender: this.personalInfo.gender,
        hobbies: this.personalInfo.hobbies
      };
      try {
        const currentUserId = localStorage.getItem('currentUserId');
        const updatedUser = await updateUser(currentUserId, userData);
        console.log('更新个人信息:', updatedUser);
        alert('个人信息已更新');
      } catch (error) {
        console.error('Error updating personal info:', error);
        alert('更新个人信息失败，请重试');
      }
    },
    async updateAccountSecurity() {
      const userData = {
        password: this.accountSecurity.password,
        phone: this.accountSecurity.phone
      };
      try {
        const currentUserId = localStorage.getItem('currentUserId');
        const updatedUser = await updateUserSecurity(currentUserId, userData);
        console.log('更新账号安全设置:', updatedUser);
        alert('账号安全设置已更新');
      } catch (error) {
        console.error('Error updating account security:', error);
        alert('更新账号安全设置失败，请重试');
      }
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>


  <style scoped>
  text-style{
font-family:'CustomFont';
}
  .settings {
    max-width: 800px; /* 修改表单容器的最大宽度 */
    margin: 0 auto;
    padding: 40px;
    background-color: #f9f9f9;
    border-radius: 40px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .settings h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 30px;
  }

  .back-button {
    position: fixed; /* 固定位置 */
    top: 20px; /* 距离顶部 */
    left: 20px; /* 距离左边缘 */
    display: flex;
    flex-direction: column; /* 垂直排列 */
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    background: none; /* 移除背景颜色 */
    color: black; /* 文字颜色 */
    border: none; /* 移除边框 */
    cursor: pointer;
  }

  .back-button:hover {
    background-color: rgba(0, 0, 0, 0.1); /* 添加悬停效果 */
  }

  .button-icon {
    width: 24px;
    height: 24px;
    margin-bottom: 5px; /* 图标和文字之间的间距 */
  }

  .settings-section {
    margin-bottom: 30px;
  }

  .settings-section h3 {
    margin-bottom: 10px;
  }

  .form-group {
    margin-bottom: 15px;
  }

  .form-group label {
    display: block;
    margin-bottom: 5px;
  }

  .form-group input,
  .form-group select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #2980b9;
  }

  .back-button {
    position: fixed; /* 固定位置 */
    top: 20px; /* 距离顶部 */
    left: 20px; /* 距离左边缘 */
    display: flex;
    flex-direction: column; /* 垂直排列 */
    align-items: center;
    background: none; /* 移除背景颜色 */
    border: none; /* 移除边框 */
    cursor: pointer;
  }

  .back-button:hover {
    color: #2980b9;
  }

  .button-icon {
    width: 80px;
    font-size: 80px;
    height: 80px;
    margin-bottom: 5px; /* 图标和文字之间的间距 */
  }
  </style>
