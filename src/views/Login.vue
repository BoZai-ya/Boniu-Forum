<template>
  <div class="login">
    <Panel>
      <template #header>
        <span class=""><span>主页</span>/<span>登录</span></span>
      </template>
      <template #content>
        <div>
          <span>用户名：</span
          ><el-input
            v-model.trim="userName"
            placeholder="请输入用户名(随便填)"
          ></el-input>
        </div>
        <div>
          <span>密码：</span
          ><el-input
            placeholder="请输入密码(Token)"
            v-model.trim="token"
            show-password
          ></el-input>
        </div>
        <el-button type="primary" size="small" @click="login">登录</el-button>
        <div class="tips">
          <span>Tips</span>
          <ul>
            <li>登录之后会有更好的体验</li>
            <li>输入CNode账号的Access Token 可在个人中心获取</li>
            <li>554fe09a-1ec6-492c-8fa9-ad376413dc43</li>
          </ul>
        </div>
      </template>
    </Panel>
  </div>
</template>

<script>
import Panel from "../layout/Panel.vue";
export default {
  components: { Panel },
  data() {
    return {
      userName: "",
      token: "",
    };
  },
  methods: {
    //554fe09a-1ec6-492c-8fa9-ad376413dc43
    //ecf878d1-6052-476a-8262-824760c7872b
    login() {
      this.$axios
        .post("/accesstoken", { accesstoken: this.token })
        .then((res) => {
          this.$router.push("/");
          const userInfo = res;
          delete userInfo.success;
          this.$store.commit("getUserInfo", userInfo);
          localStorage.setItem("token", this.token);
          this.userName = "";
          this.token = "";
        })
        .catch((err) => {
          this.$message.error("用户名或者密码有误,请重新输入");
        });
    },
  },
  updated() {
    localStorage.setItem("token", this.token);
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  margin: 0 auto;
  padding-bottom: 300px;
  .tips {
    color: #666;
    font-size: 14px;
    margin-top: 20px;
    line-height: 30px;
  }
}
</style>
