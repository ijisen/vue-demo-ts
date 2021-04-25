<template>
  <div class="index-layout-main-content">
    <el-row :gutter="24">
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
        <ArticleChartCard />
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
        <WorksChartCard />
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
        <TopicsChartCard />
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
        <LinksChartCard />
      </el-col>
    </el-row>

    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <HotSearchCard />
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <HotTagsCard />
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <ArticleHitCard />
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <WorksHitCard />
      </el-col>
    </el-row>

  </div>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent } from 'vue';

  import PageLoading from './_component/PageLoading/index.vue';

  const ArticleChartCard = defineAsyncComponent({
    loader: () => import('./_component/ArticleChartCard/index.vue'),
    loadingComponent: PageLoading,
  });
  const WorksChartCard = defineAsyncComponent({
    loader: () => import('./_component/WorksChartCard/index.vue'),
    loadingComponent: PageLoading,
  });
  const TopicsChartCard = defineAsyncComponent({
    loader: () => import('./_component/TopicsChartCard/index.vue'),
    loadingComponent: PageLoading,
  });
  const LinksChartCard = defineAsyncComponent({
    loader: () => import('./_component/LinksChartCard/index.vue'),
    loadingComponent: PageLoading,
  });
  const HotSearchCard = defineAsyncComponent({
    loader: () => import('./_component/HotSearchCard/index.vue'),
    loadingComponent: PageLoading,
  });
  const HotTagsCard = defineAsyncComponent({
    loader: () => import('./_component/HotTagsCard/index.vue'),
    loadingComponent: PageLoading,
  });
  const ArticleHitCard = defineAsyncComponent({
    loader: () => import('./_component/ArticleHitCard/index.vue'),
    loadingComponent: PageLoading,
  });
  const WorksHitCard = defineAsyncComponent({
    loader: () => import('./_component/WorksHitCard/index.vue'),
    loadingComponent: PageLoading,
  });

  export default defineComponent({
    name: 'Home',
    components: {
      ArticleChartCard,
      WorksChartCard,
      TopicsChartCard,
      LinksChartCard,
      HotSearchCard,
      HotTagsCard,
      ArticleHitCard,
      WorksHitCard,
    },

  });
</script>
