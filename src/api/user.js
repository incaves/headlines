/**
 * 用户相关模块
 */

import request from '@/utils/request'
// 登陆请求
// data 就是用户登陆的 手机号和验证码
export const loginApi = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}
// 发送验证码 每分钟只能发一次
export const sendSmsApi = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
// 获取用户自己信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
  })
}
// 获取频道列表 /v1_0/user/channels
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}
