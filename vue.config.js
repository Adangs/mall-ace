const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
// console.log('process.env', process.env.BASE_API)
const BASE_URL = process.env.NODE_ENV === 'production' ? '/' : '/'

module.exports = {
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  baseUrl: BASE_URL,
  outputDir: 'static', // 输出目录
  assetsDir: 'vue', // 静态资源存放目录
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: true,
  chainWebpack: config => {
    // alias
    config.resolve.alias
      .set('~', resolve('src')) // key,value自行定义
    // 调整build文件命名
    // config.optimization.splitChunks({
    //   cacheGroups: {
    //     vendors: {
    //       name: `chunk_vendors`,
    //       chunks: 'initial'
    //     },
    //     common: {
    //       name: `chunk_common`,
    //       chunks: 'initial'
    //     }
    //   }
    // })
  },
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    port: 8001,
    proxy: {
      '/api': {
        target: 'http://rap2api.taobao.org/app/mock/125191',
        ws: true,
        changeOrigin: true
      },
      '/socket': {
        target: 'http://192.168.2.121:9008',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
