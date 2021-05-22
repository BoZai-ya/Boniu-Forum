<template>
  <div class="home">
    <Panel>
      <template #header>
        <ul class="home-nav">
          <li><router-link to="/">全部</router-link></li>
          <li><router-link to="/home/good">精华</router-link></li>
          <li><router-link to="/home/share">分享</router-link></li>
          <li><router-link to="/home/ask">问答</router-link></li>
          <li><router-link to="/home/job">招聘</router-link></li>
          <li><router-link to="/home/dev">客户端测试</router-link></li>
          <router-view></router-view>
        </ul>
      </template>
      <template #content>
        <div class="content">
          <div v-if="posts.length" v-loading="loading">
            <!-- 加上v-if 主要是为了数据没请求过来时为 undefined 此时开始循环就会报错。 -->
            <div class="post-item" v-for="post in posts" :key="post.id">
              <router-link :to="`/user/${post.author.loginname}`">
                <el-avatar
                  shape="square"
                  :size="30"
                  :src="post.author.avatar_url"
                  :title="post.author.loginname"
                ></el-avatar
              ></router-link>
              <span class="reply_visit"
                ><span class="replyNum">{{ post.reply_count }}</span
                >/<span class="visitNum">{{ post.visit_count }}</span></span
              >
              <!-- 当处于页面 或者 文章是置顶的 或者精华的 类别展示会出现 -->
              <span
                v-if="!tab || post.top || post.good"
                :class="post.top || post.good ? 'active_tab' : 'tab'"
                >{{ post | getPostChineseTab }}</span
              >
              <router-link
                :to="{ name: 'Topic', params: { topicId: post.id } }"
                class="title"
                >{{ post.title }}</router-link
              >
              <span class="replyTime">{{
                post.last_reply_at | formatDateFromNow
              }}</span>
            </div>
          </div>
          <div class="pagination">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="
                $route.params.tab === 'dev'
                  ? 350
                  : $route.params.tab === 'good'
                  ? 710
                  : $route.params.tab === 'share'
                  ? 320
                  : $route.params.tab === 'ask'
                  ? 260
                  : $route.params.tab === 'job'
                  ? 210
                  : 675
              "
              :page-size="30"
              @current-change="currentChange"
              :current-page="currentPage"
            >
            </el-pagination>
          </div>
        </div>
      </template>
    </Panel>
  </div>
</template>

<script>
import Panel from "../layout/Panel";
export default {
  components: { Panel },
  name: "Home",
  data() {
    return {
      posts: [],
      currentPage: 1,
      // pageTotalList: [
      //   {
      //     tab: "",
      //     total: 675,
      //   },
      //   {
      //     tab: "good",
      //     total: 710,
      //   },
      //   {
      //     tab: "share",
      //     total: 320,
      //   },
      //   {
      //     tab: "ask",
      //     total: 260,
      //   },
      //   {
      //     tab: "job",
      //     total: 210,
      //   },
      //   {
      //     tab: "dev",
      //     total: 350,
      //   },
      // ],
      loading: false,
    };
  },
  computed: {
    tab() {
      return this.$route.params.tab;
    },
  },
  // 通过监听动态路由参数 获取对应的分类数据
  watch: {
    "$route.fullPath": {
      async handler(newValue) {
        const queryTab = this.$route.params.tab
          ? this.$route.params.tab
          : "all";

        const queryPage = this.$route.query.page ? this.$route.query.page : 1;

        const res = await this.$axios.get(
          `/topics?page=${queryPage}&limit=30&tab=${queryTab}`
        );
        this.posts = res.data;
      },
      immediate: true,
    },
  },
  methods: {
    async getPosts(page) {
      this.loading = true;
      const res = await this.$axios.get(`/topics?page=${page}&limit=30`);
      this.posts = res.data;
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    currentChange(page) {
      this.loading = true;
      this.currentPage = page;
      this.getPosts(page);
      if (this.$route.fullPath != this.$route.path + "?page=" + page) {
        this.$router.push(this.$route.path + "?page=" + page);
      }
      localStorage.setItem("pagination", page);
    },
  },
  async created() {
    // const { currentPage } = this;
    this.currentPage = Number(localStorage.getItem("pagination"));
    // this.getPosts(this.currentPage);
    this.currentChange(this.currentPage);
  },
  updated() {
    localStorage.setItem("pagination", this.currentPage);
  },
  beforeDestroy() {
    localStorage.setItem("pagination", "1");
  },
};
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  margin: 0 auto;
  .home-nav {
    display: flex;
    li {
      padding: 2px;
      list-style: none;
      border: 1px solid #c4e9e8;
      border-radius: 6px;
      margin-right: 20px;
      background-color: #c4e9e8;
      font-size: 14px;
      a {
        color: #395588;
      }
    }
  }
  .content {
    display: flex;
    flex-direction: column;
  }
  .post-item {
    border-bottom: 1px solid #fcf3f3;
    padding: 5px 0px;
    display: flex;
    align-items: center;
    .reply_visit {
      margin-left: 15px;
      width: 65px;
      font-size: 12px;
      color: #333;
      .visitNum {
        font-size: 10px;
        color: #b4b4b4;
      }
    }
    .tab,
    .active_tab {
      color: #999;
      background-color: #e5e5e5;
      padding: 3px;
      font-size: 12px;
      border-radius: 3px;
    }
    .active_tab {
      background-color: #c4e9e8;
      color: rgb(81, 84, 85);
    }
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
  .pagination {
    margin: 20px 0 10px 0;
  }
}
</style>
