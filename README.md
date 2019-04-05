# cbpublicity

>木洋城北
关于音乐剧、音乐、电影、电视剧的宣传与查询
注：
0)该项目为个人学习项目，使用豆瓣提供的api，不做商用。该项目使用图片出处与使用接口将更新在文末
## 技术栈

* Vue2.0：实现前端页面构建
* Vuex：实现不同组件间的状态共享
* Vue-router：页面路由切换,实现单页的核心
* axios：一个基于 Promise 的 HTTP 库，向后端发起请求
* ES6：服务端和客户端均使用ES6语法，promise/async/await 处理异步
* localStorage：本地保存用户信息
* Webpack：模块打包，前端项目构建工具首选
* Flex：flex弹性布局
* CSS3：CSS3过渡动画及样式
* element-ui：饿了么出品的一套基于vue2.0的桌面组件库
## 部分展示
![Image text](https://github.com/yangxia51/cbpublicity/blob/master/static/img/sy.jpg)
## Build Setup
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

## 踩坑小记
0)提交到本地测试服务器 报错net::ERR_ABORTED 404 (Not Found)
解决方案：有绝对路径引用地址 需要设置config/index.js文件，build->assetsPublicPath改为“./”
1)提交到本地测试服务器 flex布局一些不生效 -webkit-box-orient: vertical 打包后丢失
解决方案：修改package.json文件browserslist属性为以下，使得postcss在处理的时候就会自动加上兼容对应浏览器版本的一些属性。
"browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8",
    "iOS >= 6",
    "Android > 4.1",
    "Firefox > 20"
  ]
2)路由刷新页面会自动回到主页面
解决方法：在页面跳转的时候去做判断 获取路由的to from 然后去执行当前应该渲染那个路由
 （0）需安装lodash 使用_.findIndex做判断
  代码：具体查看home页面
  // 刷新路由
    fetchData: function (to, from) {
      if (to && to.name) {
        const curIndex = _.findIndex(this.homeMenuData, element => {
          return element.defSet.defPath === to.name
        })
        if (curIndex >= 0) {
          this.mainnumber = curIndex + ''
          this.setMainView(this.homeMenuData[curIndex].defSet.defPath)
        } else {
          this.setMainView(this.homeMenuData[this.homeDefConfig.defaultIndex].defSet.defPath)
        }
      }
    }
3)豆瓣api中图片获取403
解决方案：图片防盗处理 写在公用函数里
/**
 * 图片防止盗窃处理403
 * @param {string} url 图片链接
*/
export const disposeUrl = (url) => {
  if (url === '') { return '' }
  // 图片403防盗链处理
  return ('https://images.weserv.nl/?url=' + url.replace(/http\w{0,1}:\/\//, ''))
}

## 接口使用
首页接口：
1.电影推荐
https://api.douban.com/v2/movie/in_theaters

详情：
电影详情：https://api.douban.com/v2/movie/30166972 少年的你

列表：
电影 https://api.douban.com/v2/movie/search?tag=热门  
