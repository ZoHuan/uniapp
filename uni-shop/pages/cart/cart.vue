<template>
	<view class="cart-container" v-if="cart.length !== 0">
		<my-address></my-address>
		<!-- 商品列表的标题区域 -->
		<view class="cart-title">
			<!-- 左侧的图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 右侧的文本 -->
			<text class="cart-title-text">购物车</text>
		</view>

		<!-- 购物车商品信息 -->
		<uni-swipe-action>
			<block v-for="(goods, i) in cart" :key="i">
				<uni-swipe-action-item :right-options="options" @click="swipeItemClickHandler(goods)">
					<my-goods
						:goods="goods"
						:show-radio="true"
						:show-num="true"
						@radio-change="radioChangeHandler"
						@num-change="numChangeHandler"
					></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>

		<!-- 结算组件 -->
		<my-settle></my-settle>
	</view>

	<!-- 空白购物车 -->
	<view class="empty-cart" v-else>
		<image src="/static/cart-empty.jpg" mode="widthFix" class="empty-img"></image>
		<text class="tip-text">空空如也</text>
	</view>
</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js';
import { mapState, mapMutations } from 'vuex';

export default {
	mixins: [badgeMix],
	computed: {
		...mapState('cart', ['cart'])
	},
	data() {
		return {
			options: [
				{
					text: '删除',
					style: {
						backgroundColor: '#c00000'
					}
				}
			]
		};
	},
	methods: {
		...mapMutations('cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),

		radioChangeHandler(e) {
			this.updateGoodsState(e);
		},
		numChangeHandler(e) {
			this.updateGoodsCount(e);
		},
		swipeItemClickHandler(goods) {
			this.removeGoodsById(goods.goods_id);
		}
	}
};
</script>

<style lang="scss">
.cart-container {
	padding-bottom: 50px;
	background-color: #fff;
}
.cart-title {
	display: flex;
	align-items: center;
	height: 40px;
	font-size: 14px;
	padding-left: 5px;
	border: 1px solid #efefef;

	.cart-title-text {
		margin-left: 10px;
	}
}

.empty-cart {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background-color: white;

	.empty-img {
		width: 180px;
	}
	.tip-text {
		font-size: 14px;
		color: gray;
		margin-top: 15px;
	}
}
</style>
