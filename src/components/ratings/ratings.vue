<template>
  <div class="ratingsList" ref="ratingsList">
  	<div class="ratingsList_content">
  		<div class="ratings_info">
	    	<div class="overall_score">
	    		<h1>{{seller.score}}</h1>
	    		<p class="title">综合评分</p>
	    		<p class="rank">高于周边商家{{seller.rankRate}}%</p>
	    	</div>
	    	<ul class="ratings_star">
	    		<li class="service_attitude">
	    			<span class="ratings_name">服务态度</span>
	    			<star :size="36" :score="seller.score" class="star"></star>
	    			<span class="grade">{{seller.serviceScore}}</span>
	    		</li>
	    		<li class="business_score">
	    			<span class="ratings_name">商家评价</span>
	    			<star :size="36" :score="seller.score" class="star"></star>
	    			<span class="grade">{{seller.foodScore}}</span>
	    		</li>
	    		<li class="delivery_time">
	    			<span class="ratings_name">送达时间</span>
	    			<span class="ratings_time">{{seller.deliveryTime}}分钟</span>
	    		</li>
	    	</ul>
	    </div>
	    <split></split>
	    <div class="ratings_detail">
	    	<ratingSelect :desc="desc" :only-content="onlyContent" :selected-type="selectedType" :ratings="ratings" @selectTab="selectRating" @toggle="toggleContent"></ratingSelect>
	    	<ul>
	    		<li v-for="item in ratings" v-show="needShow(item.rateType, item.text)">
	    			<img :src="item.avatar" alt="">
	    			<div class="ratings_list_right">
	    				<div class="list_name">
	    					<span class="username">{{item.username}}</span>
	    					<span class="time">{{item.rateTime | formatDate}}</span>
	    				</div>
	    				<div class="list_star">
	    					<star :size="24" :score="item.score" class="star"></star>
	    					<span class="time" v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
	    				</div>
	    				<p class="txt">{{item.text}}</p>
	    				<div class="list_recomment" v-show="item.recommend  && item.recommend.length > 0">
	    					<i class="icon-thumb_up" v-if="item.rateType === 0" :class="item.rateType == 0 ? 'up' : ''"></i>
	    					<i class="icon--thumb_down" v-if="item.rateType === 1"></i>
	    					<span v-for="tag in item.recommend">{{tag}}</span>
	    				</div>
	    			</div>
	    		</li>
	    	</ul>
	    </div>
  	</div>
  </div>
</template>

<script type="text/ecmascript-6">
import star from '../star/star.vue';
import split from '../split/split.vue';
import ratingSelect from '../ratingselect/ratingselect.vue';
import {formatDate} from '../../common/js/date.js';
import BScroll from 'better-scroll';
const ALL = 2;
const ERR_OK = 0;
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      ratings: [],
      desc: {
        all: '全部',
        positive: '满意',
        negative: '不满意'
      },
      onlyContent: true,
      selectedType: ALL
    };
  },
  created() {
    this.$http.get('/api/ratings').then((response) => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.ratings = response.data;
        console.log('ratings-seller', this.seller);
        this.$nextTick(() => {
          this.ratingScroll = new BScroll(this.$refs.ratingsList, {
            click: true
          });
        });
      }
    });
  },
  methods: {
    selectRating(type) {
      this.selectedType = type;
      this.$nextTick(() => {
        this.ratingScroll.refresh();
      });
    },
    toggleContent() {
      this.onlyContent = !this.onlyContent;
      this.$nextTick(() => {
        this.ratingScroll.refresh();
      });
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectedType === ALL) {
        return true;
      } else {
        return type === this.selectedType;
      }
    }
  },
  components: {
    star,
    split,
    ratingSelect
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
	.ratingsList
		position:absolute
		top:173px
		left:0
		bottom:0
		width:100%
		overflow:hidden
		.ratingsList_content
			.ratings_info
				background-color:#ffffff
				padding:18px 0 18px 0
				overflow:hidden
				display:flex
				.overall_score
					text-align:center
					float:left
					flex:0 0 137px
					border-right:1px solid rgba(7,17,27,0.1)
					@media only screen and (max-width: 320px)
						flex: 0 0 120px
						width:120px
					h1
						font-size:24px
						color:rgb(255,153,0)
						line-height:28px
						margin-bottom:6px
					.title
						font-size:12px
						color:rgb(7,17,27)
						line-height:12px
						margin-bottom:8px
					.rank
						font-size:10px
						color:rgb(147,153,159)
						line-height:10px
				.ratings_star
					flex:1
					padding:6px 0 6px 24px
					@media only screen and (max-width: 320px)
						padding-left:6px
					li
						overflow:hidden
						margin-bottom:8px
						&:last-child
							margin-bottom:0
						.ratings_name
							float:left
							font-size:12px
							color:rgb(7,17,27)
							line-height:18px
						.star
							float:left
							margin:0 12px
							@media only screen and (max-width: 320px)
								margin:0 10px
						.grade	
							font-size:12px
							color:rgb(255,153,0)
							line-height:18px
						.ratings_time
							font-size:12px
							color:rgb(147,153,159)
							line-height:18px
						&.delivery_time
							.ratings_name
								margin-right:12px
			.ratings_detail
				padding-top:18px
				ul
					padding:18px
					li
						overflow:hidden
						display:flex
						padding:18px 0
						border-bottom:1px solid rgba(7,17,27,0.1)
						&:last-child
							border-bottom:none
						img
							width:28px
							height:28px
							flex: 0 0 28px
							border-radius: 50%
							margin-right:12px
						.ratings_list_right
							flex:1
							.list_name
								overflow:hidden
								margin-bottom:4px
								.username
									font-size:10px
									color:rgb(7,17,27)
									line-height:12px
									float:left
								.time
									float:right
									font-size:10px
									font-weight:200
									line-height:12px
									color:rgb(147,153,159)
							.list_star
								overflow:hidden
								margin-bottom:6px
								.star
									float:left
									margin-right:6px
								span
									float:left
									font-size:10px
									line-height:12px
									font-weight:200
									color:rgb(147,153,159)
							.txt
								font-size:12px
								line-height:18px
								color:rgb(7,17,27)
								margin-bottom:8px
							.list_recomment	
								overflow:hidden
								i
									float:left
									margin-right:6px
									&.up
										color:#00a0dc
								span
									float:left
									text-align:center
									border:1px solid rgba(7,17,27,0.1)
									border-radius:2px
									font-size:9px
									line-height:16px
									color:rgb(147,153,159)
									margin-right:8px
									padding:0 6px
									margin-bottom:6px




</style>
