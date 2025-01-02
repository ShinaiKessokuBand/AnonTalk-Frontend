<template>
  <div class="square">
    <button class="back-button" @click="goBack">
      <img src="@/assets/back-icon.png" alt="返回" class="button-icon">
      <span>返回</span>
    </button>
    <h2 class="animated-title">交友广场</h2>
    <div class="content">
      <div class="posts">
        <h3>帖子</h3>
        <div class="post-grid">
          <div v-for="(post, index) in posts" :key="index" class="post" @click="viewPost(post)">
            <h4>{{ post.title }}</h4>
            <p>{{ post.content }}</p>
          </div>
        </div>
      </div>
      <div class="post-form">
        <h3>发帖</h3>
        <form @submit.prevent="submitPost">
          <div class="form-group">
            <label for="title">标题</label>
            <input type="text" id="title" v-model="newPost.title" required />
          </div>
          <div class="form-group">
            <label for="content">内容</label>
            <textarea id="content" v-model="newPost.content" required></textarea>
          </div>
          <button type="submit">发布</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { createPost, getAllPosts } from '@/api/post.js';
export default {
  name: 'Square',
  data() {
    return {
      newPost: {
        title: '',
        content: ''
      },
      posts: [
        // { title: '帖子1', content: '这是第一个帖子内容。' },
        // { title: '帖子2', content: '这是第二个帖子内容。' },
        // { title: '帖子3', content: '这是第三个帖子内容。' },
        // { title: '帖子4', content: '这是第四个帖子内容。' },
        // { title: '帖子5', content: '这是第五个帖子内容。' }
      ]
    };
  },
  async created() {
    this.posts = await getAllPosts();
  },
  methods: {
   async submitPost() {
      if (this.newPost.title && this.newPost.content) {
        // this.posts.push({ ...this.newPost });
        // this.newPost.title = '';
        // this.newPost.content = '';
        const postData = {
          ...this.newPost,
          userid: localStorage.getItem('currentUserId') // 假设用户名存储在 localStorage 中
        };
        try {
          const newPost = await createPost(postData);
          this.posts.push(newPost);
          this.newPost.title = '';
          this.newPost.content = '';
        } catch (error) {
          console.error('Error creating post:', error);
        }
      }
    },
    viewPost(post) {
      this.$router.push({ name: 'PostDetail', params: { post } });
    },
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
text-style{
font-family:'CustomFont';
}
.square {
  width: 100vw; /* 占满整个视口宽度 */
  font-size: 20px;
  margin: 0 auto;
  padding: 20px;
}

.animated-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 80px;
  color: #f9f9f9;
  animation: pulsate 1.5s infinite; /* 添加动画 */
}

@keyframes pulsate {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.content {
  display: flex;
  justify-content: space-between;
  gap: 20px; /* 增加模块之间的间距 */
}

.posts {
  width: 66.66%; /* 左边宽度是右边的两倍 */
  padding: 20px;
  overflow-y: auto; /* 允许滚动查看帖子 */
  height: calc(100vh - 100px); /* 高度几乎占满整个界面 */
}

.posts h3 {
  margin-bottom: 20px;
  font-size: 36px;
  color: #f9f9f9;
}

.post-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 两个帖子一排 */
  gap: 20px;
}

.post {
  background-color: white;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  width: 400px; /* 固定宽度 */
  height: 300px; /* 固定高度 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.post h4 {
  margin: 0 0 10px;
}

.post p {
  margin: 0;
  text-align: left; /* 左对齐 */
}

.post-form {
  width: 33.33%; /* 右边宽度 */
  height: calc(100vh - 60px); /* 高度几乎占满整个界面 */
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: sticky; /* 固定位置 */
  top: 20px; /* 距离顶部 */
}

.post-form h3 {
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
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  display: block;
  width: auto; /* 按钮宽度自适应内容 */
  padding: 10px 20px; /* 增加内边距 */
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: center; /* 按钮居中 */
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
