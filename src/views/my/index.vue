<template>
  <div class="my-container">
    <!-- 登陆状态的样式 -->
    <div class="header user-info" v-if="user">
      <div class="base-info">
        <!-- 头像 -->
        <div class="left">
          <van-image :src="userInfo.photo" round class="avater" fit="cover" />
          <!-- 用户名 -->
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-status">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登陆状态的样式 -->
    <div class="header not-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" alt="" class="mobile-img" />
        <span class="text">登陆 / 注册</span>
      </div>
    </div>
    <!-- 导航 -->
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="kiss kiss-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="kiss kiss-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 消息通知 小智同学 退出登陆-->
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
      <van-cell
        v-if="user"
        title="退出登陆"
        class="les9"
        @click="onLogout"
        clickable
      />
    </van-cell-group>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyPage',
  data() {
    return {
      userInfo: {} // 用户信息
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    // 有token(表示登录了) 再去请求数据
    if (this.user) {
      this.loadUserInfo()
    }
  },
  methods: {
    // 获取用户信息
    async loadUserInfo() {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (err) {
        this.$toast('获取数据失败,请稍后重试')
      }
    },
    // 退出登陆
    onLogout() {
      // 1.退出提示
      this.$dialog
        .confirm({
          title: '确认退出?'
        })
        .then(() => {
          // 2.确认退出 清楚登陆状态token
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          console.log('取消')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .header {
    height: 361px;
    background: url('~@/assets/banner.png');
    background-size: cover; // 填充
  }
  // 未登陆状态
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  // 登陆状态
  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .left {
        display: flex;
        align-content: center;
        .avater {
          width: 132px;
          height: 132px;
          margin-right: 23px;
        }
        .name {
          font-size: 30px;
          color: #fff;
          text-align: center;
          margin-top: 24px;
        }
      }
    }
    .data-status {
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    .grid-item {
      height: 141px;
      i.kiss {
        font-size: 45px;
      }
      .kiss-shoucang {
        color: #eb5253;
      }
      .kiss-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  .les9 {
    text-align: center;
    color: #eb5253;
  }
}
</style>
