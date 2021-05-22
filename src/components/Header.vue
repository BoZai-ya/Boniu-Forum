<template>
  <div>
    <header>
      <div class="container">
        <router-link to="/" class="logo"
          ><img src="../assets/logo.jpg" />
          Boniu Forum
        </router-link>

        <ul class="nav">
          <li class="nav-item">
            <router-link to="/" class="home">首页</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/message" class="info">未读消息</router-link>
          </li>
          <li class="nav-item"><router-link to="/activity">活动</router-link></li>
          <li class="nav-item"><router-link to="/about">关于</router-link></li>
          <li class="nav-item" @click="signOut">
            <router-link to="/" >退出</router-link>
          </li>
        </ul>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "HeaderComp",
  methods: {
    signOut() {
      this.$store.state.userInfo =null
    }
  },
};
</script>

<style lang="less">
header {
  width: 100%;
  height: 50px;
  background-color: rgba(161, 215, 224, 0.5);
  line-height: 50px;
  margin-bottom: 20px;
  .container {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .logo {
      width: 50%;
      height: 50px;
      margin-top: 7px;
      line-height: 50px;
      display: flex;
      font-size: 16px;
      letter-spacing: -1px;
      color: rgb(182, 74, 74);

      img {
        display: inline-block;
        height: 36px;
        border-radius: 16px;
        cursor: pointer;
      }
    }

    .nav {
      width: 50%;
      list-style: none;
      display: flex;
      justify-content: space-between;
      .nav-item {
        a {
          color: rgb(34, 53, 116);
          padding: 10px 10px;
          font-size: 16px;
          letter-spacing: 2px;
          font-weight: 900;
        }
      }
      .nav-item:hover {
        a {
          color: rgb(255, 247, 247);
        }
      }
    }
  }
}
</style>
