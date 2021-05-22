<template>
  <div v-if="user">
    <Panel>
      <template #header>
        <router-link to="/">主页</router-link>
      </template>
      <template #content>
        <div class="authorInfo">
          <div class="author_info">
            <el-avatar
              shape="square"
              :size="30"
              :src="user.avatar_url"
            ></el-avatar>
            <span class="authorName">{{ user.loginname }}</span>
          </div>
          <span>{{ user.score }}积分</span>
          <span class="create_at"
            >发布于{{ user.create_at | formatDateFromNow }}</span
          >
        </div>
      </template>
    </Panel>
    <Panel>
      <template #header>
        <span>最近创建的话题</span>
      </template>
      <template #content>
        <div
          class="post-item"
          v-for="item in user.recent_topics.slice(0, 5)"
          :key="item.id"
        >
          <router-link :to="`/user/${item.author.loginname}`">
            <el-avatar
              shape="square"
              :size="30"
              :src="item.author.avatar_url"
            ></el-avatar>
          </router-link>
          <router-link :to="`/topic/${item.id}`" class="title">{{
            item.title
          }}</router-link>
          <span class="replyTime">{{
            item.last_reply_at | formatDateFromNow
          }}</span>
        </div>
      </template>
    </Panel>
    <Panel>
      <template #header>
        <span>最近参与的话题</span>
      </template>
      <template #content>
        <div
          class="post-item"
          v-for="item in user.recent_replies.slice(0, 5)"
          :key="item.id"
        >
          <router-link :to="`/user/${item.author.loginname}`">
            <el-avatar
              shape="square"
              :size="30"
              :src="item.author.avatar_url"
            ></el-avatar>
          </router-link>
          <router-link :to="`/topic/${item.id}`" class="title">{{
            item.title
          }}</router-link>
          <span class="replyTime">{{
            item.last_reply_at | formatDateFromNow
          }}</span>
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
      user: null,
    };
  },
  watch: {
    "$route.params.loginname": {
      async handler(newValue) {
        const { loginname } = this.$route.params;
        const res = await this.$axios.get(`/user/${loginname}`);
        this.user = res.data;
      },
      immediate: true,
    },
  },
  // async created() {
  //   const { loginname } = this.$route.params;
  //   const res = await this.$axios.get(`/user/${loginname}`);
  //   this.user = res.data;
  //   console.log(res.data);
  // },
};
</script>

<style lang="less" scoped>
.authorInfo {
  display: flex;
  flex-direction: column;
  .author_info {
    display: flex;
    margin-bottom: 10px;
    .authorName {
      color: #778087;
      font-size: 14px;
    }
  }
  .create_at {
    margin-top: 10px;
    color: #ababab;
    font-size: 14px;
  }
}
.post-item {
  border-bottom: 1px solid #fcf3f3;
  padding: 5px 0px;
  display: flex;
  align-items: center;
  .title {
    display: inline-block;
    padding: 0 5px;
    width: 65%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #333;
  }
  .title:hover {
    text-decoration: underline;
  }
  .replyTime {
    display: inline-block;
    width: 12%;
    text-align: right;
    font-size: 12px;
    color: rgb(102, 100, 100);
  }
}
.post-item:hover {
  background-color: #f3f3f3;
}
</style>