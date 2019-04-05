<template>
   <div class="banner">
    <el-carousel indicator-position="outside" height="420px">
    <el-carousel-item v-for="item in bannerArr" :key="item.id">
       <img :src="item.url" :title="item.title"/>
    </el-carousel-item>
   </el-carousel>
    </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {

    }
  },
  props: ['bannerArr'],
  methods: {

  },
  created () {
  }
}
</script>

<style scoped  lang="less">
// baner
.banner img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
// baner end
</style>
