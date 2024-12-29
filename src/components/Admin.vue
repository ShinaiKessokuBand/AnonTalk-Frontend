<template>
  <div class="admin">
    <h2>管理员界面</h2>
    <div class="online-users">
      <h3>当前在线用户数量: {{ onlineUserCount }}</h3>
    </div>
    <div class="user-list">
      <h3>所有用户</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>用户名</th>
            <th>昵称</th>
            <th>性别</th>
            <th>爱好</th>
            <th>手机号</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.nickname }}</td>
            <td>{{ user.gender }}</td>
            <td>{{ user.hobbies }}</td>
            <td>{{ user.phone }}</td>
            <td>
              <button @click="disableUser(user.id)">禁用用户</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="export-chat">
      <button @click="exportChatHistory">导出聊天记录</button>
    </div>
    <ExitButton />
  </div>
</template>

<script>
import { getAllUsers, getOnlineUserCount, disableUser, exportChatHistory } from '@/api/admin.js';
import ExitButton from '@/components/ExitButton.vue';

export default {
  name: 'Admin',
  components: {
    ExitButton
  },
  data() {
    return {
      onlineUserCount: 0,
      users: []
    };
  },
  async created() {
    try {
      this.onlineUserCount = await getOnlineUserCount();
      this.users = await getAllUsers();
    } catch (error) {
      console.error('Error initializing admin data:', error);
    }
  },
  methods: {
    async disableUser(userId) {
      try {
        await disableUser(userId);
        this.users = this.users.filter(user => user.id !== userId);
      } catch (error) {
        console.error('Error disabling user:', error);
        alert('禁用用户失败，请重试');
      }
    },
    async exportChatHistory() {
      try {
        const chatHistory = await exportChatHistory();
        // 处理导出的聊天记录，例如下载为文件
        console.log('导出的聊天记录:', chatHistory);
      } catch (error) {
        console.error('Error exporting chat history:', error);
        alert('导出聊天记录失败，请重试');
      }
    }
  }
};
</script>

<style scoped>
text-style{
font-family:'CustomFont';
}
.admin {
  padding: 20px;
}

.online-users {
  margin-bottom: 20px;
}

.user-list {
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

th {
  background-color: #f9f9f9;
}

button {
  padding: 5px 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}
</style>