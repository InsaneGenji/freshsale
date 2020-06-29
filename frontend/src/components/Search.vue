<template>
  <!-- 搜索部分 -->
  <div id="search">
    <main>
      <a href class="logo">
        <h1>生鲜购</h1>
        <img src="https://ftp.bmp.ovh/imgs/2019/12/3fb95a4c383f6b0e.png" alt />
      </a>
      <!-- 搜索栏 -->
      <form action>
        <input type="search" placeholder="输入商品名/编号/拼音" />
        <input type="submit" value="搜索" />
        <p>
          <template v-for="item of goodsLists" v-if="item.type==='搜索栏'">
            <router-link to="/detail" v-for="obj of item.list">{{obj.name}}</router-link>
          </template>
        </p>
      </form>
      <el-badge
        :value="totalNum"
        :max="99"
        class="item cart"
        type="primary"
        v-loading="cartLoading"
      >
        <a @click="cart">
          <span>{{totalPrice}}</span>
        </a>
      </el-badge>
    </main>
  </div>
</template>

<script>
export default {
  name: "Search",
  mounted() {
    this.$store.dispatch("getCart");
  },
  computed: {
    goodsLists() {
      return this.$store.state.goodsLists;
    },
    cartLoading() {
      return this.$store.state.cartLoading;
    },
    totalPrice() {
      if (this.$cookies.isKey("username")) {
        let totalPrice = 0;
        for (let item of this.$store.state.cart) {
          totalPrice += item.price * item.num;
        }
        return totalPrice.toFixed(2);
      } else {
        const hasCart = 0;
        return hasCart.toFixed(2);
      }
    },
    totalNum() {
      if (this.$cookies.isKey("username")) {
        return this.$store.state.cart.length;
      } else {
        return 0;
      }
    }
  },
  methods: {
    cart() {
      this.$router.push("/cart");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/public.scss";

// 搜索部分
#search {
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
    // 搜索栏
    form {
      width: 528px;
      font-size: 12px;
      position: absolute;
      top: 0;
      left: 290px;
      input[type="search"],
      input[type="submit"] {
        display: block;
        height: 28px;
        border: 1px solid $miku;
        float: left;
      }
      input[type="search"] {
        width: 447px;
        background-color: transparent;
        padding: 0 10px;
      }
      input[type="submit"] {
        width: 81px;
        font-size: 14px;
        color: #fff;
        background-color: $miku;
      }
      p {
        margin-top: 10px;
        float: left;
        a {
          margin-right: 9px;
          &:nth-of-type(odd) {
            color: $miku;
          }
        }
      }
    }
    .cart {
      float: right;
      margin-right: 8px;
      a {
        color: $miku;
        background-color: #fff;
        border: 1px solid $miku;
        cursor: pointer;
        padding: 10px 39px;
        span {
          display: inline-block;
          font-size: 25px;
          line-height: 100%;
          position: relative;
          &::before {
            content: "￥";
            display: inline-block;
            position: absolute;
            top: 2px;
            left: -26px;
          }
        }
      }
    }
  }
}
</style>