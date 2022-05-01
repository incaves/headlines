<template>
  <div class="login-container">
    <!-- 导航栏 start -->
    <van-nav-bar class="page-nav-bar bar" title="Login">
      <van-icon slot="left" name="cross" @click="$router.back()"></van-icon>
    </van-nav-bar>
    <!-- 导航栏 end -->
    <!-- 表单 start -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="Please enter your mobile phone number"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="kiss kiss-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="Please enter the verification code"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="kiss kiss-yanzhengma"></i>
        <template #button>
          <!-- finish 表示倒计时结束后触发 如果倒计时结束 显示按钮 -->
          <van-count-down
            :time="3000 * 10"
            format="ss"
            v-if="isCountDowShow"
            @finish="isCountDowShow = false"
          />
          <van-button
            v-else
            class="send-sms-btn"
            size="small"
            type="primary"
            round
            @click="onSendsms"
            native-type="button"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button
          round
          class="login-btn"
          block
          type="info"
          native-type="submit"
          >Login</van-button
        >
      </div>
    </van-form>
    <!-- 表单 end -->
  </div>
</template>

<script>
import { loginApi, sendSmsApi } from '@/api/user.js'
export default {
  name: 'LoginPage',
  data() {
    return {
      // 用户信息
      user: {
        mobile: '13911111111', // 手机号
        code: '246810' // 验证码
      },
      // 表单校验规则
      userFormRules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /1[3|5|7|8]\d{9}/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请填写验证码' }
          // { pattern: /\d{6}}/, message: '验证码格式错误' }
        ]
      },
      isCountDowShow: false // 控制倒计时的显示与隐藏
    }
  },
  methods: {
    // 用户数据发送给后台
    async onSubmit() {
      // 1.获取表单数据
      const user = this.user
      // 2.表单验证

      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间 如果为 0 则持续展示
      })
      // 3.提交表单请求登陆
      try {
        const res = await loginApi(user)
        // res.data中是 token
        this.$store.commit('setUser', res.data)
        // 每一个this.$toast 成功 都会关闭上一个 this.$toast
        this.$toast.success('登陆成功')
        // 登陆成功跳转会原来页面
        this.$router.back()
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('请稍后重试')
        }
      }
      // 4.根据请求响应结果来处理后续操作
    },
    // 发送验证码
    async onSendsms() {
      // 1.首先校验手机号是否正确 moblie 是input中的name
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (error) {
        // 如果校验不通过不会执行下面的代码 倒计时.. 发送验证码
        return console.log(error)
      }
      // 2.验证通过显示倒计时
      this.isCountDowShow = true
      // 3.请求api发送验证码
      try {
        await sendSmsApi(this.user.mobile)
        this.$toast.success('发送成功')
      } catch (error) {
        // 发送失败关闭倒计时
        this.isCountDowShow = false
        if (error.response.status === 429) {
          this.$toast('发送太频繁了')
        } else {
          this.$toast('发送失败')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .kiss {
    font-size: 37px;
  }
  .send-sms-btn {
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    color: #000;
    border: none;
    font-size: 12px;
  }
  .login-btn-wrap {
    padding: 53px 33px;
  }
  .login-btn {
    background-color: #1989fa;
    border: none;
  }
  /deep/ .van-nav-bar__title {
    color: #fff !important;
  }
}
</style>
