<template>
  <div class="goods">
    <div class="menu_wrapper" ref="menuWrapper">
    	<ul>
    		<li v-for="(item,index) in goodsMenu" :class="index == currentIndex ? 'active' : ''" @click="selectMenu(index,$event)">
    			<span class="icon" v-if="item.type > 0" :class="classMap[item.type]"></span>
    			<span class="goodsMenu_txt border-1px" :class="classMap[item.type]">{{item.name}}</span>
    		</li>
    	</ul>
    </div>
    <div class="food_wrapper" ref="foodWrapper">
    	<div class="food_container" ref="foodContainer">
    		<ul v-for="food in goodsMenu" class="food_list_book">
	    		<li class="food_title">{{food.name}}</li>
	    		<li v-for="item in food.foods" class="food_desc" @click="selectFood(item,$event)">
	    			<div class="food_avatar">
	    				<img :src="item.image" alt="">
	    			</div>
	    			<div class="food_info">
	    				<h1>{{item.name}}</h1>
	    				<p v-show="item.description" class="food_description">{{item.description}}</p>
	    				<div class="food_sellcount">
	    				 <span>月售{{item.sellCount}}份</span><span>好评率{{item.rating}}%</span>
	    				</div>
	    				<div class="food_price">
	    					<span>￥{{item.price}}</span>
	    					<span class="old_price" v-if="item.oldPrice">￥{{item.oldPrice}}</span>
	    				</div>
	    			</div>
	    			<cartControl :food="item" @cartAdd="addFood"></cartControl>
	    		</li>
    		</ul>
    	</div>
    </div>
    <shopcart ref="shopcart" class="shopcart" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :selected-foods="selectFoods"></shopcart>
    <food :food="selectedFood" ref="food" @add="addFood"></food>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import shopcart from '../shopcart/shopcart.vue';
import cartControl from '../cartcontrol/cartcontrol.vue';
import food from '../food/food.vue';
const ERR_OK = 0;
export default {
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    this.$http.get('/api/goods').then(response => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.goodsMenu = response.data;
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        });
      }
    }, response => {

    });
  },
  data() {
    return {
      goodsMenu: [],
      cartCount: 0,
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    };
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let heightNext = this.listHeight[i + 1];
        if ((height1 <= this.scrollY && this.scrollY < heightNext) || !heightNext) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      this.goodsMenu.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count > 0) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  methods: {
    selectMenu(index, event) {
      if (!event._constructed) {
        return;
      }
      let toElement = this.$refs.foodContainer.getElementsByClassName('food_list_book')[index];
      this.foodWrapper.scrollToElement(toElement, 300);
    },
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodWrapper = new BScroll(this.$refs.foodWrapper, {
        click: true,
        probeType: 3
      });
      this.foodWrapper.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _calculateHeight() {
      let foodLists = this.$refs.foodContainer.getElementsByClassName('food_list_book');
      let len = foodLists.length;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < len; i++) {
        let item = foodLists[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    _drop(target) {
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target);
      });
    },
    addFood(target) {
      this._drop(target);
    },
    selectFood(food, event) {
      if (!event._constructed) {
        return;
      }
      this.selectedFood = food;
      this.$refs.food.show();
    }
  },
  components: {
    shopcart,
    cartControl,
    food
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/min.styl'
	.goods
		display:flex
		position:absolute
		top:173px;
		bottom:46px
		width:100%
		overflow:hidden
		.menu_wrapper
			width:80px
			flex:0 0 80px
			background-color:#f3f5f7
			ul
				box-sizing:border-box
				li
					height:54px
					line-height:54px
					position:relative
					padding:0 12px
					border-1px(rgba(7,17,27,0.1))
					&:after
						width:54px
						left:12px
					&.active
						background-color:#ffffff
						z-index:100
						top:-2px
					&.active:after
						content:""
						border-top:1px solid #f3f3f7
						bottom:-2px
					.icon
						width:12px
						height:12px
						display:inline-block
						background-repeat:no-repeat
						position:absolute
						background-size:12px 12px
						left:12px
						top:0
						&.discount
							bg-image('discount_3')
							top:8px
						&.special
							bg-image('special_3')
							top:14px
					.goodsMenu_txt
						font-size:12px
						color:#333333
						font-weight:200
						line-height:14px
						position:absolute
						top:50%
						transform:translateY(-50%)
						margin-right:12px
						&.discount,&.special
							text-indent:15px
		.food_wrapper
			flex:1
			.food_container
				ul
					li
						&.food_title
							height:26px
							background-color:#f3f3f7
							border-left:2px solid #d9dde1
							padding-left:14px
							font-size:12px
							color:rgb(147,153,159)
							line-height:26px
						&.food_desc
							background-color:#ffffff
							margin:18px
							overflow:hidden
							border-1px(rgba(7,17,27,0.1))
							&:last-child
								border-none()
							padding-bottom:18px
							position:relative
							.food_avatar
								width:57px
								height:57px
								border-radius:2px
								float:left
								margin-right:10px
								img
									width:57px
									height:57px
							.food_info
								padding-top:2px
								margin-left:67px
								h1
									font-size:14px
									line-height:14px
									color:rgb(7,17,27)
									margin-bottom:8px
								.food_description
									font-size:12px
									line-height:12px
									color:rgb(147,153,159)
									margin-bottom:8px
								.food_sellcount
									span
										font-size:10px
										line-height:10px
										color:rgb(147,153,159)
										margin-right:12px
								.food_price
									font-size:14px
									font-weight:700
									line-height:24px
									color:#f01414
									.old_price
										font-size:10px
										color:rgb(147,153,159)
										font-weight:700
										line-height:24px
										margin-left:8px
										text-decoration:line-through
</style>
