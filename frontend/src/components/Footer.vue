<template>
  <!-- 页尾 -->
  <footer>
    <main>
      <div v-for="item of footerList">
        <h4>{{item.h4}}</h4>
        <ul>
          <li v-for="obj of item.li">
            <a href>{{obj}}</a>
          </li>
        </ul>
      </div>
    </main>
    <p>所有图片均受著作权保护，未经许可任何单位与个人不得使用、复制、转载、摘编，违者必究法律责任。</p>
    <p>Copyright © 2019-2020 版权所有</p>
    <p>违法和不良信息举报电话 400-000-7788</p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      footerList: [
        {
          h4: "新手指南",
          li: ["账户注册", "购物流程", "订购方式", "悠币说明", "会员等级"]
        },
        {
          h4: "付款方式",
          li: ["支付方式/发票说明", "礼品卡章程", "优惠代码", "卡券购买章程"]
        },
        {
          h4: "配送方式",
          li: ["配送运费", "时间及范围"]
        },
        {
          h4: "售后服务",
          li: ["退换货政策", "退换货流程", "常见问题", "极速退款", "投诉与建议"]
        },
        {
          h4: "关于我们",
          li: [
            "公司介绍",
            "联系我们",
            "业务合作",
            "诚信举报",
            "用户协议",
            "隐私协议",
            "友情链接"
          ]
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/public.scss";

// 页尾
footer {
  padding-top: 50px;
  main {
    display: flex;
    justify-content: space-around;
    div {
      width: 177px;
      height: 200px;
      h4 {
        height: 23px;
        font-size: 14px;
        font-weight: 500;
        text-indent: 36px;
        line-height: 23px;
        background-image: url("../assets/img/footer_icon.png");
        background-repeat: no-repeat;
      }
      ul {
        height: 110px;
        border-left: 1px dashed #aaa;
        margin: 16px 0 0 13px;
        li {
          a {
            font-size: 12px;
            text-indent: 20px;
            line-height: 22px;
            &:hover {
              color: $miku;
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
  p {
    font-size: 12px;
    text-align: center;
    line-height: 22px;
  }
}
</style>