<template>
  <Panel>
    <template #header>
      <span>联系站主</span>
    </template>
    <template #content>
      <div class="info">
        <a class="erweima">
          <img
            src="../assets/ewm.jpg"
            alt=""
          />
        </a>
      </div>
    </template>
  </Panel>
</template>

<script>
import Panel from "../layout/Panel.vue";
export default {
  components: { Panel },
};
</script>

<style lang='less' scoped>
.info {
  text-align: center;
  a {
    img {
      width: 90%;
    }
  }
}
</style>