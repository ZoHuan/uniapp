<template>
	<view class="my-userinfo-container">
		<!-- 头像和昵称 -->
		<view class="top-box">
			<image :src="userinfo.avatarUrl" class="avatar"></image>
			<view class="nickname">{{ userinfo.nickName }}</view>
		</view>
		<!-- 面板区域 -->
		<view class="panel-list">
			<!-- 第一个面板 -->
			<view class="panel">
				<view class="panel-body">
					<view class="panel-item">
						<text>8</text>
						<text>收藏的店铺</text>
					</view>
					<view class="panel-item">
						<text>14</text>
						<text>收藏的商品</text>
					</view>
					<view class="panel-item">
						<text>18</text>
						<text>关注的商品</text>
					</view>
					<view class="panel-item">
						<text>88</text>
						<text>足迹</text>
					</view>
				</view>
			</view>

			<!-- 第二个面板 -->
			<view class="panel">
				<view class="panel-title">我的订单</view>

				<view class="panel-body">
					<view class="panel-item">
						<image src="/static/tab/icon1.png" class="icon"></image>
						<text>待付款</text>
					</view>
					<view class="panel-item">
						<image src="/static/tab/icon2.png" class="icon"></image>
						<text>待收货</text>
					</view>
					<view class="panel-item">
						<image src="/static/tab/icon3.png" class="icon"></image>
						<text>退款/退货</text>
					</view>
					<view class="panel-item">
						<image src="/static/tab/icon4.png" class="icon"></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>

			<!-- 第三个面板 -->

			<view class="panel">
				<view class="panel-list-item">
					<text>收货地址</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item">
					<text>联系客服</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item" @click="logout">
					<text>退出登录</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
	name: 'my-userinfo',
	data() {
		return {};
	},
	computed: {
		...mapState('user', ['userinfo'])
	},
	methods: {
		...mapMutations('user', ['updateAddress', 'updateUserInfo', 'updateToken']),
		async logout() {
			const [err, succ] = await uni
				.showModal({
					title: '提示',
					content: '确认退出登录吗？'
				})
				.catch(err => err);

			if (succ && succ.confirm) {
				this.updateAddress({});
				this.updateUserInfo({});
				this.updateToken('');
			}
		}
	}
};
</script>

<style lang="scss">
.my-userinfo-container {
	height: 100%;
	background-color: #f4f4f4;

	.top-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 400rpx;
		background-color: #5049d3;

		.avatar {
			width: 90px;
			height: 90px;
			border-radius: 50%;
			border: 2px solid #fff;
			box-shadow: 0 1px 5px black;
		}

		.nickname {
			margin-top: 10px;
			color: #fff;
			font-size: 16px;
			font-weight: bold;
		}
	}

	.panel-list {
		position: relative;
		top: -10px;
		padding: 0 10px;

		.panel {
			margin-bottom: 8px;
			border-radius: 3px;
			background-color: #fff;

			.panel-title {
				padding-left: 10px;
				border: 1px solid #f4f4f4;
				line-height: 45px;
				font-size: 15px;
			}
			.panel-body {
				display: flex;
				justify-content: space-around;
				.panel-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-around;
					padding: 10px 0;
					font-size: 13px;

					.icon {
						width: 35px;
						height: 35px;
					}
				}
			}

			.panel-list-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 10px;
				line-height: 45px;
				font-size: 15px;
			}
		}
	}
}
</style>
