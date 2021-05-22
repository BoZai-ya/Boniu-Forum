import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: null,
    authorInfo: null,
    showLogin: false,
    showNewArticle: false,
    accessToken: localStorage.token || "",
    showMsg: false,
  },
  mutations: {
    getUserInfo: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    getAuthorInfo: (state, authorInfo) => {
      state.authorInfo = authorInfo;
    },
    showLogin(state, flag) {
      state.showLogin = flag;
    },
    showNewArticle(state, flag) {
      state.showNewArticle = flag;
    },
    showMsg(state, flag) {
			state.showMsg = flag;
		},
  },
  actions: {},
  modules: {},
});
