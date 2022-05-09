<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isreFreshLoading"
      @refresh="onRefresh"
      :success-text="Refreshtext"
      :success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- :article="article 传递给子组件 -->
        <ArticleItem
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
          :article="article"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  data() {
    return {
      list: [], // 存储列表数据的数据
      loading: false, // 控制 加载中 loading状态
      finished: false, // 控制 数据加载完毕  没有更多了..
      timestamp: null, // 请求获取下一页的时间戳
      error: false, // 控制列表的错误加载状态
      isreFreshLoading: false, // 控制下拉刷新的 loading状态
      Refreshtext: '刷新成功' // 下拉刷新文案
    }
  },
  methods: {
    async onLoad() {
      // 1.请求获取数据
      try {
        const { data: res } = await getArticles({
          channel_id: this.channel.id,
          // timestamp 请求数据的页码
          // 请求第一页数据 请求当前最新时间戳
          // 用于请求之后的数据的时间戳会在请求结果中返回
          timestamp: this.timestamp || Date.now()
        })
        // console.log(res)
        // 2.把请求结果放到list数组中
        const { results } = res.data
        // 因为是滑动加载和旧的数组进行合并 而不是覆盖
        this.list.push(...results)
        // 3.本次数据加载结束之后要把加载状态设置为结束
        this.loading = false
        // 4.判断数据是否全部加载完成
        if (results.length) {
          // 还有数据 获取下一页的时间戳
          this.timestamp = res.data.pre_timestamp // 获取下一页时间戳
        } else {
          // 没有数据了
          this.finished = true
        }
      } catch (error) {
        this.$toast('请求失败', error)
        this.error = true
        this.loading = false
      }
    },
    // 下拉属性时会触发
    async onRefresh() {
      // 请求获取数据
      try {
        const { data: res } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now() // 下拉刷新 每次请求获取最新数据 传递当前数据
        })
        // 把获取的数据追加到列表的顶部
        const { results } = res.data
        this.list.unshift(...results)
        // 关闭下拉刷新的状态
        this.isreFreshLoading = false
        // 更新下拉刷新 成功提示的文本
        this.Refreshtext = `刷新成功,更新了${results.length}条数据`
      } catch (err) {
        this.Refreshtext = '刷新失败'
        this.isreFreshLoading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  // 百分比单位相对于父元素
  // height: 100%;
  height: 79vh;
  overflow-y: auto;
}
</style>
