<template>
  <div class="stars" :class="starType">
    <span v-for="(itemclass,index) in itemClassies" :class="itemclass" class="star_item" key="index"></span>
  </div>
</template>

<script type="text/ecmascript-6">
	const LENGTH = 5;
	const ON = 'on';
	const OFF = 'off';
	const HALF = 'half';
export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType() {
      return 'star-' + this.size;
    },
    itemClassies() {
      let result = [];
      let score = Math.floor(this.score * 2) / 2;
      let hasDecimal = score % 1 !== 0;
      for (let i = 0; i < score; i++) {
        result.push(ON);
      }
      if (hasDecimal) {
        result.push(HALF);
      }
      while (result.length < LENGTH) {
        result.push(OFF);
      }
      return result;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/min.styl'

	.stars
		font-size:0
		.star_item
			display:inline-block
			background-repeat:no-repeat
		&.star-48
			.star_item
				width:20px
				height:20px
				margin-right:22px
				background-size:20px 20px
				&.last-child
					margin-right:0
				&.on
					bg-image('star48_on')
				&.off
					bg-image('star48_off')
				&.half
					bg-image('star48_half')
		&.star-36
			.star_item
				width:15px
				height:15px
				margin-right:6px
				background-size:15px 15px
				&.last-child
					margin-right:0
				&.on
					bg-image('star36_on')
				&.off
					bg-image('star36_off')
				&.half
					bg-image('star36_half')
		&.star-24
			.star_item
				width:10px
				height:10px
				margin-right:3px
				background-size:10px 10px
				&.last-child
					margin-right:0
				&.on
					bg-image('star24_on')
				&.off
					bg-image('star24_off')
				&.half
					bg-image('star24_half')
</style>
