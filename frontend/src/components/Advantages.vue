<template>
  <!-- 优点 -->
  <div id="Advantage">
    <main>
      <ul>
        <li v-for="item of advantageList">
          <section>
            <h3>{{item.h3}}</h3>
            <p>{{item.p}}</p>
          </section>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
export default {
  name: "Advantage",
  data() {
    return {
      advantageList: [
        {
          h3: "全球精选",
          p: "一站式生鲜购物方案"
        },
        {
          h3: "多仓直发",
          p: "次日达配送服务"
        },
        {
          h3: "品质严选",
          p: "精选正宗品质好食材"
        },
        {
          h3: "天天低价",
          p: "会员专属优惠购不停"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/public.scss";

// 页尾
#Advantage {
  height: 102px;
  background-color: #ccc;
  padding: 30px 0;
  main {
    height: 100%;
    ul {
      display: flex;
      height: 100%;
      justify-content: space-around;
      li {
        width: 200px;
        height: 100%;
        background-image: url("../assets/img/footer_service_icon.png");
        background-repeat: no-repeat;
        @for $i from 1 through 4 {
          &:nth-of-type(#{$i}) {
            background-position-y: -42px * ($i + -1);
          }
        }
        section {
          height: 100%;
          border-left: 1px solid #999;
          margin-left: 54px;
          overflow: hidden;
          h3,
          p {
            text-indent: 12px;
          }
          h3 {
            font-size: 18px;
            font-weight: 500;
            color: $miku;
            margin-top: 4px;
          }
          p {
            font-size: 12px;
            margin-top: 6px;
          }
        }
      }
    }
  }
}
</style>