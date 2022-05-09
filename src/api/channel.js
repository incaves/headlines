/**
 * 频道请求模块
 */
import request from '@/utils/request'
export const getAllChannels = () => {
  return request({
    methods: 'GET',
    url: '/v1_0/channels'
  })
}
/**
 * 添加用户频道
 */
export const addUserChannel = channels => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channels]
    }
  })
}
/**
 * 删除用户频道
 */
export const deleteUserChannel = channelId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelId}`
  })
}
