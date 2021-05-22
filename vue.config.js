//导出的对象就是配置文件
module.exports = {
  //publicPath 公共路径，主要作用是资源的路径，就是 index.html使用什么的地址去找css js img 等
  // 默认就是'/'  即使服务器地址   假如你的服务器地址是 https://<USERNANE>.github.io/<REPO>/   那么publicPath默认就是https://<USERNANE>.github.io/，当你的 index.html 导入资源的时候路径就是错误的

  // 要区分生产环境和开发环境   只有子部署的时候也就是生产环境下需要设置 publicPath
  publicPath: process.env.NODE_ENV === 'production'
  ? '/Boniu-Forum/'
  : '/'

}