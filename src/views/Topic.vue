<template>
  <div v-if="topic">
       <Panel>
      <template #header>
        <span>作者信息</span>
      </template>
      <template #content>
         <div class="authorInfo">
          <img :src="topic.author.avatar_url" alt="" />
          <span>{{ topic.author.loginname }}</span>
        </div>
      </template>
    </Panel>
    <Panel>
      <template #header>
        <span>文章详情</span>
      </template>
      <template #content>
        <div>
          <div class="topic_header">
            <div class="topic_header_title">
              <span v-if="topic.top || topic.good" class="tab">{{
                topic | getPostChineseTab
              }}</span>
              <h2>{{ topic.title }}</h2>
            </div>
            <div class="changes">
              <div class="changes_info">
                <span>发布于{{ topic.create_at | formatDateFromNow }}</span>
                &nbsp;&nbsp; <span>作者 {{ topic.author.loginname }}</span
                >&nbsp;&nbsp;
                <span>{{ topic.visit_count }}次浏览</span>&nbsp;&nbsp;
                <span
                  >最后一次编辑是
                  {{ topic.last_reply_at | formatDateFromNow }}</span
                >&nbsp;&nbsp;
                <span>来自 {{ topic.tab }}</span>
              </div>
              <!-- @click="!isCollection" -->
              <el-button
                size="medium"
                type="primary"
                v-if="true"
                @click="collect"
                >{{ topic.is_collect ? "取消收藏" : "收藏" }}</el-button
              >
            </div>
          </div>
          <hr />
          <div v-html="topic.content"></div>
        </div>
      </template>
    </Panel>
    <Panel>
      <template #header>
        <span>{{ topic.reply_count }}回复</span>
      </template>
      <template #content>
        <div class="replies">
          <div v-for="reply in topic.replies" :key="reply.id" class="reply">
            <div class="reply_author_info">
              <el-avatar
                shape="square"
                :size="32"
                :src="reply.author.avatar_url"
                :title="reply.author.loginname"
              ></el-avatar>
              <span class="loginname">{{ reply.author.loginname }}</span>
              <span class="create_at">{{
                reply.create_at | formatDateFromNow
              }}</span>
              <div class="btns">
                <button
                  :class="reply.is_uped ? 'up-active' : 'up-btn'"
                  @click="upClick(reply.id)"
                >
                  喜欢{{ reply.ups.length }}
                </button>
                <el-button
                  size="mini"
                  type="primary"
                  @click="otherSubmit(reply)"
                  >回复</el-button
                >
              </div>
            </div>
            <div>
              <div v-html="reply.content" v-if="reply.content"></div>
              <div v-else><p>暂无评论,请填加</p></div>
            </div>
            <div v-if="reply.id === reply_id">
              <textarea v-model="reply_text" ref="textarea"></textarea>
              <el-button
                size="mini"
                type="primary"
                @click="otherSubmit1(reply.id)"
                >回复</el-button
              >
            </div>
          </div>
        </div>
        <div class="topic-reply">
          <Editor
            v-model.trim="text"
            api-key="9mieih2cqsubf30b1omff3w107ojvjfvzhmb7haq4giiy754"
            :init="{
              language: 'zh_CN',
              height: 500,
              menubar: true,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount',
              ],
              toolbar:
                'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | \
    styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
    table image media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight formatpainter axupimgs',
            }"
          />
          <el-button class="up-btn" @click="submit" type="primary" size="medium"
            >回复</el-button
          >
        </div>
      </template>
    </Panel>
  </div>
</template>

<script>
import Panel from "../layout/Panel.vue";
import Editor from "@tinymce/tinymce-vue";

export default {
  components: { Panel, Editor },
  name: "Topic",
  data() {
    return {
      topic: null,
      // 回复文章的评论内容
      text: "",
      // 回复评论的id
      reply_id: "",
      //回复评论的评论
      reply_text: "",
    };
  },
  computed: {
    tab() {
      return this.$route.params.tab;
    },
    token() {
      return this.$store.state.userInfo;
    },
  },
  async created() {
    const { topicId } = this.$route.params;
    // 需要判断登录没登录
    let token = localStorage.getItem("token");
    // if (token) {
    //   const res = await this.$axios.get(`/topic/${topicId}`, {
    //     accesstoken: "554fe09a-1ec6-492c-8fa9-ad376413dc43",
    //   });
    //   console.log(res.data);
    // }
    const url = token
      ? `/topic/${topicId}?accesstoken=554fe09a-1ec6-492c-8fa9-ad376413dc43`
      : `/topic/${topicId}`;
    const res = await this.$axios.get(url);
    this.topic = res.data;
    const authorInfo = res.data;
    this.$store.commit("getAuthorInfo", authorInfo);
    localStorage.setItem("authorInfo", authorInfo);
  },
  methods: {
    // 点赞取消点赞
    async upClick(id) {
      // 点赞之前判断登陆没登录
      // let token = localStorage.getItem("token");
      // 判断点赞的是不是作者自己  自己不可以给自己点赞
      // if (token) {
      const res = await this.$axios.post(`/reply/${id}/ups`, {
        accesstoken: "554fe09a-1ec6-492c-8fa9-ad376413dc43",
      });
      // const authorLoginname = this.topic.author.loginname;
      // const replyLoginname = this.$store.state.userInfo.loginname;
      // if (authorLoginname != replyLoginname) {
      // 如何更新页面 （点赞变色 点赞个数加 1）
      //方案1-根据请求的结果up or down-去更新对应评论的·is_uped以及ups ,更新ups·需要用户的id
      //方案2-重新请求一遍  得看实际情况·需要网络请求
      const currentReply = this.topic.replies.find((item) => item.id === id);
      currentReply.is_uped = res.action === "up" ? true : false;
      res.action === "up"
        ? currentReply.ups.push("608c07174d20cb811668fb16")
        : currentReply.ups.pop();
    },
    // }
    // else {
    //   this.$router.push("/login");
    // }
    // },

    // 回复文章评论
    async submit() {
      const { text } = this;
      if (text) {
        const res = await this.$axios.post(`/topic/${this.topic.id}/replies`, {
          accesstoken: "554fe09a-1ec6-492c-8fa9-ad376413dc43",
          content: text,
        });
        // 如何更新页面
        // 1. 根据后台 id 和 text 做加的评论对象  更新topic
        // 2. 重新请求
        const newReply = {
          id: res.reply_id,
          is_uped: false,
          ups: [],
          content: text,
          author: {
            avatar_url:
              "https://avatars.githubusercontent.com/u/79734968?v=4&s=120",
            loginname: "BoZai-ya",
          },
        };
        this.topic.replies.unshift(newReply);
        this.text = "";
      }
    },
    //回复评论的评论
    otherSubmit(reply) {
      const { id, author } = reply;
      this.reply_id = id;
      this.reply_text = `@${author.loginname}  `;
      this.$nextTick(function() {
        // 更新完data之后马上获取更新之后的dom是获取不到的
        // $nextTick 作用是与DOM相关操作写在该函数回调中，确保DOM已渲染
        console.log(this.$refs.textarea);
        this.$refs.textarea[0].focus();
      });
    },
    async otherSubmit1(id) {
      const { reply_text } = this;
      const res = await this.$axios.post(`/topic/${this.topic.id}/replies`, {
        accesstoken: "554fe09a-1ec6-492c-8fa9-ad376413dc43",
        content: reply_text,
        reply_id: id,
      });
      // 如何更新页面
      // 1. 根据后台 id 和 text 做加的评论对象  更新topic
      // 2. 重新请求
      const newReply = {
        id: res.reply_id,
        is_uped: false,
        ups: [],
        content: reply_text,
        author: {
          avatar_url:
            "https://avatars.githubusercontent.com/u/79734968?v=4&s=120",
          loginname: "BoZai-ya",
        },
      };
      this.topic.replies.unshift(newReply);
      this.reply_text = "";
      this.reply_id = "";
    },
    // 收藏事件
    async collect() {
      const { is_collect, id } = this.topic;
      const token = localStorage.getItem("token");
      console.log(token);
      console.log(is_collect);
      console.log(id);
      if (is_collect) {
        //取消收藏
        await this.$axios.post("/topic_collect/de_collect", {
          topic_id: id,
          accesstoken: token,
        });
        this.topic.is_collect = false;
      } else {
        //收藏请求
        await this.$axios.post("/topic_collect/collect", {
          topic_id: id,
          accesstoken: token,
        });
        this.topic.is_collect = true;
      }
    },
  },
};
</script>

<style lang="less">
.authorInfo {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  img {
    width: 48px;
    height: 48px;
    margin-right: 20px;
    border-radius: 50%;
  }
  span {
    color: #778087;
    font-size: 16px;
  }
}
.topic_header {
  display: flex;
  flex-direction: column;
  .topic_header_title {
    display: flex;
    .tab {
      background-color: #c4e9e8;
      color: rgb(81, 84, 85);
      padding: 3px;
      font-size: 12px;
      border-radius: 3px;
      width: 30px;
      height: 25px;
      margin-right: 10px;
    }
  }
  .changes {
    display: flex;
    justify-content: space-between;
    .changes_info {
      span {
        font-size: 12px;
        color: #838383;
      }
    }
  }
}
.markdown-text {
  h3,
  h2 {
    font-size: 24px;
    margin-top: 30px;
    padding-bottom: 5px;
    border-bottom: 1px solid #ccc;
  }
  a {
    color: #08c;
  }
  p {
    font-size: 14px;
    line-height: 1.7em;
    color: #333;
    margin-top: 15px;
    img {
      width: 80%;
    }
  }
  ul li {
    padding: 3px;
  }
}
.replies {
  .reply {
    padding: 20px 0;
    border-bottom: 1px solid #ccc;
    .reply_author_info {
      display: flex;
      font-size: 12px;
      .loginname {
        margin: 0 10px;
        color: #666;
        cursor: pointer;
        font-weight: 700;
      }
      .create_at {
        color: #08c;
      }
      .btns {
        margin-left: 10px;
        .up-btn {
          background-color: #fff;
          border: 1px solid #ccc;
          cursor: pointer;
          outline: none;
          border-radius: 2px;
          width: 56px;
          height: 28px;
          margin-right: 10px;
        }
        .up-active {
          cursor: pointer;
          outline: none;
          border-radius: 2px;
          width: 56px;
          height: 28px;
          margin-right: 10px;
          background-color: #fff;
          color: red;
          border: 1px solid red;
        }
      }
    }
    .markdown-text p {
      margin: 0;
    }
  }
}
textarea {
  width: 80%;
  height: 50px;
  resize: none;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.topic-reply {
  margin-top: 20px;
}
</style>
