<template>
  <el-container class="user-layout">
    <!-- 头部样式-->
    <el-header>
      <el-row>
        <!-- 左侧logo + 标题 -->
        <el-col :span="18" class="header-left">
          <img src="../../assets/images/logo.png" alt="logo">
          <i class="hr" />
          <span class="title">企业数字资产管理平台</span>
        </el-col>
        <!-- 右侧内容 -->
        <el-col :span="6" class="header-right">
          <SelectLang />
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer height="50px">
      <span>京ICP备09107995号 京公网安备11010802010887号 版权所有Copyright 2010-2013 互联网域名系统北京市工程研究中心保留所有权利</span>
    </el-footer>
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
  import SelectLang from '@/components/SelectLang/index.vue';
  import useTitle from '@/composables/useTitle';

  export default defineComponent({
    name: 'UserLayout',
    components: {
      SelectLang,
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
    /** 头部样式 */
    .el-header {
      padding-top: 15px;
      padding-bottom: 15px;
      width: 100%;
      background-color: $--color-primary;

      .el-row,
      .el-col {
        height: 100%;
        font-size: 0;
        vertical-align: middle;
      }
      .header-left {
        img {
          height: 100%;
          width: auto;
          max-width: 200px;
          vertical-align: middle;
        }

        .hr {
          margin-left: 15px;
          margin-right: 15px;
          display: inline-block;
          height: 100%;
          width: 1px;
          background-color: #fff;
          vertical-align: middle;
        }

        .title {
          display: inline-block;
          color: #fff;
          vertical-align: middle;
          font-size: 16px;
        }
      }
      .header-right {
        text-align: right;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }

    }

    .el-main {
      width: 100%;
      height: 100%;
    }

    /* 尾部样式*/
    .el-footer {
      padding: 0;
      width: 100%;
      background-color: $--color-primary;
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
