<template>
   <div class="main main-view   white-bg">
    <div class="padding-all" v-if="detailsInfo!==null" >
    <div class="mainInfo">
     <div class="ub">
      <h2 class="ub-f1 margin-b10">{{detailsInfo.title}}<span class="padding-l10 text-gray-color">({{detailsInfo.year}})</span></h2>
      <div class="ub gesture text-theme-color" @click="backpage">返回</div>
     </div>
     <div class="info ub  margin-b10">
       <div class="ub margin-r10">
         <img :src="disposeUrl(detailsInfo.images.small)">
       </div>
       <div class="ub-f1 padding-t10">
          <p>导演：<span class="padding-r10" v-for="(DYitem,index) in detailsInfo.directors" :key="index+'DY'">{{DYitem.name}}</span></p>
          <p>主演：<span class="padding-r10" v-for="(ZYitem,index) in detailsInfo.casts" :key="index+'ZY'">{{ZYitem.name}}</span></p>
          <p>类型：<span v-for="(LXitem,index) in detailsInfo.genres" :key="index+'LX'">{{LXitem}}</span></p>
           <p>制片国家/地区：<span v-for="(ZPitem,index) in detailsInfo.countries" :key="index+'ZP'">{{ZPitem}}</span></p>
            <p v-if="detailsInfo.episodes_count">集数：{{detailsInfo.episodes_count}}</p>
            <p>又名：<span class="padding-r10" v-if="detailsInfo.aka" v-for="(YMitem,index) in detailsInfo.aka" :key="index+'YM'" >{{YMitem}}</span></p>
       </div>
     </div>
     </div>
     <div class="summary">
     <h4 class="margin-b10 text-theme-color">{{detailsInfo.title}}的剧情介绍</h4>
     <p class="text-indent">{{detailsInfo.summary}}</p>
     </div>
     <div class="casts">
     <h4 class="margin-b10 text-theme-color">{{detailsInfo.title}}的演员</h4>
     <el-row :gutter="20" class="margin-t10" >
          <el-col :span="4" v-for="item in detailsInfo.casts"    :key="item.id" >
            <div class="grid-content bg-purple ub ub-ver ub-ac ub-pc">
              <img :src="disposeUrl(item.avatars.small)">
              <p class="text-size14 text-weight gesture">{{item.name}}</p>
            </div>
          </el-col>
        </el-row>
     </div>
    </div>
  </div>
</template>

<script>
import { detailInfo } from 'api/movie/movie'
import { disposeUrl } from 'common/utils/commUtils'
export default {
  name: '',
  data () {
    return {
      detailsInfo: null,
      disposeUrl: disposeUrl
    }
  },
  props: ['detailsData'],
  methods: {
    // 字符串截取
    makeStr: function (str) {
      let arr = str.split(' ')
      return arr[0]
    },
    // 返回页面
    backpage: function () {
      this.$emit('backcall')
    },
    // 获取详情
    getDetailInfo: function (id) {
      let reqData = {
        id
      }
      detailInfo(reqData, (res, param) => {
        this.detailsInfo = res
        console.log(res)
      }, (err, param) => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.getDetailInfo(this.detailsData.id)
  }
}
</script>

<style scoped  lang="less">
.info {
  p {
    line-height: 2.5;
  }
  img {
    width: 140px;
  }
}
.casts img {
  width: 160px;
}
</style>
