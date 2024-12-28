<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@font-face {
  font-family: 'CustomFont';
  src: url('@/assets/custom-font.ttf') format('truetype');
}

body {
  font-family: 'CustomFont', 'Avenir', Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
}

body::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('@/assets/background.jpg') no-repeat center center fixed;
  background-size: cover;
  opacity: 0.5; /* 调整不透明度 */
  z-index: -1; /* 确保背景图片在所有内容后面 */
}

#app {
  font-family: 'CustomFont', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 100vh;
  position: relative;
  z-index: 1; /* 确保内容在背景图片前面 */
}
</style>