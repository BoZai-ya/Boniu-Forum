<template>
  <Panel v-if="!$route.path.includes('login')">
    <template #header>
      <span v-if="userInfo">个人信息</span>
      <span v-else>论坛吧</span>
    </template>
    <template #content>
      <div v-if="userInfo">
        <div class="info">
          <img :src="userInfo.avatar_url" alt="" />
          <span>{{ userInfo.loginname }}</span>
        </div>
        <span class="sign">“ 这家伙很懒，什么个性签名都没有留下。 ”</span>
      </div>
  
      <div v-else>
        <p>交流论坛，欢迎广大网友前来交流讨论，发表自己见解</p>
        <el-button type="primary" size="small" @click="login">登录</el-button>
      </div>
    </template>
  </Panel>
</template>

<script>
import Panel from "../layout/Panel.vue";
export default {
  components: { Panel,  },
  data() {
    return {
      topic: null,
    };
  },


  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="less" scoped>
.info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  img {
    width: 48px;
    height: 48px;
    margin-right: 10px;
  }
  span {
    color: #778087;
    font-size: 16px;
  }
}
.sign {
  font-size: 12px;
  color: #778087;
  font-style: italic;
}
p {
  font-size: 14px;
  color: #778087;
  line-height: 22px;
  margin-bottom: 10px;
}
</style>
