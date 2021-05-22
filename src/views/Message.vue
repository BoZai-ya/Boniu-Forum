<template>
  <div class="message">
    <div>
      <Panel>
        <template #header>
          <span><router-link to="/">主页</router-link>/<span @click="hideMsg">消息</span></span>
        </template>
        <template #content>
          <div @click.prevent="changeTab(true)">
            未读消息: {{ msg.hasnot_read_messages.length }}
          </div>
          <div @click.prevent="changeTab(false)">
            已读消息: {{ msg.has_read_messages.length }}
          </div>

          <div class="msg-list">
            <div
              v-for="(item, index) of isOnRead
                ? msg.hasnot_read_messages
                : msg.has_read_messages"
              :key="item.id + index"
              class="msg-item"
            >
              <div class="msg-body">
                <div class="msg-name">
                  <span @click="view">
                    <router-link
                      :to="{
                        name: 'user',
                        params: { name: item.author.loginname },
                      }"
                      >{{ item.author.loginname }}</router-link
                    >
                  </span>
                  的回复：
                </div>
                <div v-html="item.reply.content" class="msg-msg"></div>
                <div @click="view">
                  <div class="msg-from">
                    <router-link
                      :to="{ name: 'article', params: { id: item.topic.id } }"
                    >
                      来自：{{ item.topic.title }}
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Panel>
    </div>
    <div>
      <!-- <Panel>
        <template #header>
          <span>过往消息</span>
        </template>
        <template #content>
          <p>无消息</p>
        </template>
      </Panel> -->
    </div>
  </div>
</template>

<script>
import Panel from "../layout/Panel.vue";
export default {
  components: { Panel },
  name: "msg",

  data() {
    return {
      msg: {
        hasnot_read_messages: [],
        has_read_messages: [],
      },
      isOnRead: true,
    };
  },
  computed: {
    accessToken() {
      return this.$store.state.accessToken;
    },
  },
  created() {
    if (!this.accesstoken) {
      this.$store.commit("showLogin", true);
      return;
    }
    console.log(this.msg);
    this.$axios
      .get(`/messages?accesstoken={this.accessToken}`)
      .then((result) => result.data.data)
      .then((msg) => (this.msg = msg));
  },
  methods: {
    hideMsg() {
      this.$store.commit("showMsg", false);
    },
    changeTab(flag) {
      this.isOnRead = flag;
    },
    view() {
      this.$store.commit("showMsg", false);
    },
  },
};
</script>

<style lang="less" scoped>
.message {
  div {
    margin-bottom: 15px;
  }
}
</style>
