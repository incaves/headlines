<template>
  <van-cell class="article-item">
    <!-- 标题 -->
    <div slot="title" class="title van-multi-ellipsis--l2">
      {{ article.title }}
    </div>
    <!-- 右侧 -->
    <!-- 只有一张封面 -->
    <van-image
      v-if="article.cover.type === 1"
      slot="default"
      fit="cover"
      class="right-cover"
      :src="article.cover.images[0]"
    />
    <!-- 底部 -->
    <div slot="label">
      <!-- 有三张封面 -->
      <div class="cover-wrap" v-if="article.cover.type === 3">
        <!-- 三张图片存储在 article.cover.imagess数组中 需要遍历出来-->
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image class="cover-item-img" fit="cover" :src="img" />
        </div>
      </div>
      <div class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
  </van-cell>
</template>

<script>
import '@/utils/day'
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  name: 'ArticleItem'
}
</script>
<style scoped lang="less">
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }

  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }

  .right-cover {
    width: 232px;
    height: 146px;
  }

  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }

  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
