<template>
  <div class="seller" ref="seller">
  	<div class="seller_content">
  		<div class="seller_name">
	    	<p class="name">{{seller.name}}</p>
	    	<div class="seller_star">
	    		<star :size="36" :score="seller.score" class="star"></star>
	    		<span class="ratingCount">({{seller.ratingCount}})</span>
	    		<span class="seller_count">月售{{seller.sellCount}}份</span>
	    	</div>
	    	<div class="favorite" @click="toggleFavorite($event)">
	    		<p class="icon-favorite" :class="{'active':isFavorite}"></p>
	    		<span class="text">{{favoriteText}}</span>
	    	</div>
    	</div>
    	<div class="seller_delivery">
    		<div class="minPrice">
    			<h1 class="seller_top_title">起送价</h1>
    			<span class="seller_top_text">{{seller.minPrice}}</span>元
    		</div>
    		<div class="deliveryPrice">
    			<h1 class="seller_top_title">商家配送</h1>
    			<span class="seller_top_text">{{seller.deliveryPrice}}</span>元
    		</div>
    		<div class="deliveryTime">
    			<h1 class="seller_top_title">平均配送时间</h1>
    			<span class="seller_top_text">{{seller.deliveryTime}}</span>分钟
    		</div>
    	</div>
    	<split></split>
    	<div class="seller_bulletin">
    		<h1 class="seller_title">公告与活动</h1>
    		<p class="bulletin">{{seller.bulletin}}</p>
    		<ul class="seller_sales">
    			<li v-for="(item, index) in seller.supports">
    				<i class="icon" :class="classMap[seller.supports[index].type]"></i>
    				<span>{{item.description}}</span>
    			</li>
    		</ul>
    	</div>
    	<split></split>
    	<div class="seller_view">
    			<h1 class="seller_title">商家实景</h1>
    			<div class="pic_wrapper" ref="picWrapper">
    				<ul class="pic_list" ref="picList">
    					<li class="pic_item" v-for="pic in seller.pics">
    						<img width="120" height="90" :src="pic" alt="">
    					</li>
    				</ul> 
    			</div>
    	</div>
    	<split></split>
    	<div class="seller_infos">
    		<h1 class="seller_title">商家信息</h1>
    		<ul class="info_list">
    			<li v-for="item in seller.infos">
						<p>{{item}}</p>
    			</li>
    		</ul>
    	</div>
  	</div>
  </div>
</template>

<script type="text/ecmascript-6">
import split from '../split/split.vue';
import star from '../star/star.vue';
import BScroll from 'better-scroll';
import {saveToLocal, getFromLocal} from '../../common/js/store.js';
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      isFavorite: (() => {
        return getFromLocal(this.seller.id, 'favorite', false);
      })()
    };
  },
  computed: {
    favoriteText() {
      return this.isFavorite ? '已收藏' : '未收藏';
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  watch: {
    'seller'() {
      this.$nextTick(() => {
        this._initScroll();
        this._initPics();
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll();
      this._initPics();
    });
  },
  methods: {
    _initScroll() {
      if (!this.scrollSeller) {
        this.scrollSeller = new BScroll(this.$refs.seller, {
          click: true
        });
      } else {
        this.scrollSeller.refresh();
      }
    },
    _initPics() {
      if (this.seller.pics) {
        let picWidth = 120;
        let margin = 90;
        let width = (picWidth + margin) * this.seller.pics.length - margin;
        this.$refs.picList.style.width = width + 'px';
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              eventPassthrough: 'vertical',
              scrollX: true
            });
          } else {
            this.picScroll.refresh();
          }
        });
      }
    },
    toggleFavorite(event) {
      if (!event._constructed) {
        return;
      }
      this.isFavorite = !this.isFavorite;
      saveToLocal(this.seller.id, 'favorite', this.isFavorite);
    }
  },
  components: {
    star,
    split
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/min.styl'
	.seller
		position:absolute
		bottom:0
		left:0
		top:173px
		width:100%
		overflow:hidden
		.seller_content
			.seller_name
				position:relative
				margin:18px 18px 0 18px
				padding-bottom:18px
				border-bottom:1px solid rgba(7,17,27,0.1)
				.name
					font-size:14px
					color:rgb(7,17,27)
					line-height:24px
					margin-bottom:8px
				.seller_star
					overflow:hidden
					.star
						margin-right:8px
						float:left
					.ratingCount
						margin-right:12px
						float:left
						font-size:10px
						color:rgb(77,85,93)
						line-height:18px
					.seller_count
						font-size:10px
						color:rgb(77,85,93)
						line-height:18px
						float:left
				.favorite
					position:absolute
					right:0
					bottom:18px
					text-align:center
					.icon-favorite
						font-size:24px
						line-height:24px
						color:#d4d6d9
						&.active
							color:rgb(240,20,20)
					.text
						font-size:10px
						color:rgb(77,85,93)
						line-height:10px
						margin-top:4px
			.seller_delivery
				overflow:hidden
				padding:18px 0
				.seller_top_title
					font-size:10px
					line-height:10px
					color:rgb(147,153,159)
					margin-bottom:4px
				.seller_top_text
					font-size:24px
					line-height:24px
					color:rgb(7,17,27)
					font-weight:200
				.minPrice
					width:33%
					text-align:center
					float:left
					border-right:1px solid rgba(7,17,27,0.1)
				.deliveryPrice
					width:33%
					text-align:center
					float:left
					border-right:1px solid rgba(7,17,27,0.1)
				.deliveryTime
					width:33.3%
					text-align:center
					float:left
			.seller_bulletin
				padding:18px 18px 0 18px
				background-color:#ffffff
				.bulletin
					margin:8px 12px 16px 12px
					font-size:12px
					line-height:24px
					color:rgb(240,20,20)
					font-weight:200
					padding-bottom:16px
					border-bottom:1px solid rgba(7,17,27,0.1)
				.seller_sales
					li
						overflow:hidden
						border-top:1px solid rgba(7,17,27,0.1)
						padding:0 12px
						.icon
							float:left
							width:16px
							height:16px
							background-repeat:no-repat
							background-size:16px 16px
							margin:16px 6px 16px 12px
							&.decrease
								bg-image('decrease_3')
							&.discount	
								bg-image('discount_3')
							&.special	
								bg-image('special_3')
							&.invoice
								bg-image('invoice_3')
							&.guarantee
								bg-image('guarantee_3')
						span
							line-height:16px
							float:left
							font-weight:200
							font-size:12px
							color:rgb(7,17,27)
							margin-top:16px
			.seller_view
				padding:18px
				background-color:#ffffff
				.seller_title
					margin-bottom:8px
					color:rgb(7,17,27)
				.pic_wrapper
					width:100%
					overflow:hidden
					white-space:nowrap
					.pic_list
						font-size:0
						.pic_item
							display:inline-block
							margin-right:6px
							width:120px
							height:90px
							&:last-child
								margin:0
			.seller_infos
				padding:18px
				background-color:#ffffff
				.seller_title
					margin-bottom:12px
				.info_list
					li
						padding:0 12px
						border-top:1px solid rgba(7,17,27,0.1)
						p
							font-size:12px
							line-height:12px
							font-weight:200
							color:rgb(7,17,27)
							margin:16px 0


</style>
