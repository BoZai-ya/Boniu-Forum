<template>
  <div class="footer">
    <div class="container">
      <div class="links">
        <a class="link" href="#">RSS</a>
        |
        <a class="link" href="#">源码地址</a>
      </div>
      <div class="text">
        <p>
          Boniu 社区
        </p>
        <p>
        本站有任何不足联系右侧二维码，欢迎讨论交流
        </p>
        <p>
          本站API接口均来自于
          <a href="https://cnodejs.org/api">CNode:Node.js专业中文社区</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less' scoped>
.footer {
  background-color: #fff;
  padding: 30px 0;
// background-image: url('../assets/footerbg.jpg');
  .container {
    width: 80%;
    margin: 0 auto;
    .link {
      color: #666;
      text-decoration: none;
      font-size: 14px;
      line-height: 2em;
    }
    .text {
      p {
        color: #ababab;
        font-size: 14px;
        line-height: 2em;
        a {
          color: #08c;
        }
      }
    }
  }
}
</style>