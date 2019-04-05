<template>
  <div class="page">
    <div class="white-bg">
    <header-top :homeMenu="homeMenuData"  :headtitle="mainnumber" v-on:subcall="setMainView"></header-top>
    </div>
    <div class="mainbody">
    <router-view></router-view>
    </div>
   <footer-bottom></footer-bottom>
  </div>
</template>
<script>
import headerTop from '../../components/header/header'
import footerBottom from '../../components/footer/footer'
import { homeMenuData, homeDefConfig } from '../../store/localData/homeData'
import _ from 'lodash'
export default {
  name: 'home',
  data () {
    return {
      mainnumber: '', // 选中的子菜单需要
      homeDefConfig: homeDefConfig,
      homeMenuData: homeMenuData
    }
  },
  components: {
    headerTop, footerBottom
  },
  watch: {
    // 路由走向
    '$route' (to, from) {
      this.fetchData(this.$route)
    }
  },
  methods: {
    // 设置子路由内容
    setMainView: function (index) {
      let path = this.homeMenuData[index].defSet.defPath
      this.$router.push(path || '')
    },
    // 刷新路由
    fetchData: function (to, from) {
      if (to && to.name) {
        const curIndex = _.findIndex(this.homeMenuData, element => {
          return element.defSet.defPath === to.name
        })
        if (curIndex >= 0) {
          this.mainnumber = curIndex + ''
          this.setMainView(curIndex)
        } else {
          this.setMainView(this.homeDefConfig.defaultIndex)
        }
      }
    }
  },
  created: function () {
    this.mainnumber = this.homeDefConfig.defaultIndex
    this.fetchData(this.$route)
  }
}
</script>
<style scoped  lang="less">
@theme-color: #00b51d; // 主题色
.page {
  .el-menu.el-menu--horizontal {
    border: none;
  }
  .mainbody {
    min-height: 600px;
  }
}
</style>
