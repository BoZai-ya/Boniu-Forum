<template>
  <div class="activity">
    <Panel>
      <template #header>
        <span class=""
          ><router-link to="/">主页</router-link>/<span>活动</span></span
        >
      </template>
      <template #content>
        <div class="content">
          <h2>近期活动</h2>
          <h3>
            还在策划中...
          </h3>
          <img src="../assets/wait.gif" alt="" />

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
<style lang="less" scoped>
.activity {
  .content {
    h2 {
      padding: 10px 0;
      border-bottom: 1px solid rgb(235, 234, 234);
    }
    h3 {
      padding: 20px 0;
      color: #666;
    }
     img {
       border-radius: 5px;
     }
  }
}
</style>
