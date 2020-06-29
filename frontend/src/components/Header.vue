<template>
  <!-- 页首 -->
  <header class="one">
    <main>
      <!-- 左 -->
      <ul>
        <li>欢迎来到生鲜购！</li>
        <li>
          <a href>配送至：杭州市</a>
        </li>
        <li>
          <a href>
            <i class="el-icon-bell"></i>
            <span>网警提醒</span>
          </a>
        </li>
      </ul>
      <!-- 右 -->
      <nav class="first">
        <!-- 登录/注册 -->
        <template v-if="!isLogin">
          <li class="first" v-for="item of navList" v-if="item.id===1">
            <router-link :to="item.path">
              <i :class="item.iconName"></i>
              <span>{{item.name}}</span>
            </router-link>
          </li>
        </template>
        <!-- 我的生鲜 -->
        <template v-else>
          <li class="first welcome">
            <p>
              欢迎!
              <span>{{username}}</span>
            </p>
          </li>
          <li class="first mine" v-for="item of navList" v-if="item.id===2">
            <router-link :to="item.path">
              <i :class="item.iconName"></i>
              <span>{{item.name}}</span>
              <i class="el-icon-caret-bottom"></i>
            </router-link>
            <nav class="second">
              <span></span>
              <li class="second">
                <a href @click="logout">退出登录</a>
              </li>
            </nav>
          </li>
        </template>
        <li class="first mobile" v-for="item of navList" v-if="item.id===3">
          <router-link :to="item.path">
            <i :class="item.iconName"></i>
            <span>{{item.name}}</span>
            <i class="el-icon-caret-bottom"></i>
          </router-link>
          <!-- 二级菜单 -->
          <nav class="second">
            <span></span>
            <li class="second" v-for="obj of item.second">
              <figure>
                <img :src="obj.src" alt />
                <figcaption>{{obj.text}}</figcaption>
              </figure>
            </li>
          </nav>
        </li>
        <li class="first" v-for="item of navList" v-if="item.id>3">
          <router-link :to="item.path">
            <i :class="item.iconName"></i>
            <span>{{item.name}}</span>
          </router-link>
        </li>
      </nav>
    </main>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      username: "",
      isLogin: false,
      navList: [
        {
          id: 1,
          name: "登录 / 注册",
          path: "/lg"
        },
        {
          id: 2,
          iconName: "el-icon-s-custom",
          name: "我的生鲜",
          path: "",
          second: [
            {
              id: "2-1",
              name: "我的订单"
            },
            {
              id: "2-2",
              name: "我的优惠券"
            },
            {
              id: "2-3",
              name: "我的收藏"
            },
            {
              id: "2-4",
              name: "我的订单"
            },
            {
              id: "2-5",
              name: "我的悠币"
            },
            {
              id: "2-6",
              name: "我的退换货"
            },
            {
              id: "2-7",
              name: "立即充值"
            }
          ]
        },
        {
          id: 3,
          iconName: "el-icon-mobile-phone",
          name: "手机生鲜",
          path: "",
          second: [
            {
              src: "https://ftp.bmp.ovh/imgs/2019/12/7c8deeedf2156317.png",
              text: "扫一扫向我付款"
            },
            {
              src: "https://ftp.bmp.ovh/imgs/2019/12/5d6af903253c4cc9.png",
              text: "扫一扫向我付款"
            }
          ]
        },
        {
          id: 4,
          iconName: "el-icon-bank-card",
          name: "礼品卡绑定",
          path: ""
        },
        {
          id: 5,
          iconName: "el-icon-present",
          name: "礼品兑换券入口",
          path: ""
        },
        {
          id: 6,
          iconName: "el-icon-s-management",
          name: "营业资质",
          path: ""
        },
        {
          id: 7,
          iconName: "el-icon-s-comment",
          name: "人才招聘",
          path: ""
        }
      ]
    };
  },
  beforeMount() {
    if (this.$cookies.isKey("username")) {
      this.username = this.$cookies.get("username");
      this.isLogin = true;
    }
  },
  methods: {
    logout() {
      this.$cookies.remove("username");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/public.scss";

// 页首
header.one {
  height: 30px;
  font-size: 12px;
  line-height: 30px;
  background-color: #f7f9f8;
  main {
    a {
      i:nth-of-type(1) {
        font-size: 18px;
        vertical-align: sub;
      }
      &:hover {
        color: $miku;
      }
    }
    // 左
    ul {
      float: left;
      li {
        margin-right: 10px;
        float: left;
        &:nth-of-type(2) {
          a {
            color: $miku;
          }
        }
        &:nth-of-type(3) {
          a {
            i {
              color: red;
            }
          }
        }
      }
    }
    // 右
    nav.first {
      height: 100%;
      float: right;
      li.first {
        border: 1px solid transparent {
          bottom: 0;
        }
        z-index: 1;
        position: relative;
        float: left;
        a {
          padding: 0 10px;
          i {
            color: $miku;
            margin-right: 4px;
            &:nth-of-type(2) {
              margin-left: 4px;
            }
          }
        }
        // 二级菜单
        nav.second {
          display: none;
          background-color: #fff;
          border: 1px solid #ccc {
            top: 0;
          }
          position: absolute;
          top: 30px;
          left: -1px;
          span {
            display: inline-block;
            height: 1px;
            background-color: #ccc;
            position: absolute;
            top: 0;
            right: 0;
          }
        }
      }
      li.welcome {
        p {
          font-size: 14px;
          line-height: 30px;
          span {
            color: $miku;
          }
        }
      }
      li.mine,
      li.mobile {
        a {
          padding-right: 23px;
          position: relative;
          .el-icon-caret-bottom {
            position: absolute;
            top: 8px;
            right: 0;
            transition: 0.39s transform;
          }
        }
        &:hover {
          background-color: #fff;
          border: 1px solid #ccc {
            bottom: 0;
          }
          a {
            .el-icon-caret-bottom {
              transform: rotate(180deg);
            }
          }
          nav.second {
            display: block;
          }
        }
      }
      li.mine {
        nav.second {
          width: 123px;
          span {
            width: 21px;
          }
        }
      }
      li.mobile {
        nav.second {
          width: 139px;
          span {
            width: 37px;
          }
        }
        li {
          figure {
            text-align: center;
            img {
              width: 90%;
            }
          }
          &:first-of-type {
            margin-top: 8px;
          }
        }
      }
    }
  }
}
</style>