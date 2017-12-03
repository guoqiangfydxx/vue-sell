<template>
  <div class="ratingselect">
    <div class="rating_tab">
    	<div @click="selectTab(2, $event)" :class="selectedType == 2 ? 'active' : ''"><span class="ratings_name">{{desc.all}}</span> <span class="ratings_count">{{ratings.length}}</span></div>
    	<div @click="selectTab(0, $event)" :class="selectedType == 0 ? 'active' : ''"><span class="ratings_name">{{desc.positive}}</span> <span class="ratings_count">{{positives.length}}</span></div>
    	<div @click="selectTab(1, $event)" :class="selectedType == 1 ? 'active' : ''"><span class="ratings_name">{{desc.negative}}</span> <span class="ratings_count">{{negatives.length}}</span></div>
    </div>
    <div @click="toggleContent($event)" class="rating_switch" :class="onlyContent === true ? 'on' : ''">
    	<i class="icon-check_circle"></i>
    	<span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
const ALL = 2;
const POSITIVE = 0;
const NEGATIVE = 1;
export default {
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    selectedType: {
      type: Number,
      defualt: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        };
      }
    }
  },
  methods: {
    selectTab(type, event) {
      if (!event._constructed) {
        return;
      }
      this.$emit('selectTab', type);
    },
    toggleContent(event) {
      if (!event._constructed) {
        return;
      }
      this.$emit('toggle');
    }
  },
  computed: {
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE;
      });
    },
    negatives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE;
      });
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.ratingselect
		.rating_tab
			overflow:hidden
			margin-left:18px
			margin-right:18px
			border-bottom:1px solid rgba(7,17,27,0.1)
			padding-bottom:18px
			div
				float:left
				margin-right:8px
				height:32px
				line-height:32px
				text-align:center
				border-radius:2px
				&:nth-child(1)
					background-color:rgba(0,160,220,0.2)
					.ratings_name
						color:rgb(77,85,93)
					&.active
						background-color:rgb(0,160,220)
						.ratings_name
							color:#ffffff
						.ratings_count
							color:#ffffff
				&:nth-child(2)
					background-color:rgba(0,160,220,0.2)
					.ratings_name
						color:rgb(77,85,93)
					&.active
						background-color:rgb(0,160,220)
						.ratings_name
							color:#ffffff
						.ratings_count
							color:#ffffff
				&:nth-child(3)
					background-color:rgba(77,85,93,0.2)
					&.active
						background-color:#4d555d
						.ratings_name
							color:#ffffff
						.ratings_count
							color:#ffffff
				.ratings_name
					font-size:16px
					line-height:16px
					margin-left:12px
				.ratings_count
					margin-right:12px
					font-size:12px
		.rating_switch
			height:48px
			line-height:48px
			border-bottom:1px solid rgba(7,17,27,0.1)
			overflow:hidden
			i
				font-size:24px
				line-height:24px
				color:rgb(147,153,159)
				margin-right:4px
				vertical-align:top
				margin-left:20px
				float:left
				margin-top:12px
			&.on
				i
					color:#00c850
			.text
				font-size:12px
				line-height:24px
				color:rgb(147,153,159)
				flaot:left

</style>
