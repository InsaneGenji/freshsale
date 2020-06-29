import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// 阻止显示生产模式的消息
Vue.config.productionTip = false;

// 引入vue-cookies
import VueCookies from 'vue-cookies';
Vue.use(VueCookies);

import 'element-ui/lib/theme-chalk/index.css';
// // 完整引入Element
// import ElementUI from 'element-ui';
// Vue.use(ElementUI);

// 按需引入Element
import { Icon, Carousel, CarouselItem, InputNumber, Button, Checkbox, CheckboxGroup, Badge, Loading, Tabs, TabPane, Form, FormItem, Input, Message, Notification, MessageBox } from 'element-ui';
// 图标
Vue.use(Icon);
// 走马灯
Vue.use(Carousel);
Vue.use(CarouselItem);
// 计数器
Vue.use(InputNumber);
// 按钮
Vue.use(Button);
// 多选框
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
// 标记
Vue.use(Badge);
// 加载
Vue.use(Loading);
// 标签页
Vue.use(Tabs);
Vue.use(TabPane);
// 表单
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
// 消息提示
Vue.prototype.$message = Message;
// 通知
Vue.prototype.$notify = Notification;
// 弹框
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
