<template>
	<view class="personal-container">
		<my-login v-if="!token"></my-login>
		<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js';
import { mapState } from 'vuex';

export default {
	mixins: [badgeMix],
	data() {
		return {};
	},
	computed: {
		...mapState('user', ['token'])
	}
};
</script>

<style lang="scss">
page,
.personal-container {
	height: 100%;
	background-color: #fff;
}
</style>
