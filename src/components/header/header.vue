<template>
  <div class="header">
	 	<div class="content_warpper">
		  <div class="avatar">
		    <img v-bind:src="seller.avatar" alt="">
		  </div>
			<div class="content">
				<h1><span class="brand"></span>{{seller.name}}</h1>
				<p class="delivery"><span>{{seller.description}}</span> <span>{{seller.deliveryTime}}分钟送达</span> </p>
				<div class="discount">
					<span class="icon decrease"></span>
					<span>{{seller.supports[0].description}}， 满50减10</span>
				</div>
				<div class="count" @click="showDetail" v-if="seller.supports">
					<span>{{seller.supports.length}}个</span>
					<i class="icon-keyboard_arrow_right"></i>
				</div>
			</div>
	 	</div>
	 	<div class="bulletin" @click="showDetail">
	 		<span class="bulletin_title"></span>
	 		<span class="desc">{{seller.bulletin}}</span>
	 		<i class="icon-keyboard_arrow_right"></i>
	 	</div>
	 	<div class="top_bg">
	 		<img :src="seller.avatar" width="100%" height="100%">
	 	</div>
	 	<transition name="fade">
	 		<div class="detail" v-show="detailshow">
		 		<div class="detail_wrapper">
		 			<h1 class="detail_name">{{seller.name}}</h1>
			 		<div class="detail_grade">
			 			<star :size="48" :score="seller.score"></star>
			 		</div>
			 		<div class="detail_title">
			 			<span>优惠信息</span>
			 		</div>
			 		<ul class="detail_list">
			 			<li v-for="(item,index) in seller.supports">
			 				<span id="icon" :class="classMap[seller.supports[index].type]"></span>
			 				<span class="desc">{{item.description}}</span>
			 			</li>
			 		</ul>
					<div class="detail_title">
						<span>商家公告</span>
					</div>
					<div class="detail_infos">{{seller.bulletin}}</div>
					<div class="detail_close" @click="closeDetail">
						<i class="icon-close"></i>
					</div>
		 		</div>
	 		</div>
	 	</transition>
	 	
  </div>
</template>

<script type="text/ecmascript-6">

import star from '../star/star.vue';

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailshow: false
    };
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  methods: {
    closeDetail() {
      this.detailshow = false;
    },
    showDetail() {
      this.detailshow = true;
    }
  },
  components: {
    star
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/min.styl'
	.header
		background-color:rgba(7,17,27,0.5)
		position:relative
		overflow:hidden
		.content_warpper
			overflow:hidden
			padding:24px 12px 18px 24px
			position:relative
			.avatar
				width: 64px
				height: 64px
				float:left
				margin-right:16px
				img
					width: 64px
					height: 64px
					border-radius: 4px
			.content
				float:left
				h1
					font-size:16px
					color: rgb(255,255,255)
					font-weight: bold
					line-height: 18px
					margin-bottom:8px
					.brand
						width:30px
						height:18px
						float:left
						margin-right:6px
						bg-image('brand')
						background-repeat:no-repeat
						background-size: 30px 18px
				.delivery
					font-size:12px
					color: rgb(255,255,255)
					font-weight: 200
					line-height: 14px
					margin-bottom: 10px
				.discount
					overflow:hidden
					span
						font-size:10px
						color: rgb(255,255,255)
						font-weight:200
						line-height:14px
						float:left
					.icon
						float:left
						height:12px
						width:12px
						margin-right:4px
						background-size:12px 12px
						background-repeat:no-repeat 
						margin-top:2px
						&.decrease
							bg-image('decrease_1')
				.count
					position:absolute
					right:12px
					bottom:18px
					border-radius:14px 14px
					background-color: rgba(0,0,0,0.2)
					height:24px
					line-height: 24px 
					padding: 0 8px
					box-sizing: border-box
					span 
						font-size:10px
						color: rgb(255,255,255)
						font-weight: 200
						line-height:22px
						float:left
					i
						font-size:10px
						float:left
						color:#ffffff
						line-height:24px
		.bulletin
			height:28px
			line-height:28px
			padding:0 12px
			background-color:rgba(7,17,27,0.2)
			position:relative
			overflow:hidden
			.desc
				font-size:10px
				color:rgb(255,255,255)
				font-weight:200
				line-height:26px
				margin: 0 8px
				display:-webkit-box
				-webkit-line-clamp:1
				-webkit-box-orient:vertical
				overflow:hidden
				text-overflow:ellipsis
			.bulletin_title
				width:22px
				height:12px
				float:left
				bg-image('bulletin')
				background-size:22px 12px
				background-repeat:no-repeat
				margin-right:4px
				margin-top:8px
				margin-left:0
			i
				font-size:10px
				float:left
				color:#ffffff
				line-height:28px
				position:absolute
				right:12px
				top:0
	.top_bg
		position:absolute
		top:0
		left:0
		width:100%
		height:100%
		z-index:-1
		filter:blur(10px)
	.detail
		position:fixed
		top:0
		left:0
		bottom:0
		right:0
		background-color:rgba(7,17,27,0.8)
		padding:64px 36px 32px 36px
		-webkit-backdrop-filter:blur(10px)
		backdrop-filter:blur(10px)
		z-index:100
		color:#ffffff
		overflow:auto
		&.fade-enter-active,&.fade-leave-active
			transition: all 0.5s
		&.fade-enter,&.fade-leave-active
			opacity:0
			background-color:rgba(7,17,27,0)
		.detail_wrapper
			width:100%
			min-height:100%
			padding-bottom:32px
			position:relative
			.detail_name
				font-size:16px
				font-weight:700
				line-height:16px
				text-align:center
				margin-bottom:16px
			.detail_grade	
				height:24px
				margin-bottom:28px
				text-align:center
			.detail_close
				position:absolute
				width:32px
				height:32px
				font-size:32px
				color:rgba(255,255,255,.5)
				left:50%
				margin-left:-16px
				bottom:0
			.detail_title
				text-align:center
				margin-top:28px
				&:before
					content:""
					display:inline-block
					border-top:1px solid rgba(255,255,255,0.2)
					position:relative
					top:7px
					width:33%
					height:1px
					float:left
				&:after
					content:""
					display:inline-block
					border-top:1px solid rgba(255,255,255,0.2)
					position:relative
					top:7px
					width:33%;
					height:1px
					float:right
			.detail_infos
				margin:24px 12px 0 12px
				font-size:12px
				font-weight:200
				line-height:24px
			.detail_list
				margin:24px 12px 0 12px
				li
					overflow:hidden
					margin-bottom:12px
					#icon
						width:16px
						height:16px
						float:left
						margin-right:6px
						background-size:16px
						background-repeat:no-repeat
						&.decrease
							bg-image('decrease_1')
						&.discount
							bg-image('discount_1')
						&.special
							bg-image('special_1')
						&.invoice
							bg-image('invoice_1')
						&.guarantee
							bg-image('guarantee_1')
					.desc
						font-size:12px
						font-weight:200
						line-height:12px
						float:left
						vertical-align:top
</style>
