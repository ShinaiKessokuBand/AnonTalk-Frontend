<template>
    <div>
      <div class="typewriter">
        <h1>{{ typewriterText }}</h1>
      </div>
      <div class="post-detail">
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
        <div class="actions">
          <button class="like-button" @click="likePost">点赞 {{ likes }}</button>
        </div>
        <div class="comments">
          <h3>评论区不是无人区，请文明发言~</h3>
          <div v-for="(comment, index) in comments" :key="index" class="comment">
            <p>{{ comment }}</p>
          </div>
        </div>
        <form @submit.prevent="addComment" class="comment-form">
          <div class="form-group">
            <label for="comment">添加评论</label>
            <input type="text" id="comment" v-model="newComment" required />
          </div>
          <button type="submit" class="submit-button">发布评论</button>
        </form>
        <button class="back-button" @click="goBack">
          <img src="@/assets/back-icon.png" alt="返回" class="button-icon">
          <span>返回</span>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { getPostById, likePost, commentPost } from '@/api/post.js';
  import ExitButton from '@/components/ExitButton.vue';

  export default {
    name: 'PostDetail',
    data() {
      return {
      post: {},
      likes: 0,
      comments: [],
      newComment: '',
      typewriterText: ''
    }
    },
    async created() {
    const postId = this.$route.params.post.id;
    const post = await getPostById(postId);
    this.post = post;
    this.likes = post.likes.length;
    this.comments = post.comments;
  },
    mounted() {
      this.typeWriterEffect("天空的飞鸟飞的那么遥远");
    },
    methods: {
      async likePost() {
      const postId = this.post.id;
      const username = localStorage.getItem('currentUserId');
      const updatedPost = await likePost(postId, username);
      this.likes = updatedPost.likes.length;
    },
    async addComment() {
      if (this.newComment) {
        const postId = this.post.id;
        const commentData = {
          username: localStorage.getItem('currentUserId'),
          content: this.newComment
        };
        const updatedPost = await commentPost(postId, commentData);
        this.comments = updatedPost.comments;
        this.newComment = '';
      }
    },
      goBack() {
        this.$router.push('/square');
      },
      typeWriterEffect(text) {
        let i = 0;
        const speed = 100; // 打字速度
        const typeWriter = () => {
          if (i < text.length) {
            this.typewriterText += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
          }
        };
        typeWriter();
      }
    }
  }
  </script>
  
  <style scoped>
  .typewriter {
    position: fixed;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    overflow: hidden;
    border-right: 4px solid black; /* 光标效果 */
    font-size: 24px;
    font-family: 'Courier New', Courier, monospace; /* 打字机字体 */
    color:#f9f9f9
  }
  
  .typewriter h1 {
    display: inline;
  }
  
  .post-detail {
    width: 1200px; /* 固定宽度 */
    height: 80vh; /* 固定高度 */
    margin: 60px auto 0; /* 增加顶部间距 */
    padding: 40px; /* 增加内边距 */
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* 确保内容在背景框内垂直分布 */
    position: relative;
  }
  
  .post-detail h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .actions {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .comments {
    margin-top: 20px;
    flex-grow: 1; /* 确保评论区占据剩余空间 */
    overflow-y: auto; /* 如果评论过多，允许滚动 */
  }
  
  .comment {
    background-color: white;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
    word-wrap: break-word; /* 确保评论内容过长时自动换行 */
    text-align: left; /* 评论内容左对齐 */
  }
  
  .comment-form {
    margin-top: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    display: block;
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
  
  .like-button, .submit-button {
    width: auto; /* 按钮宽度自适应内容 */
    padding: 10px 20px; /* 增加内边距 */
    margin: 10px auto; /* 居中对齐 */
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
    font-size: 200;
  }
  
  .back-button:hover {
    color: #2980b9;
  }
  
  .button-icon {
    width: 100px;
    height: 100px;
    
    margin-bottom: 5px; /* 图标和文字之间的间距 */
  }
  </style>