<template>
  <div>
    <!-- 页首 -->
    <Header />
    <!-- 页首二号 -->
    <HeaderTwo />
    <!-- 购物车 -->
    <div id="cart">
      <main v-loading="cartLoading">
        <!-- “我的购物车” -->
        <template v-if="goodsOrNot">
          <h2></h2>
          <!-- 主要内容 -->
          <section>
            <!-- 表头 -->
            <ul>
              <li>
                <label>
                  <el-checkbox v-model="selAll" @change="handleSelectAllChange">全选</el-checkbox>
                </label>
              </li>
              <li class="information">商品信息</li>
              <li class="size">规格</li>
              <li class="price">单价</li>
              <li class="number">数量</li>
              <li class="subTotal">小计</li>
              <li class="delect">操作</li>
            </ul>
            <!-- 商品 -->
            <nav>
              <el-checkbox-group v-model="selected" @change="handleSelectedChange">
                <li v-for="item in options" :key="item._id">
                  <el-checkbox :label="item" :key="item._id" class="select"></el-checkbox>
                  <div class="information">
                    <routerLink to="/detail" class="pic">
                      <img :src="item.img[0]" alt />
                    </routerLink>
                    <routerLink to="/detail" class="title">{{item.title}}</routerLink>
                  </div>
                  <div class="size">{{item.size}}</div>
                  <div class="price">
                    <span class="￥">￥</span>
                    {{item.price.toFixed(2)}}
                  </div>
                  <div class="number">
                    <el-input-number
                      size="mini"
                      v-model="item.num"
                      :min="1"
                      @change="changeNum(item)"
                    ></el-input-number>
                  </div>
                  <div class="subTotal">
                    <span class="￥">￥</span>
                    {{(item.price*item.num).toFixed(2)}}
                  </div>
                  <div class="delect" @click="delect(item)">删除</div>
                </li>
              </el-checkbox-group>
            </nav>
            <!-- 结算 -->
            <div class="bottom">
              <el-checkbox v-model="selAll" @change="handleSelectAllChange" class="selAll">全选</el-checkbox>
              <p class="delSel" @click="delSel">删除选中的商品</p>
              <section class="total">
                <p>
                  已选商品
                  <span class="totalNum">{{selected.length}}</span>
                  件，总计：
                </p>
                <h5 class="￥">￥</h5>
                <h3 class="totalPrice">{{totalPrice}}</h3>
              </section>
              <el-button class="buy" type="primary">结算</el-button>
            </div>
          </section>
        </template>
        <section class="none" v-else>
          <p>
            <span>购物车是空的，去买点东西吧！</span>
            <router-link to="/">继续逛逛>></router-link>
          </p>
        </section>
      </main>
    </div>
    <!-- 优点 -->
    <Advantages />
  </div>
</template>

<script>
import Header from "@/components/Header";
import HeaderTwo from "@/components/HeaderTwo";
import Advantages from "@/components/Advantages";
import axios from "axios";

export default {
  components: {
    Header,
    HeaderTwo,
    Advantages
  },
  name: "cart",
  data() {
    return {
      selAll: false,
      selected: []
    };
  },
  mounted() {
    this.$store.dispatch("getCart");
  },
  computed: {
    cartLoading() {
      return this.$store.state.cartLoading;
    },
    // 判断购物车是否有商品
    goodsOrNot() {
      if (this.options.length === 0) {
        return false;
      } else {
        return true;
      }
    },
    options() {
      return this.$store.state.cart;
    },
    // 总价
    totalPrice() {
      let totalPrice = 0;
      for (let item of this.selected) {
        totalPrice += item.price * item.num;
      }
      return totalPrice.toFixed(2);
    }
  },
  methods: {
    // 单选
    handleSelectedChange(value) {
      this.selAll = value.length === this.options.length;
    },
    // 全选
    handleSelectAllChange(value) {
      this.selected = value ? this.options : [];
    },
    changeCart() {
      axios.post("/freshsale/changeCart", {
        username: this.$cookies.get("username"),
        cart: this.options
      });
    },
    // 改变数量
    changeNum(item) {
      item.num = item.num.toFixed(0);
      this.changeCart();
    },
    // 删除
    delect(item) {
      let checked = [];
      const index = this.options.indexOf(item);
      if (this.selected.indexOf(item) !== -1) {
        this.selected.forEach(value => {
          checked.push(value);
        });
        checked.splice(this.selected.indexOf(item), 1);
      }
      this.options.splice(index, 1);
      this.selected = checked;
      this.changeCart();
    },
    // 删除选中的商品
    delSel() {
      let selectedIndex = [];
      for (let item of this.selected) {
        selectedIndex.push(this.options.indexOf(item));
      }
      selectedIndex.sort((a, b) => {
        return b - a;
      });
      for (let i = this.options.length - 1; i > -1; i--) {
        for (let item of selectedIndex) {
          if (item === i) {
            this.selected = [];
            this.options.splice(i, 1);
            break;
          }
        }
      }
      this.changeCart();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/public.scss";
$PL: 26px;

// 购物车
#cart {
  margin: 23px 0 39px;
  main {
    background-color: #fff;
    border: 1px solid #ccc {
      top: 0;
    }
    // 我的购物车
    h2 {
      height: 38px;
      border-bottom: 2px solid $miku;
      margin-bottom: 10px;
      background: url(../assets/img/bg_cart.png) no-repeat left center;
    }
    // 主要内容
    section {
      padding-bottom: 10px;
      ul,
      nav,
      .bottom {
        width: 93%;
        margin: 0 auto;
      }
      ul,
      .bottom {
        font-size: 12px;
        color: #333;
        background-color: #eee;
        padding-left: $PL;
        border: 1px solid #ddd;
      }
      nav li .delect,
      .bottom .delSel {
        cursor: pointer;
      }
      nav li .delect:hover,
      .bottom .delSel:hover {
        color: $miku;
      }
      .information {
        width: 450px;
      }
      .number {
        width: 128px;
      }
      .size,
      .price,
      .subTotal,
      .delect {
        width: 114px;
      }
      .￥ {
        vertical-align: middle;
      }
      // 表头
      ul {
        height: 50px;
        li {
          text-align: center;
          float: left;
          line-height: 50px;
        }
      }
      // 商品
      nav {
        background-color: #fff;
        margin: 23px auto;
        li {
          font-size: 14px;
          padding: 18px $PL {
            right: 0;
          }
          border: 1px solid #ddd;
          margin-bottom: 9px;
          overflow: hidden;
          &:last-of-type {
            margin-bottom: 0;
          }
          .select,
          .information,
          .pic,
          .size,
          .price,
          .number,
          .subTotal,
          .delect {
            text-align: center;
            float: left;
          }
          .information {
            text-align: unset;
            margin-left: 28px;
            .pic {
              margin: 0 13px;
              img {
                width: 82px;
                border: 1px solid #ddd;
              }
            }
            .title {
              width: 300px;
              float: right;
              &:hover {
                color: $miku;
              }
            }
          }
          .number {
            .el-input-number {
              width: 100px;
            }
          }
          .subTotal {
            font-size: 20px;
            color: #f00;
          }
          .delect {
            font-size: 12px;
          }
        }
      }
      // 结算
      .bottom {
        $lh: 69px;
        height: $lh;
        z-index: 999;
        position: sticky;
        bottom: 0;
        .selAll,
        .delSel,
        .total,
        .total p,
        .total .￥,
        .total h3 {
          float: left;
          line-height: $lh;
        }
        .delSel {
          margin-left: 78px;
        }
        .total {
          font-size: 14px;
          margin-left: 439px;
          span {
            font-size: 16px;
            font-weight: 900;
            color: $miku;
          }
          .￥,
          h3 {
            color: #f00;
          }
          .￥ {
            font-size: 22px;
          }
          h3 {
            font-size: 28px;
          }
        }
        button {
          width: 139px;
          height: 53px;
          font-size: 24px;
          font-weight: 900;
          border-radius: 0;
          position: absolute;
          top: 0;
          bottom: 0;
          right: 13px;
          margin: auto 0;
        }
      }
      // 没有
      &.none {
        height: 500px;
        background: url(../assets/img/none-bg.jpg) no-repeat center center;
        overflow: hidden;
        p {
          font-size: 14px;
          text-align: center;
          line-height: 26px;
          margin-top: 80px;
          a {
            color: $miku;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
// 多选框
.select {
  .el-checkbox__label {
    font-size: 0;
  }
}
// “数量”计数器
.number {
  .el-input__inner {
    border-radius: 0;
  }
}
</style>
