<template>
  <div>
    <!-- 路由部分 -->
    <router-view />

    <!-- 页尾 -->
    <Footer />
  </div>
</template>

<script>
import "@/assets/css/reset.css";
import Footer from "@/components/Footer";

export default {
  components: {
    Footer
  }
};
</script>
