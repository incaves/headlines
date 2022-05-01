<template>
  <div class="layout-container">
    <!-- 导航栏 -->
    <!-- 二级路由容器 -->
    <router-view></router-view>
    <!-- 标签栏 -->
    <van-tabbar v-model="active" class="layout-tabbar" route>
      <van-tabbar-item to="/">
        <i slot="icon" class="kiss kiss-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="kiss kiss-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="kiss kiss-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="kiss kiss-wode"></i>
        <span class="text">{{ $store.state.user ? '我的' : '未登陆' }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layoutPage',
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>
.layout-container {
  .layout-tabbar {
    i.kiss {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>
