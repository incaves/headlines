<template>
  <div class="home-container">
    <!-- 导航栏 start -->
    <van-nav-bar class="page-nav-bar bar" fixed>
      <van-button
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        class="search-btn"
        >搜索</van-button
      >channels
    </van-nav-bar>
    <!-- 导航栏 end -->
    <!-- 频道列表 start -->
    <van-tabs v-model="active" animated swipeable class="channel-tabs">
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <!-- 文章列表 -->
        <ArticleList :channel="channel" />
      </van-tab>
      <div slot="nav-right" class="pleacehder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="kiss kiss-gengduo" @click="isChennelEditShow = true"></i>
      </div>
    </van-tabs>
    <!-- 频道列表 end -->
    <!-- 频道编辑弹出层 start-->
    <van-popup
      v-model="isChennelEditShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <ChennelEdit
        :my-channels="channels"
        :active="active"
        @update-active="OnUpdataActive"
      />
    </van-popup>
    <!-- 频道编辑弹出层 end -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'
import ChennelEdit from './components/chennel-edit.vue'
export default {
  name: 'HomePage',
  data() {
    return {
      active: 1,
      channels: [], // 频道列表
      isChennelEditShow: false // 控制编辑频道弹出
    }
  },
  created() {
    this.loadChannels()
  },
  components: {
    ArticleList,
    ChennelEdit
  },
  methods: {
    async loadChannels() {
      try {
        const { data: res } = await getUserChannels()
        this.channels = res.data.channels
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    },
    // 根据子组件传递过来的索引 修改active的值
    OnUpdataActive(index, isChennelEditShow = true) {
      // console.log('home', index)
      this.active = index
      this.isChennelEditShow = false
    }
  }
}
</script>
<style lang="less" scoped>
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 335px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }
    .van-tab {
      min-width: 200px;
      height: 82px;
      border: 1px solid #edeff3;
      font-size: 30px;
      color: #777777; // 未被激活的颜色
    }
    .van-tab--active {
      color: #333333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      bottom: 8px;
      width: 31px;
      height: 6px;
      background-color: #3296fa;
    }
    .pleacehder {
      width: 66px;
      height: 82px;
      flex-shrink: 0;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: 0.902;
      i.kiss {
        font-size: 33px;
      }
      &::before {
        content: '';
        width: 1px;
        height: 100%;
        background: url('~@/assets/gradient-gray-line.png');
        background-size: contain;
      }
    }
  }
}
</style>
