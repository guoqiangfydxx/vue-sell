<template>
  <div class="food_add">
  	<transition name="move">
  		<div class="cart_decrease"  v-show="food.count" @click.stop.prevent="decreaseCart($event)">
  			<i class="icon-remove_circle_outline inner"></i>
  		</div>
  	</transition>
		<span class="cart_count" v-show="food.count">{{food.count}}</span>
		<i class="icon-add_circle" @click.stop.prevent="addCart($event)"></i>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue';
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart(event) {
      if (!event._constructed) {
        return;
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
      this.$emit('cartAdd', event.target);
    },
    decreaseCart(event) {
      if (!event._constructed) {
        return;
      }
      if (this.food.count > 0) {
        this.food.count--;
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.food_add
		position:absolute
		bottom:18px
		right:0
		font-size:24px
		line-height:24px
		color:rgb(0,160,220)
		overflow:hidden
		.cart_decrease
			float:left
			margin-right:8px
			float:left
			width:24px
			height:24px
			opacity:1
			transform:translate3d(0, 0, 0)
		  .inner
			  width:24px
			  height:24px
			  display:inline-block
			  transform: rotate(0)
			  transition:all 0.4s linear
			&.move-enter-active, &.move-leave-active
				transition: all 0.4s linear
			&.move-enter, &.move-leave-active
				opacity:0
				transform: translate3d(24px, 0, 0)
				.inner
					transform: rotate(180deg)
		.cart_count
			font-size:10px
			color:rgb(147,153,159)
			line-height:24px
			float:left
			margin-right:8px
</style>
