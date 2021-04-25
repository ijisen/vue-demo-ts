<template>
  <el-container class="user-layout">
    <!-- 头部样式-->
    <LayoutHeader />
    <el-main>
      <router-view></router-view>
    </el-main>
    <!-- 底部版权样式 -->
    <LayoutFooter />
  </el-container>
</template>
<script lang="ts">
  /**
   ==============================================================
   * Theme Name: UserLayout：抽离出用于登录注册页面的通用布局
   * Author: jisen
   * Edit Time: 2021-04-22
   ============================================================== */
  import { computed, defineComponent, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { getRouteItem, RoutesDataItem, vueRoutes } from '@/utils/routes';
  import { UserLayoutRoutes } from '@/router';
  import LayoutHeader from '../_component/LayoutHeader/index.vue'
  import LayoutFooter from '../_component/LayoutFooter/index.vue'
  import useTitle from '@/composables/useTitle';

  export default defineComponent({
    name: 'UserLayout',
    components: {
      LayoutHeader,
      LayoutFooter,
    },
    setup() {
      const route = useRoute();

      // 所有菜单路由
      const menuData = ref<RoutesDataItem[]>(vueRoutes(UserLayoutRoutes, '/user'));

      // 当前路由 item
      const routeItem = computed<RoutesDataItem>(() => getRouteItem(route.path, menuData.value as RoutesDataItem[]));

      // 设置title
      useTitle(routeItem);

    },
  });
</script>
<style lang="scss" scoped>
  @import '../../assets/css/element-variables.scss';

  .user-layout {
    display: flex;
    width: 100%;
    min-width: 1200px;
    height: 100vh;
    min-height: 500px;
    align-items: center;
    background-color: #fff;

    .el-main {
      width: 100%;
      height: 100%;
    }

    /* 尾部样式*/
    .el-footer {
      padding: 0;
      width: 100%;
      background-color: $--theme-color;
      font-size: 12px;
      text-align: center;
      line-height: 50px;
      color: #ccc;
    }

    .lang {
      position: absolute;
      top: 20px;
      right: 50px;

      ::v-deep(.el-dropdown) {
        .dropDown {
          i {
            color: #ffffff;
            font-size: 16px;
          }
        }
      }

    }
  }
</style>
