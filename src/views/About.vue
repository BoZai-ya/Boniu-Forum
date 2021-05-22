<template>
  <div class="about">
    <Panel>
      <template #header>
        <span class=""><router-link to="/">主页</router-link>/<span>关于</span></span>
      </template>
      <template #content>
        <div class="content">
          <h2>关于本站</h2>
          <p>
           本站为波妞社区
          </p>
          <p>
           里面可以对你感兴趣的话题进行浏览与讨论。
          </p>
          <p>
            本社区的创建参考于
            <a href="https://cnodejs.org/">CNode</a>：
            <a href="https://cnodejs.org/">https://cnodejs.org/</a>
          </p>
          

          <h2>关于站主</h2>
          <p>本站<a href="https://github.com/">@BoZai-ya</a>开发维护。</p>
          <p>
            源码地址：<a href="#"
              >https://github.com/soliury/noder-react-native</a
            >
            。
          </p>
          <p>
            另外站主也整理了一些学习过程中的笔记，可以随时查看<a href="https://www.yuque.com/books/share/2427542c-c84e-436b-8116-88a74d804a80?# 《前端学习》"
              >https://www.yuque.com/books/share/2427542c-c84e-436b-8116-88a74d804a80?# 《前端学习》</a
            >
          </p>
            <p>站主一直在学习的路上，如果有本站有任何漏洞很欢迎扫描右面的二维码，提取建议</p>
        </div>
      </template>
    </Panel>
  </div>
</template>

<script>
import Panel from "../layout/Panel.vue";
export default {
  components: { Panel },
};
</script>

<style lang='less' scoped>
.about {
  .content {
    h2 {
      padding: 5px 0;
      border-bottom: 1px solid rgb(235, 234, 234);
    }
    p {
      color: #333;
      font-size: 16px;
      line-height: 40px;
    }
    a {
      color: #08c;
    }
  }
}
</style>