import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

// 引入vue-cookies
import VueCookies from 'vue-cookies';
Vue.use(VueCookies);

export default new Vuex.Store({
  state: {
    loading: false,
    cartLoading: false,
    goods: [],
    goodsLists: [
      {
        id: "1",
        type: "进口水果",
        list: []
      },
      {
        id: "2",
        type: "国产水果",
        list: []
      },
      {
        id: "3",
        type: "精选肉类",
        list: []
      },
      {
        id: "4",
        type: "禽类蛋品",
        list: []
      },
      {
        id: "5",
        type: "海鲜水产",
        list: []
      },
      {
        id: "6",
        type: "即烹美食",
        list: []
      },
      {
        id: "7",
        type: "乳品糕点",
        list: []
      },
      {
        id: "8",
        type: "新鲜蔬菜",
        list: []
      },
      {
        id: "9",
        type: "方便速食",
        list: []
      },
      {
        id: "10",
        type: "粮油杂货",
        list: []
      },
      {
        id: "11",
        type: "食品饮料",
        list: []
      },
      {

        id: "12",
        type: "搜索栏",
        list: [
          {
            id: "1",
            name: "虾仁"
          },
          {
            id: "2",
            name: "三文鱼"
          },
          {
            id: "3",
            name: "冰鲜牛肉"
          },
          {
            id: "4",
            name: "刺身"
          },
          {
            id: "5",
            name: "新西兰鹿肉"
          },
          {
            id: "6",
            name: "鳕鱼"
          },
          {
            id: "7",
            name: "牛腱"
          },
          {
            id: "8",
            name: "奇异果"
          }
        ]
      }
    ],
    cart: []
  },
  mutations: {
    loading(state, loading) {
      state.loading = loading;
    },
    cartLoading(state, cartLoading) {
      state.cartLoading = cartLoading;
    },
    goods(state, goods) {
      state.goods = goods;
      let importFruits = [];
      let domesticFruits = [];
      let selectedMeats = [];
      let poultryProtein = [];
      let seafood = [];
      for (let item of goods) {
        if (item.type === "进口水果") {
          importFruits.push(item);
        } else if (item.type === "国产水果") {
          domesticFruits.push(item);
        } else if (item.type === "精选肉类") {
          selectedMeats.push(item);
        } else if (item.type === "禽类蛋白") {
          poultryProtein.push(item);
        } else if (item.type === "海鲜水产") {
          seafood.push(item);
        }
      }
      state.goodsLists[0].list = importFruits;
      state.goodsLists[1].list = domesticFruits;
      state.goodsLists[2].list = selectedMeats;
      state.goodsLists[3].list = poultryProtein;
      state.goodsLists[4].list = seafood;
    },
    cart(state, cart) {
      state.cart = cart;
    }
  },
  actions: {
    getGoods({ commit, state }) {
      // axios拦截器
      const reqIC = axios.interceptors.request.use(config => {
        //在请求发出之前进行一些操作
        commit("loading", true);
        return config;
      });
      //定义一个响应拦截器
      const resIC = axios.interceptors.response.use(config => {
        //在这里对返回的数据进行处理
        commit("loading", false);
        return config;
      });
      if (state.goods.length === 0) {
        axios.get("/freshsale/goods").then(result => commit("goods", result.data))
      };
      axios.interceptors.request.eject(reqIC);
      axios.interceptors.response.eject(resIC);
    },
    getCart({ commit, state }) {
      const reqIC = axios.interceptors.request.use(config => {
        commit("cartLoading", true);
        return config;
      });
      const resIC = axios.interceptors.response.use(config => {
        commit("cartLoading", false);
        return config;
      });
      if (VueCookies.isKey("username")) {
        const username = VueCookies.get("username");
        axios
          .post("/freshsale/cart", {
            username: username
          }).then(result => {
            commit("cart", result.data);
          })
      }
      axios.interceptors.request.eject(reqIC);
      axios.interceptors.response.eject(resIC);
    }
  },
  modules: {
  }
});
