<template>
    <!-- 正在热映模块 -->
      <div class="in-theaters  white-bg padding-all margin-b10">
      <h2>{{pagetitle}}</h2>
        <el-row :gutter="20" class="margin-t10" >
          <el-col :span="4" v-for="(item,index) in movieData" @click.native="getDetails(item)" v-if="index < maxindex"    :key="item.id" >
            <div class="grid-content bg-purple ub ub-ver ub-ac ub-pc">
              <img :src="disposeUrl(item.images.small)">
              <p class="text-size14 text-weight gesture">{{item.title}}</p>
              <p>豆瓣评分:<span class="text-assist-color">{{item.rating.average}}</span></p>
            </div>
          </el-col>
        </el-row>
      </div>
    <!-- 正在热映模块 end-->
</template>

<script>
import { disposeUrl } from 'common/utils/commUtils'
export default {
  name: '',
  props: ['movieData', 'pagetitle', 'maxindex'],
  data () {
    return {
      disposeUrl: disposeUrl
    }
  },
  methods: {
    getDetails: function (data) {
      this.$emit('betailscall', data)
    }
  }
}
</script>

<style scoped  lang="less">
.in-theaters img {
  width: 100%;
  height: 220px;
}
</style>
