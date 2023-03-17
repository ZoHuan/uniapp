<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
		<button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
		<text class="tips-text">登录后尽享更多权益</text>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
	name: 'my-login',
	data() {
		return {};
	},
	computed: {
		...mapState('user', ['redirectInfo'])
	},
	methods: {
		...mapMutations('user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
		getUserProfile() {
			uni.getUserProfile({
				desc: '你的授权信息',
				success: res => {
					this.updateUserInfo(res.userInfo);
					this.getToken(res);
				},
				fail: res => {
					return uni.$showMsg('您取消了登录授权');
				}
			});
		},
		async getToken(info) {
			const [err, res] = await uni.login().catch(err => err);
			if (err || res.errMsg !== 'login:ok') return uni.$showMsg('登录失败！');

			const query = {
				code: res.code,
				encryptedData: info.encryptedData,
				iv: info.iv,
				rawData: info.rawData,
				signature: info.signature
			};

			const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query);
			if (loginResult.meta.status === 200) return uni.$showMsg('登录失败！');
			// this.updateToken(loginResult.message.token);
			this.updateToken(1);
			this.navigateBack();
		},
		navigateBack() {
			if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
				uni.switchTab({
					url: this.redirectInfo.from,
					complete: () => {
						this.updateRedirectInfo(null);
					}
				});
			}
		}
	}
};
</script>

<style lang="scss">
.login-container {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 750rpx;
	background-color: #f8f8f8;
	overflow: hidden;

	&::after {
		content: '';
		display: block;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 40px;
		border-radius: 100%;
		background-color: #fff;
		transform: translateY(50%);
	}

	.btn-login {
		width: 90%;
		margin: 15px 0;
		border-radius: 100px;
		background-color: #c00000;
	}
	.tips-text {
		font-size: 12px;
		color: gray;
	}
}
</style>
