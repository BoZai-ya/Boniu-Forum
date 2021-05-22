<template>
  <Panel>
    <template #header>
      <span class=""><span>主页</span>/<span>发布话题</span></span>
    </template>
    <template #content>
      <div>
        <div>
          选择板块:
          <el-select v-model.trim="type" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <el-input
          placeholder="请输入发布内容的标题"
          class="createTopic"
          v-model="title"
        ></el-input>
        <Editor
          v-model.trim="content"
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
          >提交</el-button
        >
      </div>
    </template>
  </Panel>
</template>

<script>
import Panel from "../layout/Panel.vue";
import Editor from "@tinymce/tinymce-vue";

export default {
  components: { Panel, Editor },
  data() {
    return {
      content: "",
      title: "",
      type: "",

      options: [
        {
          value: "选项1",
          label: "分享",
        },
        {
          value: "选项2",
          label: "问答",
        },
        {
          value: "选项3",
          label: "招聘",
        },
        {
          value: "选项4",
          label: "客户端测试",
        },
      ],
    };
  },
  computed: {
    accessToken() {
      return this.$store.state.accessToken;
    },
  },
  methods: {
    showNewArticle() {
      this.$store.commit("showNewArticle", false);
    },
    // 新建话题-发送至服务器
    submit() {
      // if (!this.accessToken) {
      //   this.$store.commit("showLogin", true);
      //   return;
      // }
      if (this.type === "分享") {
        this.type = "share";
      } else if (this.type === "问答") {
        this.type = "ask";
      } else if (this.type === "招聘") {
        this.type = "job";
      } else {
        this.type = "dev";
      }
      this.$axios
        .post("/topics", {
          accesstoken: this.accessToken,
          title: this.title,
          tab: this.type,
          content: this.content,
        })
        .then((result) => {
          if (result.data && result.data.success) {
            this.$store.commit("showNewArticle", false);
            this.$router.push({
              name: "article",
              params: { id: result.data.topic_id },
            });
            (this.content = ""), (this.title = ""), (this.type = "");
          } else {
            alert("没有发布成功");
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.createTopic {
  margin: 10px 0;
}
.up-btn {
  margin-top: 20px;
}
</style>
