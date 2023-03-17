<template>
	<view>
		<!-- 使用搜索组件 -->
		<my-search @click="gotoSearch"></my-search>
		<view class="scroll-view-container">
			<!-- 左侧的滑动区域 -->
			<scroll-view class="left-scrool-view" scroll-y="true" :style="{ height: wh + 'px' }">
				<block v-for="(item, i) in cateList" :key="i">
					<view
						:class="['left-scroll-view-item', i === active ? 'active' : '']"
						@click="activeChanged(i)"
					>
						{{ item.cat_name }}
					</view>
				</block>
			</scroll-view>
			<!-- 右侧的滑动区域 -->
			<scroll-view scroll-y="true" :style="{ height: wh + 'px' }" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item, i) in cateLevel2" :key="i">
					<!-- 二级分类的标题 -->
					<view class="cate-lv2-title">/ {{ item.cat_name }} /</view>
					<!-- 三级分类列表 -->
					<view class="cate-lv3-list">
						<view
							class="cate-lv3-item"
							v-for="(value, index) in item.children"
							:key="index"
							@click="gotoGoodsList(value)"
						>
							<image :src="value.cat_icon"></image>
							<text>{{ value.cat_name }}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js';

export default {
	mixins: [badgeMix],
	data() {
		return {
			wh: 0,
			cateList: [],
			active: 0,
			cateLevel2: [],
			scrollTop: 0
		};
	},
	onLoad() {
		const sysInfo = uni.getSystemInfoSync();
		this.wh = sysInfo.windowHeight - 50;

		this.getCateList();
	},
	methods: {
		async getCateList() {
			const { data: res } = await uni.$http.get('/api/public/v1/categories');
			if (res.meta.status !== 200) return uni.$showMsg();
			this.cateList = res.message;

			this.cateLevel2 = res.message[0].children;
		},
		activeChanged(i) {
			this.active = i;
			this.cateLevel2 = this.cateList[i].children;
			this.scrollTop = this.scrollTop === 0 ? 1 : 0;
		},

		gotoGoodsList(item) {
			uni.navigateTo({
				url: '/subPackages/goods_list/goods_list?cit=' + item.cat_id
			});
		},
		gotoSearch() {
			uni.navigateTo({
				url: '/subPackages/search/search'
			});
		}
	}
};
</script>

<style lang="scss">
.scroll-view-container {
	display: flex;
	background-color: #fff;

	.left-scrool-view {
		width: 120px;

		.left-scroll-view-item {
			background-color: #f7f7f7;
			line-height: 60px;
			text-align: center;
			font-size: 12px;

			&.active {
				background-color: #fff;
				position: relative;
				&::before {
					content: '';
					display: block;
					width: 3px;
					height: 30px;
					background-color: #5049d3;
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
				}
			}
		}
	}

	.cate-lv2-title {
		font-size: 12px;
		font-weight: bold;
		text-align: center;
		padding: 15px 0;
	}

	.cate-lv3-list {
		display: flex;
		flex-wrap: wrap;

		.cate-lv3-item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 33.33%;
			margin-bottom: 10px;

			image {
				width: 60px;
				height: 60px;
			}
			text {
				font-size: 12px;
			}
		}
	}
}
</style>
