<template>
  <!-- 页首二号 -->
  <header class="two">
    <main>
      <a href class="logo">
        <h1>生鲜购</h1>
        <img src="https://ftp.bmp.ovh/imgs/2019/12/3fb95a4c383f6b0e.png" alt />
      </a>
    </main>
  </header>
</template>

<script>
export default {
  name: "HeaderTwo"
};
</script>

<style lang="scss" scoped>
// 页首二号
header.two {
  height: 78px;
  background-color: #e0e0e0;
  padding: 15px 0 5px;
  main {
    position: relative;
    a.logo {
      height: 100%;
      h1 {
        position: absolute;
        left: -9999px;
      }
      img {
        height: 100%;
      }
    }
  }
}
</style>