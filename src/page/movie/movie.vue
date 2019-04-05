<template>
  <div class="page">
    <baner-box :bannerArr="banerData"></baner-box>
    <pgae-search :pageTitle="mainTitle" v-on:searchcall="getmoviesSearch"  ></pgae-search>
    <div class="main main-view" v-if="showSearchInfo!==true && showDetailsPage!==true">
    <!-- 正在热映 -->
    <movie-list pagetitle="正在热映"  maxindex=6 v-if="inTheaters && inTheaters.length>0" :movieData="inTheaters"  v-on:betailscall="getDetails"  ></movie-list>
    <!-- 正在热映 end-->
    <!-- 新片榜模块 -->
     <movie-list pagetitle="新片榜" maxindex=6 v-on:betailscall="getDetails" v-if="newMovies && newMovies.length>0"  :movieData="newMovies"></movie-list>
    <!-- 新片榜模块 end-->
    <!-- 木洋推荐模块 -->
    <movie-list pagetitle="木洋推荐" maxindex=12 v-on:betailscall="getDetails"  v-if="recommend && recommend.length>0"  :movieData="recommend"></movie-list>
    <!-- 木洋推荐模块 end-->
    </div>
    <!-- 搜索结果 -->
    <search-info :searchData='searchData' v-on:betailscall="getDetails"    v-on:backcall="init"  :searchTitle='searchTitle' v-if="showSearchInfo" ></search-info>
    <!-- 搜索结果 end-->
    <!-- 详情 -->
    <details-page  v-on:backcall="init" :detailsData='detailsData'  v-if="showDetailsPage" ></details-page>
    <!-- 详情 end-->
</div>
</template>

<script>
import { inTheaters, newMovies, moviesSearch } from 'api/movie/movie'
import { disposeUrl } from 'common/utils/commUtils'
import banerBox from 'components/banner/banner'
import movieList from 'components/movieList/movieList'
import pgaeSearch from 'components/pgaeSearch/pgaeSearch'
import searchInfo from 'components/search/search'
import detailsPage from 'components/details/details'
import { banerData } from 'store/localData/bannerData'
export default {
  name: 'publicityInfo',
  data () {
    return {
      inTheaters: [],
      newMovies: [],
      detailsData: [],
      banerData: banerData,
      search: '',
      PAGETYPE: 'q', // 默认搜索类型
      recommendname: '古风',
      recommend: [],
      searchData: [],
      searchTitle: '', // 搜索标题
      mainTitle: '电影',
      dramas: [],
      showSearchInfo: false,
      showDetailsPage: false,
      disposeUrl: disposeUrl
    }
  },
  components: {
    banerBox, pgaeSearch, searchInfo, detailsPage, movieList
  },
  methods: {
    // 正在热映
    getInTheaters () {
      let reqData = {
        page: 0,
        size: 6
      }
      inTheaters(reqData, (res, param) => {
        this.inTheaters = res.subjects
      }, (err, param) => {
        console.log(err)
      })
    },
    // 新片榜
    getnewMovies () {
      newMovies((res, param) => {
        this.newMovies = res.subjects
      }, (err, param) => {
        console.log(err)
      })
    },
    // 木洋推荐  入参 搜索页面类型/搜索类型/搜索参数
    getmoviesSearch (pageType, getType, search) {
      this.searchTitle = search
      let data = search
      if (pageType !== 'search') {
        data = this.recommendname
      }
      let reqData = {
        search: data,
        getType: getType
      }
      moviesSearch(reqData, (res, param) => {
        if (pageType === 'search') {
          this.showDetailsPage = false
          this.showSearchInfo = true
          this.searchData = res.subjects
        } else {
          this.recommend = res.subjects
        }
      }, (err, param) => {
        console.log(err)
      })
    },
    // 进入详情页面
    getDetails: function (data) {
      this.detailsData = data
      this.showDetailsPage = true
      this.showSearchInfo = false
    },
    init: function () {
      this.showSearchInfo = false
      this.showDetailsPage = false
      this.getInTheaters()
      this.getnewMovies()
      this.getmoviesSearch('recommend', this.PAGETYPE, this.recommendname)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped  lang="less">
</style>
