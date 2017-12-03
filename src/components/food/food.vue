<template>
	<transition name="move">
		<div class="food" v-show="showFlag" ref="foodContent">
			<div class="food_content">
				<div class="img_banner">
	    		<img :src="food.image" alt="">
	    		<i class="icon-arrow_lift" @click="hide"></i>
    		</div>
    		<div class="food_info">
	    		<h1>{{food.name}}</h1>
	    		<div class="food_seller"><span>月售{{food.sellCount}}份</span> <span>好评率{{food.rating}}%</span></div>
	    		<div class="food_price">
	    			<span class="current_price">￥{{food.price}}</span>
	    			<span class="old_price" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
	    		</div>
	    		<button type="button" class="btn_addtocart" v-show="food.count == 0 || !food.count" @click="foodAddCart($event)">加入购物车</button>
	    		<cartControl class="food_cart_control" :food="food" v-show="food.count > 0" @cartAdd="addFood"></cartControl>
    		</div>
    		<split v-show="food.info"></split>
    		<div class="food_intro" v-if="food.info">
    			<h1>商品介绍</h1>
    			<p>{{food.info}}</p>
    		</div>
    		<split></split>
    		<div class="ratings">
    			<h1 class="title">商品评价</h1>
    			<ratingselect :desc="desc" :only-content="onlyContent" :selected-type="selectedType" :ratings="food.ratings" @selectTab="selectRating" @toggle="toggleContent"></ratingselect>
    			<div class="ratings_detail">
    				<ul v-show="food.ratings && food.ratings.length">
    					<li v-for="item in food.ratings" v-show="needShow(item.rateType, item.text)">
	    					<div class="user-time">
	    						<p class="comment_time">{{item.rateTime | formatDate}}</p>
	    						<img class="comment_img" :src="item.avatar" alt="">
	    						<span class="comment_name">{{item.username}}</span>
	    					</div>
    						<div class="comment_text">
    							<i class="icon-thumb_up" v-if="item.rateType == 0"></i>
    							<i class="icon-thumb_down" v-if="item.rateType == 1"></i>
    							<span class="txt">{{item.text}}</span>
    						</div>
    					</li>
    				</ul>
    				<div class="no_rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
    			</div>
    		</div>
			</div>
  	</div>
	</transition>
  
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import cartControl from '../cartcontrol/cartcontrol.vue';
import Vue from 'vue';
import split from '../split/split.vue';
import ratingselect from '../ratingselect/ratingselect.vue';
import {formatDate} from '../../common/js/date.js';

const ALL = 2;
export default {
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      },
      onlyContent: true,
      selectedType: ALL
    };
  },
  methods: {
    show() {
      this.showFlag = true;
      this.selectedType = ALL;
      this.onlyContent = true;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foodContent, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    hide() {
      this.showFlag = false;
    },
    foodAddCart(food) {
      if (!event._constructed) {
        return;
      }
      Vue.set(this.food, 'count', 1);
    },
    addFood(target) {
      this.$emit('add', target);
    },
    selectRating(type) {
      this.selectedType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    toggleContent() {
      this.onlyContent = !this.onlyContent;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false;
      } else if (this.selectedType === ALL) {
        return true;
      } else {
        return this.selectedType === type;
      }
    }
  },
  components: {
    cartControl,
    split,
    ratingselect
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.food
		position:fixed
		bottom:48px
		left:0
		top:0
		right:0
		z-index:30
		background-color:#ffffff
		transform: translate3d(0,0,0)
		&.move-enter-active,&.move-leave-active
			transition:all 0.2s linear
		&.move-enter,&.move-leave-active
			transform: translate3d(100%,0,0)
		.food_content
			.img_banner
				width:100%
				position:relative
				height:0
				padding-top:100%
				img
					width:100%
					position:absolute
					top:0
					left:0
					height:100%
				i
					position:Absolute
					top:10px
					left:20px
					display:inline-block
					width:32px
					height:32px
					line-height:32px
					text-align:center
					color:#ffffff
			.food_info
				background-color:#ffffff
				padding:18px
				position:relative
				border-bottom:1px solid rgba(7,17,27,0.1)
				h1
					font-size:14px
					font-weight:700
					color:rgb(7,17,27)
					line-height:14px
					margin-bottom:8px
				.food_seller
					font-size:10px
					line-height:10px
					color:rgb(147,153,159)
					margin-bottom:18px
					span
						margin-right:12px
				.food_price
					.current_price
						font-size:14px
						font-weight:700
						color:rgb(240,20,20)
						line-height:24px
					.old_price
						font-size:10px
						font-weight:700
						color:rgb(147,153,159)
						line-height:24px
				.btn_addtocart
					position:absolute
					bottom:18px
					right:18px
					height:24px
					line-height:24px
					width:74px
					border:none
					box-sizing:border-box
					border-radius:12px
					text-align:center
					background-color:rgb(0,160,220)
					color:rgb(255,255,255)
					font-size:10px
				.food_cart_control
					bottom:18px
					right:18px
			.food_intro
				background-color:#ffffff
				padding:18px
				h1
					margin-bottom:6px
					font-size:14px
					line-height:14px
					color:#07111b
				p
					font-size:12px
					color:rgb(77,85,93)
					line-height:24px
					margin-left:8px
			.ratings
				background-color:#ffffff
				padding-top:18px
				.title
					line-height:14px
					font-size:14px
					color:#07111b
					margin-bottom:18px
					margin-left:18px
				.ratings_detail
					ul
						background-color:#ffffff
						padding:0 18px
						li
							border-bottom:1px solid rgba(7,17,27,0.1)
							.user-time
								overflow:hidden
								margin:16px 0 6px 0
								.comment_time
									float:left
									font-size:10px
									color:rgb(147,153,159)
									line-height:12px
								.comment_name
									font-size:10px
									line-height:12px
									color:rgb(147,153,159)
									float:right
								.comment_img
									float:right
									width:12px
									height:12px
									margin-left:6px
							.comment_text
								margin-bottom:16px
								overflow:hidden
								i
									float:left
									margin-right:4px
									font-size:12px
									color:rgb(147,153,159)
									line-height:24px
									&.icon-thumb_up
										color:#00a0dc
								.txt
									font-size:12px
									line-height:24px
									color:rgb(7,17,27)
									float:left
					.no_rating
						padding: 16px 0
						font-size:12px
						color:rgb(147,153,159)
						margin-left:18px



</style>
