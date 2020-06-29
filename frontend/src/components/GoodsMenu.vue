<template>
  <!-- 商品菜单 -->
  <nav id="GoodsMenu">
    <li class="nlif" @click="clickShow" @mouseover="showNav" @mouseout="hideNav">
      <h2>
        全部商品分类
        <i class="el-icon-caret-bottom"></i>
      </h2>
    </li>
    <template v-for="item of goodsLists">
      <li
        class="nli"
        @mouseover="showNav"
        @mouseout="hideNav"
        v-if="item.type!=='搜索栏'"
        v-show="showFlag1||showFlag2"
      >
        <p>
          <span></span>
          {{item.type}}
          <i class="el-icon-arrow-right"></i>
        </p>
        <!-- 二级菜单 -->
        <ul v-loading="loading">
          <figure>
            <figcaption>{{item.type}}</figcaption>
            <a v-for="goods of item.list" @click="goToDetail(goods)">{{goods.name}}</a>
          </figure>
        </ul>
      </li>
    </template>
  </nav>
</template>

<script>
export default {
  name: "GoodsMenu",
  data() {
    return {
      showFlag1: true,
      showFlag2: false,
      canClick: true
    };
  },
  mounted() {
    if (this.$route.path === "/detail") {
      this.showFlag1 = false;
      this.canClick = false;
    }
    this.$store.dispatch("getGoods");
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    goodsLists() {
      return this.$store.state.goodsLists;
    }
  },
  methods: {
    clickShow() {
      if (this.canClick) {
        this.showFlag1 = !this.showFlag1;
        this.showFlag2 = false;
      }
    },
    showNav() {
      this.showFlag2 = true;
    },
    hideNav() {
      this.showFlag2 = false;
    },
    goToDetail(goods) {
      if (this.$route.query.id !== goods._id) {
        this.$router.push({
          name: "detail",
          query: { id: goods._id }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/public.scss";

// 商品菜单
#GoodsMenu {
  z-index: 99;
  float: left;
  position: relative;
  li.nlif,
  li.nli {
    width: 180px;
    height: 41.67px;
    p {
      width: 100%;
      height: 100%;
    }
  }
  li.nlif {
    color: #fff;
    text-align: center;
    background-color: $miku;
    h2 {
      font-size: 15px;
      line-height: 41.67px;
      cursor: pointer;
    }
  }
  li.nli {
    background-color: rgba(255, 255, 255, 0.9);
    p {
      font-size: 14px;
      padding: 9px 0 9px 15px;
      transition: padding-left 0.39s;
      cursor: pointer;
      span {
        display: inline-block;
        width: 24px;
        height: 24px;
        vertical-align: middle;
        background-image: url("../assets/img/nav_icon.png");
        background-repeat: no-repeat;
        margin-right: 11px;
      }
      i {
        display: none;
        color: $miku;
        margin-left: 33px;
      }
    }
    @for $i from 2 through 12 {
      &:nth-of-type(#{$i}) {
        p {
          span {
            background-position-x: -24px * ($i + -2);
          }
        }
      }
    }
    // 二级菜单
    ul {
      display: none;
      width: 257px;
      height: 500px;
      background-color: rgba(255, 255, 255, 0.9);
      padding: 17px 20px;
      border: 1px solid #ccc;
      z-index: -1;
      position: absolute;
      top: 0;
      left: 180px;
      figure {
        figcaption {
          font-size: 18px;
          color: $miku;
          margin-bottom: 14px;
        }
        a {
          font-size: 12px;
          line-height: 25px;
          margin-right: 30px;
          cursor: pointer;
          &:hover {
            color: $miku;
          }
        }
      }
    }
    &:hover {
      width: 181px;
      background: #fff;
      border: 1px solid #ccc {
        right: 0;
      }
      p {
        color: $miku;
        padding: 8px 0 8px 23px;
        i {
          display: inline-block;
        }
      }
      ul {
        display: block;
      }
    }
  }
}
</style>