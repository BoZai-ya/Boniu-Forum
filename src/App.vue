<template>
  <div id="app">
    <Header />
    <div class="content">
      <div class="main"><router-view /></div>
      <div class="aside" v-if="!$route.path.includes('/api')">
        <UserInfo />
        <Panel v-if="!$route.path.includes('/login')">
        <template #header>
      <span>发布话题</span>
    </template>
          <template #content>
          <router-link to="/topics">  <el-button type="success" size="small">发布话题</el-button></router-link>
          </template>
        </Panel>
        <QRcode />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>

import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import QRcode from "./components/QRcode.vue";
import UserInfo from "./components/UserInfo.vue";
import Panel from "./layout/Panel.vue";
export default {
  components: { Header, UserInfo, Footer,  QRcode, Panel },
  name: "app",
};
</script>

<style lang='less' scoped>
//1．首页  列表展示  分页  导航  登录 退出
//2．文章详情页 文章展示 评论展示 收藏 添加评论 点赞 回复评论的  评论作者的信息展示
//3．用户信息页   两个列表的展示  列表的查看更多*
//4．发布文章页
//5．未读信息页  展示未读和已读列表
#app {
  background-image: url('./assets/bg2.jpg');
  background-repeat: repeat;
  background-size: 110%;
}
.content {
  width: 80%;
  margin: 0 auto 20px;
  display: flex;
  justify-content: space-between;
  .main {
    width: 76%;
  }
  .aside {
    width: 23%;
    display: flex;
    flex-direction: column;
  }
}
</style>


