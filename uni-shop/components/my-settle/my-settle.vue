<template>
	<view class="my-settle-container">
		<!-- 全选 -->
		<label class="radio">
			<radio color="#c00000" :checked="isFullCheck" @click="changeAllState" />
			<text>全选</text>
		</label>
		<!-- 合计 -->
		<view class="amount-box">
			合计:
			<text class="amount">￥{{ checkedGoodsAmount }}</text>
		</view>

		<!-- 结算按钮 -->
		<view class="btn-settle" @click="settlement">结算({{ checkedCount }})</view>
	</view>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
	name: 'my-settle',
	data() {
		return {
			seconds: 3,
			timer: null
		};
	},
	computed: {
		...mapState('cart', ['cart']),
		...mapState('user', ['token']),
		...mapGetters('cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
		...mapGetters('user', ['addstr']),
		isFullCheck() {
			return this.total === this.checkedCount;
		}
	},
	methods: {
		...mapMutations('cart', ['updateAllGoodsState']),
		...mapMutations('user', ['updateRedirectInfo']),
		changeAllState() {
			this.updateAllGoodsState(!this.isFullCheck);
		},
		settlement() {
			if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品！');
			if (!this.addstr) return uni.$showMsg('请选择收货地址！');
			if (!this.token) return this.delayNavigate();

			this.payOrder();
		},

		async payOrder() {
			const orderInfo = {
				// order_price: this.checkedGoodsAmount,
				order_price: 0,
				consignee_addr: this.addstr,
				goods: this.cart
					.filter(x => x.goods_state)
					.map(x => ({
						goods_id: x.goods_id,
						goods_number: x.goods_count,
						goods_price: x.goods_price
					}))
			};

			const { data: res } = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo);
			if (res.meta.status !== 200) return uni.$showMsg('创建订单失败！');
			const orderNumber = res.messages.order_number;

			const { data: res2 } = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', {
				order_number: orderNumber
			});
			if (res.meta.status !== 200) return uni.$showMsg('预付订单生成失败！');
			const payInfo = res.messages.pay;

			const [err, succ] = await uni.requestPayment(payInfo);
			if (err) return uni.$showMsg('订单未支付！');
			const { data: res3 } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', {
				order_number: orderNumber
			});
			if (res3.meta.status !== 200) return uni.$showMsg('订单未支付！');

			uni.showToast({
				title: '订单支付完成！',
				icon: 'success'
			});
		},
		delayNavigate() {
			this.seconds = 3;
			this.showTips(this.seconds);
			this.timer = setInterval(() => {
				this.seconds--;
				if (this.seconds <= 0) {
					clearInterval(this.timer);
					uni.switchTab({
						url: '/pages/personal/personal',
						success: () => {
							this.updateRedirectInfo({
								openType: 'switchTab',
								from: '/pages/cart/cart'
							});
						}
					});

					return;
				}
				this.showTips(this.seconds);
			}, 1000);
		},
		showTips(n) {
			uni.showToast({
				icon: 'none',
				title: '请登录后再结算！' + n + '秒后自动跳转到登录页',
				mask: true,
				duration: 1500
			});
		}
	}
};
</script>

<style lang="scss">
.my-settle-container {
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 50px;
	background-color: white;
	padding-left: 5px;
	font-size: 14px;

	.radio {
		display: flex;
		align-items: center;
	}
	.amount-box {
		.amount {
			color: #c00000;
			font-weight: bold;
		}
	}
	.btn-settle {
		height: 50px;
		min-width: 100px;
		padding: 0 10x;
		line-height: 50px;
		text-align: center;
		background-color: #c00000;
		color: white;
	}
}
</style>
