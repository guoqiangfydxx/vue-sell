<template>
  <div id="app">
    <vheader :seller="seller"></vheader>
    <nav id="tab_menu">
      <ul class="border-1px">
        <li class="tab_on"><router-link to="/goods">商品</router-link></li>
        <li><router-link to="/ratings">评论</router-link></li>
        <li><router-link to="/seller">商家</router-link></li>
      </ul>
    </nav>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>

  </div>
</template>

<script type="text/ecmascript-6">
import header from './components/header/header.vue';
import {urlParse} from './common/js/util.js';
const ERR_OK = 0;
export default {
  data() {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse();
          console.log(queryParam);
          return queryParam.id;
        })()
      }
    };
  },
  created() {
    this.$http.get('/api/seller?id=' + this.seller.id).then(response => {
      response = response.body;
      console.log(response);
      if (response.errno === ERR_OK) {
        this.seller = Object.assign({}, this.seller, response.data);
        console.log(this.seller);
        console.log(response.data);
      }
    });
  },
  components: {
    'vheader': header
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './common/stylus/min.styl'
#tab_menu ul
  overflow:hidden
  border-1px(rgba(7,17,27,0.1))
  li
    float:left
    height:40px
    line-height:40px
    width:33.3%
    text-align:center
    a
      display: block;
      font-size: 14px;
      line-height: 14px;
      margin-top: 13px;
      text-align: center;
      &.tab_on
        color:rgb(240,20,20)
</style>
