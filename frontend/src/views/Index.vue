<template>
  <div>
    <!-- 页首 -->
    <Header />

    <!-- 搜索部分 -->
    <Search />

    <!-- 轮播图 -->
    <div id="banner">
      <main>
        <!-- 商品菜单 -->
        <GoodsMenu />
      </main>
      <!-- 轮播图 -->
      <el-carousel :interval="3000" arrow="never" type="card" height="500px">
        <el-carousel-item v-for="item of bannerList">
          <img :src="item" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 商城主体 -->
    <main id="index">
      <template v-for="item of goodsLists">
        <figure v-if="item.type!='搜索栏'">
          <!-- 分类楼层&标题 -->
          <figcaption>
            <h2>
              <span>
                <p>F{{item.id}}</p>
              </span>
              {{item.type}}
            </h2>
          </figcaption>
          <ul>
            <li v-for="item of 10">
              <router-link :to="'/detail?id='+item"></router-link>
            </li>
          </ul>
        </figure>
      </template>
    </main>

    <!-- 优点 -->
    <Advantages />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Search from "@/components/Search";
import GoodsMenu from "@/components/GoodsMenu";
import Advantages from "@/components/Advantages";

export default {
  components: {
    Header,
    Search,
    GoodsMenu,
    Advantages
  },
  name: "index",
  data() {
    return {
      bannerList: [
        "http://img07.yiguoimg.com/d/others/191129/9288739604637565.jpg",
        "http://img05.yiguoimg.com/d/others/191122/9288739588384630.jpg",
        "http://img05.yiguoimg.com/d/others/190830/9288738997806878.jpg"
      ]
    };
  },
  computed: {
    goodsLists() {
      return this.$store.state.goodsLists;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/public.scss";

// 轮播图
#banner {
  position: relative;
  main {
    position: absolute;
    left: 0;
    right: 0;
  }
  .el-carousel {
    width: 1903px;
    margin-left: 50%;
    transform: translateX(-50%);
    overflow: hidden;
    .el-carousel__item {
      width: 1200px;
      left: -124px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

// 商城主体
#index {
  margin-top: 18px;
  figure {
    margin-bottom: 16px;
    @for $i from 1 through 11 {
      &:nth-of-type(#{$i}) {
        figcaption {
          h2 {
            span {
              background-position-x: -46px * ($i + -1);
            }
          }
        }
      }
    }
    // 分类楼层&标题
    figcaption {
      margin-bottom: 5px;
      h2 {
        height: 32px;
        font-size: 18px;
        line-height: 48px;
        color: $miku;
        span {
          display: inline-block;
          width: 46px;
          height: 32px;
          vertical-align: top;
          color: #fff;
          background-image: url("../assets/img/floor_icon.png");
          background-repeat: no-repeat;
          p {
            text-indent: 8px;
            line-height: 40px;
          }
        }
      }
    }
    ul {
      height: 678px;
      background-color: #fff;
      border: 1px solid #ccc {
        right: 0;
        bottom: 0;
      }
      li {
        width: 20%;
        height: 50%;
        border: 1px solid #ccc {
          top: 0;
          left: 0;
        }
        float: left;
        a {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
