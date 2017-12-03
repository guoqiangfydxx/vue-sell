<template>
	<div>
		<div class="shop_cart">
			<div class="shop_content">
				<div class="shopcart_left" @click="toggleList">
					<div class="logo_wrapper" :class="totalCount ? 'hascount' : ''">
						<i class="icon-shopping_cart"></i>
						<div class="shop_count" v-show="totalCount">{{totalCount}}</div>
					</div>
					<div class="price_total" :class="{'hasprice' : totalCount > 0}">￥{{totalPrice}}</div>
					<div class="delivery">另需配送费{{deliveryPrice}}元</div>
				</div>
				<div @click="pay" class="shopcart_right" :class="{'enough' : totalPrice >= minPrice}">{{payDesc}}</div>
			</div>
			<div class="ball_container">
				<div v-for="ball in balls">
					<transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
						<div class="ball" v-show="ball.show">
							<div class="inner inner-hook"></div>
						</div>
					</transition>
				</div>
			</div>
			<transition name="fold">
				<div class="shopcart_list" v-show="listShow">
					<div class="list_header">
						<span class="list_title">购物车</span>
						<span class="list_empty" @click="emptyCart">清空</span>
					</div>
					<div class="list_content" ref="listContent">
						<ul>
							<li v-for="item in selectedFoods">
								<span class="list_name">{{item.name}}</span>
								<span class="list_price">￥{{item.price * item.count}}</span>
								<cartControl :food="item" class="cart_control"></cartControl>
							</li>
						</ul>
					</div>
				</div>
			</transition>
			
		</div>
		<transition name="fade">
			<div class="list_mask" v-show="listShow" @click="hideList"></div>
		</transition>
	
	</div>
	
</template>

<script type="text/ecmascript-6">
import cartControl from '../cartcontrol/cartcontrol.vue';
import BScroll from 'better-scroll';
export default {
  props: {
    selectedFoods: {
      type: Array,
      default() {
        return [];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 20
    }
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectedFoods.forEach((food) => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount() {
      let count = 0;
      this.selectedFoods.forEach((food) => {
        count += food.count;
      });
      return count;
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差${diff}元起送`;
      } else {
        return '去结算';
      }
    },
    listShow() {
      if (!this.totalCount) {
        this.fold = true;
        return false;
      }
      let show = !this.fold;
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      }
      return show;
    }
  },
  data() {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [],
      fold: true
    };
  },
  methods: {
    drop(element) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = element;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    beforeDrop(el) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);
          el.style.display = '';
          el.style.transform = `translate3d(0, ${y}px, 0)`;
          el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
          inner.style.transform = `translate3d(${x}px, 0, 0)`;
        }
      }
    },
    dropping(el, done) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight;
      this.$nextTick(() => {
        el.style.transform = 'translate3d(0, 0, 0)';
        el.style.webkitTransform = 'translate3d(0, 0, 0)';
        let inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.webkitTransform = 'translate3d(0, 0, 0)';
        inner.style.transform = 'translate3d(0, 0, 0)';
        el.addEventListener('transitionend', done);
      });
    },
    afterDrop(el) {
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = 'none';
      }
    },
    toggleList() {
      if (!this.totalCount) {
        return;
      }
      this.fold = !this.fold;
    },
    emptyCart() {
      this.selectedFoods.forEach((food) => {
        food.count = 0;
      });
    },
    hideList() {
      if (!this.totalCount) {
        return;
      }
      this.fold = true;
    },
    pay() {
      if (this.totalPrice < this.minPrice) {
        return false;
      } else {
        alert('去支付');
      }
    }
  },
  components: {
    cartControl
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.shop_cart
		position:fixed
		bottom:0
		left:0
		width:100%
		height:48px
		background-color:#000
		z-index:50
		.shop_content	
			display:flex
			height:48px
			.shopcart_left
				flex:1
				background-color:#141d27
				padding:0 12px 0 12px
				.logo_wrapper
					float:left
					width:56px
					height:56px
					border:6px solid #141d27
					border-radius:50%
					position:relative
					bottom:8px
					text-align:center
					box-sizing:border-box
					&.hascount
						i
							color:rgb(255,255,255)
							background-color:rgb(0,160,220)
					i
						width:44px
						height:44px
						background-color:#2b333b
						border-radius:50%
						line-height:44px
						text-align:center
						display:inline-block
						color:rgba(255,255,255,.4)
						margin-top:-1px
						font-size:24px
					.shop_count	
						position:absolute
						width:24px
						line-height:16px
						height:16px
						top:-5px
						left:26px
						font-size:9px
						font-weight:700
						color:rgb(255,255,255)
						border-radius:12px
						background-color:rgb(240,20,20)
						box-shadow:0 4px 8px 0 rgba(0,0,0,0.4)
				.price_total
					float:left
					font-size:16px
					color:rgba(255,255,255,.4)
					font-weight:700
					line-height:24px
					border-right:1px solid rgba(255,255,255,0.1)
					height:24px
					margin:12px
					padding-right:12px
					&.hasprice
						color:#ffffff
				.delivery
					float:left
					font-size:13px
					color:rgba(255,255,255,0.4)
					line-height:24px
					height:24px
					margin:12px
					margin-left:0
			.shopcart_right
				flex: 0 0 105px
				line-height:48px
				font-size:12px
				color:rgba(255,255,255,.4)
				font-weight:700
				text-align:center
				padding:0 8px
				background-color:#2b333b
				&.enough
					background-color:#00b43c
					color:#ffffff
		.ball_container
			.ball
				position:fixed
				left:32px
				bottom:22px
				z-index:200
				transition:all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
				.inner
					width:16px
					height:16px
					border-radius:50%
					background-color:rgb(0,160,220)
					transition:all 0.4s linear
		.shopcart_list
			position:absolute
			width:100%
			top:0
			left:0
			z-index:-1
			transform: translate3d(0,-100%,0)
			&.fold-enter-active,&.fold-leave-active
				transition:all 0.5s
			&.fold-enter,&.fold-leave-active
				transform:translate3d(0,0,0)
			.list_header
				overflow:hidden
				height:40px
				line-height:40px
				padding:0 18px
				background-color:#f2f5f7
				border-bottom:1px solid rgba(7,17,27,0.1)
				.list_title
					float:left
					font-size:14px
					font-weight:200
					color:rgb(7,17,27)
				.list_empty
					font-size:12px
					color:rgb(0,160,220)
					float:right
			.list_content
				max-height:217px
				overflow:hidden
				background-color:#ffffff
				ul
					padding:0 18px
					li
						height:48px
						overflow:hidden
						border-bottom:1px solid rgba(7,17,27,0.1)
						box-sizing:border-box
						position:relative
						padding:12px 0
						.list_name
							font-size:14px
							color:rgb(7,17,27)
							line-height:24px
							float:left
						.list_price
							font-size:14px
							color:rgb(240,20,20)
							line-height:24px
							margin-left:18px
							margin-right:82px
							float:left
						.cart_control
							bottom:9px
							right:0
	.list_mask
		position:fixed
		top:0
		left:0
		right:0
		bottom:0
		background-color:rgba(7,17,27,0.6)
		z-index: 40
		backdrop-filter:blur(10px)
		opacity:1
		&.fade-enter-active,&.fade-leave-active
			transition:all 0.5s
		&.fade-enter,&.fade-leave-active
			opacity:1
			background-color:rgba(7,17,27,0)


</style>
