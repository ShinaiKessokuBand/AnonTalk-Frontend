<template>
  <div class="chat">
    <div class="header">
    <h2>聊天界面</h2>
    <p>匹配类型: {{ matchType }}</p>
  </div>
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
    <div class="chat-container">
      <div class="chat-box">
        <div class="chat-header">
          <span>聊天</span>
          <button @click="closeChat">X</button>
        </div>
        <div class="chat-content" ref="chatContent">
          <div v-for="(message, index) in messages" :key="index" :class="{'my-message': message.isMine, 'other-message': !message.isMine}">
            {{ message.text }}
          </div>
        </div>
        <div class="chat-input">
          <input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="输入消息...">
          <button @click="sendMessage">发送</button>
        </div>
      </div>
    </div>
    <ExitButton />
  </div>
</template>

<script>
import ExitButton from '@/components/ExitButton.vue';

export default {
  name: 'Chat',
  components: {
    ExitButton
  },
  data() {
    return {
      messages: [],
      newMessage: '',
      socket: null,
      currentUserId: localStorage.getItem('currentUserId')
    }
  },
  computed: {

    matchType() {
      return this.$route.query.type
    }
  },
  async mounted() {
    this.$store.state.socket.onopen = () => {
      console.log('Chat WebSocket connected.');
    };
    /*
    this.socket.on('message', (message) => {
      const [type, text] = message.split(':');
      if (type === 'msg') {
        this.messages.push({ text, isMine: false });
        console.log('Received message:', message);
      }
    });*/
    const receiveMessage = (event) => {
      const receivedData = event.data;
    //  console.log('Received data:', receivedData);
      const [type, text] = receivedData.split(':');
      if(type === 'msg') {
        this.messages.push({ text, isMine: false });
        console.log('Received message:', text);
        console.log("message count:", this.messages.length);
      }
    }
    this.$store.state.socket.addEventListener('message', receiveMessage);
    /*
    const handleMessage = (event) => {
      const receivedData = event.data;
      console.log('Received data:', receivedData);
      const ret = JSON.parse(receivedData);

      if (ret.success) {
        this.isMatching = false;
        const currentUserId = localStorage.getItem('currentUserId');
        this.$router.push({ path: '/chat', query: { userId: currentUserId } });
        this.socket.removeEventListener('message', handleMessage); // Stop listening for messages
      } else {
        console.log('Waiting for success...');
      }
    };
    this.socket.addEventListener('message', handleMessage);
    */

  },
  methods: {
    scrollToBottom() {
      const chatContent = this.$refs.chatContent;
      chatContent.scrollTop = chatContent.scrollHeight;
    },
     sendMessage() {
      if (this.newMessage.trim() !== '') {
        const messageData = `msg:${this.newMessage}`;
        this.$store.state.socket.send(messageData);
        this.messages.push({ text: this.newMessage, isMine: true });
        this.newMessage = '';
        this.$nextTick(() => {
          this.scrollToBottom();
        })
        }
    },
    closeChat() {
      console.log('Closing chat');
      this.$store.state.socket.disconnect();
      this.$router.push('/home');
    },
    goToSettings() {
      this.$router.push('/settings');
    },
    goToSquare() {
      this.$router.push('/square');
    }
  },
  beforeDestroy() {
    if (this.$store.state.socket) {
      this.$store.state.socket.disconnect();
    }
  }
}
</script>

<style scoped>
text-style{
font-family:'CustomFont';
}
.chat {
  text-align: center;
  margin-top: 50px;
}
.header {
  position: fixed;
  top: 0;
  left: 0; /* 将 header 移动到左边 */
  width: auto; /* 可以改为 auto 或设定具体宽度 */
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 60px; /* 设定高度 */
  display: flex;
  justify-content: center; /* 水平居中元素 */
  align-items: center; /* 垂直居中元素 */
  flex-direction: column; /* 如果有多个元素，保持垂直排列 */
  padding: 0 20px; /* 可调整左右内边距 */
}


.header h2 {
  margin: 0;
  font-size: 40px;
  color:#f6f4f4;
}

.header p {
  margin: 0;
  font-size: 30px;
  color:#f4f0f0;
}
.sidebar {
  position: fixed;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 26px;
  color: #f0f3f6;
  font-family: 'CustomFont', 'Avenir', Helvetica, Arial, sans-serif;
}

.icon-button:hover {
  color: #2980b9;
}

.button-icon {
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
}

.chat-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.chat-box {
  width: 1300px;
  height: 880px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000; /* 确保在页面上层显示 */
  font-size: 30px; /* 修改聊天框字体大小 */
}

.chat-header {
  background-color: #3498db;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;/* 修改聊天框头部字体大小 */
}

.chat-content {
  flex-grow: 1;
  padding: 10px;
  overflow-y: auto;
  font-size: 30px; /* 修改聊天消息字体大小 */
}

.chat-input {
  display: flex;
  padding: 20px;
  border-top: 1px solid #ccc;
  font-size: 30px; /* 修改输入框字体大小 */
}

.chat-input input {
  flex-grow: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.chat-input button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'CustomFont', 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 24px; /* 修改发送按钮字体大小 */
}

.my-message {
  text-align: right;
  color: blue;
  font-size: 30px; /* 修改我的消息字体大小 */
}

.other-message {
  text-align: left;
  color: green;
  font-size: 30px; /* 修改对方消息字体大小 */
}
</style>
