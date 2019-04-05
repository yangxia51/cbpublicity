<template>
  <div class="main main-view   white-bg">
    <div class=" padding-all ">
    <div class="ub">
      <h2 class="ub-f1">搜索 {{searchTitle}} 结果</h2>
      <div class="ub gesture text-theme-color" @click="backpage">返回</div>
    </div>
    <div class="item ub" v-for="item in searchData" :key="item.id">
     <div class="ub">
        <img :src="disposeUrl(item.images.small)">
     </div>
     <div class="ub-f1 itemmain">
        <p class="text-size14 text-weight gesture margin-b10" @click="getDetails(item)" >{{item.title}}</p>
        <p>豆瓣评分: <span class="text-assist-color">{{item.rating.average}}</span></p>
        <p><span v-for="(iitem,index) in item.genres" :key="index+'a'">{{iitem}}</span></p>
        <p>演职人员: <span class="padding-r10" v-for="(iitem,index) in item.directors" :key="index">{{iitem.name}}</span><span class="padding-r10" v-for="(iitem,index) in item.casts" :key="index+'b'">{{iitem.name}}</span></p>
     </div>
    </div>
  </div>
  </div>
</template>

<script>
import { disposeUrl } from 'common/utils/commUtils'
export default {
  name: '',
  props: ['searchData', 'searchTitle'],
  data () {
    return {
      disposeUrl: disposeUrl
    }
  },
  methods: {
    backpage: function () {
      this.$emit('backcall')
    },
    getDetails: function (data) {
      this.$emit('betailscall', data)
    }
  }
}
</script>

<style scoped  lang="less">
.item {
  margin-top: 20px;
  img {
    width: 80px;
    margin-right: 20px;
  }
  p {
    line-height: 2;
  }
}
</style>
