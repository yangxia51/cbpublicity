<template>
  <div class="nav ub ub-ac main">
       <h1 class="ub text-theme-color">木洋城北</h1>
         <el-menu class="ub-f1" :default-active="actIndex"  mode="horizontal" @select="handleSelect">
          <template v-if="homeMenu && homeMenu.length">
            <el-menu-item v-for="(item,indx) in homeMenu" :index="indx+''" :key="indx">{{item.mainTitle}}</el-menu-item>
          </template>
        </el-menu>
        <div class="ub text-ashy-color gesture">关于城北</div>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {

    }
  },
  props: ['homeMenu', 'headtitle'],
  computed: {
    actIndex: function () {
      return this.headtitle ? this.headtitle : '0'
    }
  },
  watch: {
    actIndex: function (oldVal, newVal) {
      this.$forceUpdate()
    }
  },
  methods: {
    // 菜单选中
    handleSelect (key, keyPath) {
      this.$emit('subcall', key)
    }
  },
  created () {
  }
}
</script>

<style scoped  lang="less">
.nav {
  h1 {
    margin-right: 40px;
  }
}
</style>
