<template>
  <div>
    <!-- 页首 -->
    <Header />

    <!-- 搜索部分 -->
    <Search />

    <!-- 商品详情 -->
    <div id="detail">
      <main ref="main">
        <!-- 商品菜单 -->
        <GoodsMenu />
        <!-- 商品主体 -->
        <div class="goods" v-loading="loading">
          <!-- 预览图 -->
          <div class="preview">
            <div class="spic" ref="spic" @mouseover="show" @mouseout="hide" @mousemove="move">
              <img :src="goods?goods.img[0]:''" alt ref="simg" />
              <div class="sf" ref="sf"></div>
            </div>
            <div class="bf" ref="bf">
              <img :src="goods?goods.img[0]:''" alt class="bpic" ref="bpic" />
            </div>
            <div class="spiclist">
              <ul>
                <li
                  :class="spiclistIndex===index?'active':''"
                  v-for="(item,index) of goods?goods.img:''"
                  @mouseover="switchPic(item,index)"
                >
                  <img :src="item" alt />
                </li>
              </ul>
            </div>
          </div>
          <!-- 详情 -->
          <div class="information">
            <h2 class="title">{{goods?goods.title:''}}</h2>
            <h4 class="describe">{{goods?goods.description:''}}</h4>
            <div class="pay">
              <div class="left">
                <p class="price">
                  价格：
                  <span>
                    <span>￥</span>
                    {{goods?goods.price.toFixed(2):''}}
                  </span>
                </p>
                <p class="discount">更多商品优惠，尽在生鲜购</p>
                <p class="cellphone">
                  <i class="el-icon-mobile-phone"></i>
                  手机下单购买
                  <span>立即扫码</span>
                </p>
              </div>
              <div class="right">
                <img src="https://ftp.bmp.ovh/imgs/2019/12/7c8deeedf2156317.png" alt />
              </div>
            </div>
            <div class="select">
              <div class="left">
                <div class="size">
                  <span>规格：</span>
                  <section>
                    <p>￥{{goods?goods.price.toFixed(2):''}}</p>
                    <p>{{goods?goods.size:''}}</p>
                  </section>
                </div>
                <div class="warning">
                  <i class="el-icon-warning"></i>
                  <span>不支持7天无理由退货</span>
                </div>
                <div class="number">
                  <span>数量：</span>
                  <el-input-number
                    v-model="num"
                    controls-position="right"
                    :min="1"
                    @change="changeNum"
                  ></el-input-number>
                </div>
                <el-button
                  type="primary"
                  icon="el-icon-shopping-cart-1"
                  class="addToCart"
                  @click="addToCart"
                  :disabled="!canAdd"
                >
                  加入购物车
                  <span v-loading="adding"></span>
                </el-button>
              </div>
              <div class="right">
                <p>
                  原产地：
                  <span>{{goods?goods.place:''}}</span>
                </p>
                <p>
                  商品编号：
                  <span>39</span>
                </p>
                <p>
                  品牌：
                  <span>{{goods?goods.brand:''}}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- 优点 -->
    <Advantages />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Search from "@/components/Search";
import GoodsMenu from "@/components/GoodsMenu";
import Advantages from "@/components/Advantages";
import axios from "axios";

export default {
  components: {
    Header,
    Search,
    GoodsMenu,
    Advantages
  },
  name: "detail",
  data() {
    return {
      spiclistIndex: 0,
      adding: false,
      canAdd: true,
      num: 1
    };
  },
  watch: {
    $route() {
      this.num = 1;
    }
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    goods() {
      for (let item of this.$store.state.goods) {
        if (item._id === this.$route.query.id) {
          return item;
        }
      }
    }
  },
  methods: {
    magnifier(ev) {
      var ev = ev || window.event;
      const sf = this.$refs.sf.style;
      const bpic = this.$refs.bpic.style;
      const l = this.$refs.main.offsetLeft-document.body.scrollLeft;
      const t = this.$refs.main.offsetTop-document.body.scrollTop + 41.6;
      const sfOW = this.$refs.sf.offsetWidth;
      const sfOH = this.$refs.sf.offsetHeight;
      const tw = this.$refs.spic.offsetWidth - sfOW;
      const th = this.$refs.spic.offsetHeight - sfOH;
      const ml = ev.pageX - l - sfOW / 2;
      const mt = ev.pageY - t - sfOH / 2;
      const multiple = this.$refs.bf.offsetWidth / sfOW;
      if (ml < 0) {
        sf.left = 0;
        bpic.left = 0;
      } else if (ml > tw) {
        sf.left = tw + "px";
        bpic.left = -multiple * tw + "px";
      } else {
        sf.left = ml + "px";
        bpic.left = -multiple * ml + "px";
      }
      if (mt < 0) {
        sf.top = 0;
        bpic.top = 0;
      } else if (mt > th) {
        sf.top = th + "px";
        bpic.top = -multiple * th + "px";
      } else {
        sf.top = mt + "px";
        bpic.top = -multiple * mt + "px";
      }
    },
    show(ev) {
      this.$refs.sf.style.visibility = "visible";
      this.$refs.bf.style.display = "block";
      this.magnifier(ev);
    },
    hide() {
      this.$refs.sf.style.visibility = "hidden";
      this.$refs.bf.style.display = "none";
    },
    move(ev) {
      this.magnifier(ev);
    },
    switchPic(item, index) {
      this.$refs.simg.src = item;
      this.$refs.bpic.src = item;
      this.spiclistIndex = index;
    },
    changeNum() {
      this.num = this.num.toFixed(0);
    },
    addToCart() {
      if (!this.$cookies.isKey("username")) {
        this.$alert("", "您未登陆，将跳转到登录界面", {
          confirmButtonText: "确定",
          callback: action => {
            this.$router.push("/lg");
          }
        });
      } else {
        const goods = this.goods;
        goods.num = this.num;
        const reqIC = axios.interceptors.request.use(config => {
          this.canAdd = false;
          this.adding = true;
          return config;
        });
        const resIC = axios.interceptors.response.use(config => {
          this.canAdd = true;
          this.adding = false;
          return config;
        });
        axios
          .post("/freshsale/addToCart", {
            username: this.$cookies.get("username"),
            cart: goods
          })
          .then(result => {
            this.$store.dispatch("getCart");
            this.$notify({
              title: "购物车添加成功",
              type: "success",
              duration: 2333,
              offset: 100
            });
          });
        axios.interceptors.request.eject(reqIC);
        axios.interceptors.response.eject(resIC);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/public.scss";

#detail {
  height: 700px;
  main {
    position: relative;
    // 商品主体
    .goods {
      width: 100%;
      height: 600px;
      border-top: 1px solid $miku;
      overflow: hidden;
      position: absolute;
      top: 41.67px;
      .preview,
      .information {
        height: 500px;
      }
      // 预览图
      .preview {
        width: 500px;
        height: 600px;
        float: left;
        position: relative;
        .spic {
          height: 500px;
          position: relative;
          img {
            width: 100%;
          }
          .sf {
            visibility: hidden;
            width: 200px;
            height: 200px;
            cursor: move;
            position: absolute;
            top: 0;
            left: 0;
            background-color: lightcyan;
            opacity: 0.78;
          }
        }
        .bf {
          display: none;
          width: 400px;
          height: 400px;
          border: 1px solid #ccc;
          z-index: 99;
          overflow: hidden;
          position: absolute;
          top: 0;
          left: 511px;
          .bpic {
            width: 1000px;
            position: absolute;
            top: 0;
            left: 0;
          }
        }
        .spiclist {
          height: 88px;
          position: absolute;
          bottom: 0;
          ul {
            li {
              border: 1px solid #ccc;
              margin-right: 16px;
              cursor: pointer;
              float: left;
              img {
                width: 85px;
              }
              &.active {
                border: 1px solid $miku;
              }
            }
          }
        }
      }
      // 详情
      .information {
        width: 700px;
        font-size: 12px;
        padding: 8px 0 0 12px;
        float: left;
        .title,
        .describe,
        .pay {
          margin-left: 8px;
        }
        .title {
          font-size: 26px;
          font-weight: 500;
          color: #666;
        }
        .describe {
          font-size: 16px;
          font-weight: 500;
          color: #888;
          margin-top: 10px;
        }
        .pay {
          background-color: #fff;
          padding: 10px 20px;
          overflow: hidden;
          margin-top: 39px;
          .left {
            width: 549px;
            float: left;
            .price {
              border-bottom: 1px solid #ccc;
              span {
                font-size: 26px;
                line-height: 38px;
                color: #f00;
                margin-left: 16px;
                span {
                  font-size: 18px;
                }
              }
            }
            .discount,
            .cellphone {
              line-height: 38px;
            }
            .discount {
              color: #999;
              float: left;
            }
            .cellphone {
              float: right;
              i,
              span {
                color: $miku;
              }
              i {
                font-size: 14px;
              }
              span {
                margin-left: 8px;
              }
            }
          }
          .right {
            width: 87px;
            height: 80px;
            background: url("../assets/img/bg-code.png") no-repeat center center;
            float: right;
            position: relative;
            img {
              width: 72px;
              background-color: #fff;
              border: 5px solid #fff;
              position: absolute;
              top: 0;
              bottom: 0;
              left: 11px;
              margin: auto 0;
            }
          }
        }
        .select {
          margin-top: 33px;
          .left,
          .right {
            float: left;
          }
          .left {
            width: 539px;
            border-right: 1px solid #777;
            .size {
              position: relative;
              top: 13px;
              section {
                display: inline-block;
                border: 1px solid $miku;
                background-color: #fff;
                position: absolute;
                top: -13px;
                left: 45px;
                p {
                  width: 66px;
                  height: 26px;
                  text-align: center;
                  line-height: 26px;
                  &:first-of-type {
                    border-bottom: 1px solid $miku;
                  }
                }
              }
            }
            .warning {
              margin: 56px 0 16px;
              i {
                font-size: 18px;
                color: #fb0;
                vertical-align: sub;
              }
              span {
                color: #999;
              }
            }
            .number {
              .el-input-number {
                width: 100px;
                margin-left: 8px;
              }
            }
            .addToCart {
              width: 200px;
              font-size: 18px;
              background-color: $miku;
              margin-top: 23px;
              position: relative;
              &:hover {
                opacity: 0.78;
              }
              &:active {
                opacity: 1;
              }
              span {
                span {
                  display: inline-block;
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  top: 0;
                  left: 0;
                }
              }
            }
          }
          .right {
            width: 140px;
            color: #777;
            padding-left: 33px;
            float: left;
            p {
              line-height: 28px;
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
// “数量”计数器
.number {
  .el-input__inner {
    border-radius: 0;
  }
}
// “加入购物车”按钮
.addToCart {
  i {
    font-size: 30px;
    vertical-align: middle;
  }
}
</style>
