const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  lintOnSave: true,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-px2rem')({ // 备注/*px*/ 这个表示不转换rem或者直接Px、PX代替px, /*no*/ 表示直接忽略。
            remUnit: 50, // 换算的基数,font-size数值(设计稿按照750开发设置根字体为50px)
            baseDpr: 2, // 设备的Dpr=2
            remPrecision: 5 // rem保留几位数,默认5位
          })
        ]
      }
    }
  },
  devServer: {
    port: 8888,
    proxy: {
      // 配置代理 请求的时候直接/api => http://localhost:3000/api
      '/api': {
        target: 'http://localhost:3000'
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias // 配置别名
      .set('common', resolve('src/common'))
      .set('views', resolve('src/views'))
      .set('store', resolve('src/store'))
  }
}
