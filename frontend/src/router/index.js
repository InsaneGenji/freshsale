import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// 引入饿了么组件
import { MessageBox } from 'element-ui';
// 弹框
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;

// 引入vue-cookies
import VueCookies from 'vue-cookies';
Vue.use(VueCookies);

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/Index.vue')
  },
  {
    path: '/lg',
    name: 'lg',
    component: () => import('@/views/LG.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('@/views/Detail.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/Cart.vue'),
    beforeEnter: (to, from, next) => {
      if (!VueCookies.isKey("username")) {
        MessageBox.confirm("", "您未登陆，点击确定跳转到登录界面", {
          confirmButtonText: "确定",
          cancelButtonText: '取消',
          callback: action => {
            if (action === "confirm") {
              router.push("/lg");
            } else {
              if (!from.name) {
                router.push("/");
              }
            }
          }
        });
      } else {
        next();
      }
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
