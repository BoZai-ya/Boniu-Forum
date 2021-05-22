<template>
  <div class="panel" :style="{ width: formatWidth }">
    <div class="header">
      <slot name="header" />
    </div>
    <div class="content">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
//这是一个布局组件 panel(面板)
export default {
  props: {
    width: {
      type: [String, Number],
      default: "100%",
    },
  },
  computed: {
    formatWidth() {
      const { width } = this;
      return typeof width === "number" || Number(width) ? width + "px" : width;
    },
  },
};
</script>

<style lang="less">
.panel {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 15px;
  .header {
    color: #000;
    font-weight: 900;
    font-size: 14px;
    padding: 10px;
    background-color: rgba(134, 145, 145, 0.8);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .content {
    padding: 10px;
    background-color: rgba(235, 249, 250, 0.6);
    p{
    color: #000;

    }
  }
}
</style>
