<template>
  <div class="home">
    <h2 class="home-title">欢迎来到主页喵 ^_^</h2>
    <h3 class="home-subtitle">请选择匹配模式：</h3>
    <div class="sidebar">
      <button class="icon-button" @click="goToSettings">
        <img src="@/assets/settings-icon.png" alt="个人设置" class="button-icon">
        <span>个人设置</span>
      </button>
      <button class="icon-button" @click="goToSquare">
        <img src="@/assets/square-icon.png" alt="交友广场" class="button-icon">
        <span>交友广场</span>
      </button>
    </div>
    <div class="main-content">
      <div class="buttons-container">
        <button class="match-button" @click="matchNormalUser">
          <img src="@/assets/normal-user-icon.png" alt="普通用户匹配" class="button-icon">
          <span>普通用户匹配</span>
        </button>
        <button class="match-button" @click="matchVipUser">
          <img src="@/assets/vip-user-icon.png" alt="会员用户匹配" class="button-icon">
          <span>会员用户匹配</span>
        </button>
      </div>
    </div>
    <ExitButton />
  </div>
</template>

<script>
import { matchNormalUser, matchVipUser } from '@/api/match.js';
import io from 'socket.io-client';
import ExitButton from '@/components/ExitButton.vue';

export default {
  name: 'Home',
  components: {
    ExitButton
  },
  data() {
    return {
      socket: null,
      isMatching: false
    };
  },
  created() {
    this.socket = io('http://localhost:8089'); 
    this.socket.on('matchResponse', (response) => {
      try {
        const data = JSON.parse(response);
        if (data.data.success) {
          const currentUserId = localStorage.getItem('currentUserId');
          this.$router.push({ path: '/chat', query: { userId: currentUserId } });
        }
        else {
          alert("匹配等待中");
          this.isMatching = true;
        }
      } catch (error) {
        console.error('Failed to parse response:', error);
        alert("匹配失败");
      }
    });
  },
 
  methods: {
    matchUser() {
      this.socket.emit('matchRequest');
      this.isMatching = true;
    },
    goToSettings() {
      this.$router.push('/settings');
    },
    goToSquare() {
      this.$router.push('/square');
    }
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
</script>

<style scoped>
text-style{
font-family:'CustomFont';
}
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 0px;
  font-family: 'CustomFont', 'Avenir', Helvetica, Arial, sans-serif; /* 应用自定义字体 */
  background-image: url('@/assets/home-background.jpg'); /* 设置特定背景图片 */
  background-size: cover; /* 背景图片覆盖整个区域 */
  background-position: center; /* 背景图片居中 */
  background-repeat: no-repeat; /* 防止背景图片重复 */
  height: 100vh; /* 设置高度为视口高度 */
  width: 100vw; /* 设置宽度为视口宽度 */
}

.home-title {
  font-size: 100px; /* 增大标题字体大小 */
  font-family: 'CustomFont', 'Avenir', Helvetica, Arial, sans-serif; /* 应用自定义字体 */
  margin-bottom: 20px; /* 增加标题和内容之间的间距 */
  position: fixed; /* 固定位置 */
  top: 20px; /* 距离顶部 */
  left: 50%; /* 水平居中 */
  transform: translateX(-50%); /* 水平居中 */
  animation: dropIn 1s ease-out; /* 添加动画 */
  color: aliceblue; /* 修改标题颜色 */
}

.home-subtitle {
  font-size: 60px; /* 设置副标题字体大小 */
  font-family: 'CustomFont', 'Avenir', Helvetica, Arial, sans-serif; /* 应用不同的字体 */
  margin-bottom: 20px; /* 增加副标题和内容之间的间距 */
  position: fixed; /* 固定位置 */
  top: 200px; /* 距离顶部 */
  left: 50%; /* 水平居中 */
  transform: translateX(-50%); /* 水平居中 */
  color: aliceblue; /* 修改副标题颜色 */
  animation: fadeIn 3s ease-out; /* 添加动画 */
}

@keyframes dropIn {
  0% {
    top: -100px; /* 从页面顶部外开始 */
    opacity: 0;
  }
  100% {
    top: 30px; /* 最终位置 */
    opacity: 1;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed; /* 固定位置 */
  left: 20px; /* 距离左边缘 */
  top: 50%; /* 垂直居中 */
  transform: translateY(-50%); /* 垂直居中 */
}

.icon-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  margin-bottom: 40px; /* 增加按钮之间的间隔 */
  font-size: 30px; /* 增大字体大小 */
  color: #fcfcfd;
  font-family: 'CustomFont', 'Avenir', Helvetica, Arial, sans-serif; /* 应用自定义字体 */
}

.icon-button:hover {
  color: #2980b9;
}

.button-icon {
  width: 80px; /* 设置图标宽度 */
  height: 80px; /* 设置图标高度 */
  margin-bottom: 10px; /* 增加图标和文字之间的间距 */
}

.main-content {
  flex-grow: 1;
  margin-left: 120px; /* 增加与侧边栏的间隔 */
  margin-top: 200px; /* 增加与标题和副标题的间距 */
}

.background-container {
  position: relative;
  animation: fadeIn 2s ease-out; /* 添加背景图片的动画 */
}

.background-image {
  width: 100%;
  height: auto;
}

.buttons-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: fadeIn 2s ease-out; /* 添加按钮的动画 */
}

.match-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px; /* 增大按钮宽度 */
  padding: 20px; /* 增大按钮内边距 */
  margin: 0 20px; /* 增加按钮之间的间隔 */
  font-size: 30px; /* 增大字体大小 */
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'CustomFont', 'Avenir', Helvetica, Arial, sans-serif; /* 应用自定义字体 */
  color: #fafafa;
}

.match-button:hover {
  color: #2980b9;
}

.match-button .button-icon {
  width: 100px; /* 设置图标宽度 */
  height: 100px; /* 设置图标高度 */
  margin-bottom: 10px; /* 增加图标和文字之间的间距 */
}
</style>