<template>
<div class="main margin-b10 white-bg">
  <div class="navigation ub">
  <div class="ub-f1 ub-ac ub">当前位置：木洋城北<span class="padding-r10 padding-l10">/</span>{{pageTitle}}</div>
   <div class="ub">
    <el-select class="select"   v-model="searchType" placeholder="请选择">
      <el-option
        v-for="item in searchTypes"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-input class="ub margin-l10" v-model="search" placeholder="剧目名称、剧目名称、演员"></el-input>
    <el-button class="ub margin-l10" @click="searchData">搜索</el-button>
   </div>
   </div>
  </div>
</template>
<script>
import { noticeMsg } from 'common/utils/commUtils'
export default {
  name: '',
  data () {
    return {
      search: '',
      PAGETYPE: 'search',
      searchType: '',
      searchTypes: [{
        label: '剧类型',
        value: 'tag'
      }, {
        label: '演员',
        value: 'q'
      }]
    }
  },
  props: ['pageTitle'],
  methods: {
    searchData: function () {
      if (this.searchType === '' || this.search === '') {
        noticeMsg('请完善已有项', 'err')
        return
      }
      // 入参 搜索页面类型/搜索类型/搜索参数
      this.$emit('searchcall', this.PAGETYPE, this.searchType, this.search)
      this.searchType = ''
      this.search = ''
    }
  },
  created () {
  }
}
</script>

<style scoped  lang="less">
.select {
  width: 100px;
}
.el-input {
  width: 200px;
}
.navigation {
  padding: 10px 20px;
}
</style>
