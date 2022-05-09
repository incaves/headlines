<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in MyChannels"
        :key="channel.id"
        @click="onMyChannelClick(channel, index)"
      >
        <!--  推荐频道是固定频道不应该被删除 -->
        <van-icon
          name="clear"
          slot="icon"
          v-show="isEdit && !channel.id == 0"
        ></van-icon>
        <!-- true就作用类名 false不作用 -->
        <span slot="text" class="text" :class="{ active: index === active }">{{
          channel.name
        }}</span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        icon="plus"
        :text="channel.name"
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </div>
</template>
<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel
} from '@/api/channel.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'channelEdit',
  props: {
    MyChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannels: [], // 所有列表数据
      isEdit: false // 控制编辑状态的显示与隐藏
    }
  },
  created() {
    this.loadAllChannels()
  },
  methods: {
    // 获取数据
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('数据获取失败', err)
      }
    },
    // 添加到我的频道
    async onAddChannel(channel) {
      this.MyChannels.push(channel)
      // 登陆状态
      try {
        if (this.user) {
          await addUserChannel({
            id: channel.id, // 被添加频道id
            seq: this.MyChannels.length // 序号
          })
        } else {
          // 没有登陆 本地存储
          setItem('INCSVES_CHANNLE', this.MyChannels)
        }
      } catch (error) {
        this.$toast('添加失败', error)
      }
    },
    onMyChannelClick(channel, index) {
      if (this.isEdit) {
        // 如果是推荐频道 不能被删除
        // if (this.MyChannels.channel.id == 0) {
        //   return
        // }
        // 如果是编辑状态,则执行删除频道的逻辑 isEdit  = true
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
        this.deleteChannel(channel)
      } else {
        // 如果非编辑状态 执行切换频道 isEdit = false
        // 通过active 自定义事件 通知父组件修改响应的active 进行频道切换
        this.$emit('update-active', index, false)
      }
    },
    async deleteChannel(channel) {
      try {
        if (this.user) {
          await deleteUserChannel(channel.id)
        } else {
          setItem('INCSVES_CHANNLE', this.MyChannels)
        }
      } catch (error) {
        this.$toast('删除失败')
      }
    }
  },
  computed: {
    ...mapState(['user']),
    // 处理推荐频道(不能包含我的频道中的数据)
    // 全部频道 - 我的频道 = 推荐频道
    recommendChannels() {
      // const channels = [] // 存储推荐频道
      // this.allChannels.forEach((channel) => {
      //   const ret = this.MyChannels.find((mychannels) => {
      //     return mychannels.id === channel.id
      //   })
      //   // 如果我的频道中不包含该频道,则手机到推荐频道中
      //   // 如果相等不进入push 不相等才可以进入
      //   if (!ret) {
      //     channels.push(channel)
      //   }
      // })
      // return channels
      // 第二种方式
      return this.allChannels.filter((item) => {
        return !this.MyChannels.find((i) => {
          return i.id === item.id
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    font-size: 28px;
    color: #222;
    .van-grid-item__content {
      background-color: #f4f5f6;
      white-space: nowrap; /* 不能折行*/
      .van-grid-itemm__text {
        font-size: 28px !important;
        color: #222 !important;
        /deep/ .van-grid-item__icon {
          margin-top: 10px;
        }
      }
      .active {
        color: red !important;
      }
      .van-grid-item__icon-wrapper {
        position: unset; // 去掉定位
      }
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        top: -10px;
        right: -10px;
        font-size: 30px;
        z-index: 2;
        color: #cacaca;
      }
    }
  }
  /deep/ .recommend-grid {
    .van-grid-item__content {
      flex-direction: row;
      .van-icon-plus {
        font-size: 28px;
        margin-right: 6px;
      }
      /deep/ .van-grid-item__icon .van-grid-item__text {
        margin-top: 0;
      }
      .van-grid-item__icon {
        margin-top: 12px;
      }
    }
  }
}
</style>
