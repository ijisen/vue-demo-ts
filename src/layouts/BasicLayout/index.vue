<template>
  <div class="main-container">
    <div class="content">
      <LayoutHeader>
        <template v-slot:userInfo>
          <LayoutHeaderMessage />
          <LayoutHeaderUserInfo />
        </template>
      </LayoutHeader>
      <el-container>
        <el-aside :width="collapsed ? '54px' :'200px'">
          <LeftNavBar
              :collapsed="collapsed"
              :topNavEnable="topNavEnable"
              :belongTopMenu="belongTopMenu"
              :defaultActive="defaultActive"
              :menuData="permissionMenuData" />
        </el-aside>
        <el-main>
          <div class="el-main-container">
            <Breadcrumb
                :collapsed="collapsed"
                :topNavEnable="topNavEnable"
                :belongTopMenu="belongTopMenu"
                :toggleCollapsed="toggleCollapsed"
                :breadCrumbs="breadCrumbs"
                :menuData="permissionMenuData" />
            <div class="el-main-content">
              <permission :roles="routeItem.roles">
                <router-view />
              </permission>
            </div>

            <!--<RightFooter />-->
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script lang="ts">
  /**
   ==============================================================
   * Theme Name: BasicLayout 首页布局样式
   * Author: jisen
   * Edit Time: 2021-04-23
   ============================================================== */
  import { defineComponent, computed, PropType } from "vue";
  import { useStore } from 'vuex';
  import { useRoute } from 'vue-router';
  import { StateType as GlobalStateType } from '@/store/global';
  import { StateType as UserStateType } from "@/store/user";
  import {
    vueRoutes, RoutesDataItem, getRouteItem, getSelectLeftMenuPath,
    formatRoutePathTheParents, getRouteBelongTopMenu, getBreadcrumbRoutes,
    BreadcrumbType, getPermissionMenuData
  } from '@/utils/routes';
  import { mergeUnique as ArrayMergeUnique } from '@/utils/array';
  import useTitle from '@/composables/useTitle';
  import { MenuList } from '@/router';
  import LayoutHeader from '@/components/LayoutHeader/index.vue'
  import LayoutHeaderMessage from './components/RightTopMessage.vue';
  import LayoutHeaderUserInfo from './components/RightTopUser.vue';
  import LeftNavBar from './components/LeftNavBar/index.vue';
  import Breadcrumb from './components/Breadcrumb.vue';
  import Permission from '@/components/Permission/index.vue';
  // import RightFooter from './components/RightFooter.vue';
  // import Settings from "./components/Settings.vue";

  interface IndexLayoutSetupData {
    collapsed: boolean;
    toggleCollapsed: () => void;
    topNavEnable: boolean;
    belongTopMenu: string;
    headFixed: boolean;
    defaultActive: string;
    breadCrumbs: BreadcrumbType[];
    permissionMenuData: RoutesDataItem[];
    routeItem: RoutesDataItem;
  }

  export default defineComponent({
    name: 'BasicLayout',
    components: {
      LayoutHeader,
      LayoutHeaderMessage,
      LayoutHeaderUserInfo,
      Permission,
      LeftNavBar,
      Breadcrumb,
      // RightFooter,
      // Settings
    },
    setup(): IndexLayoutSetupData {
      const store = useStore<{
        global: GlobalStateType;
        user: UserStateType;
      }>();
      const route = useRoute();


      // 所有菜单路由
      const menuData: RoutesDataItem[] = vueRoutes(MenuList);

      // 当前路由 item
      const routeItem = computed<RoutesDataItem>(() => getRouteItem(route.path, menuData));

      // 有权限的菜单
      const permissionMenuData = computed<RoutesDataItem[]>(() => getPermissionMenuData(store.state.user.currentUser.roles, menuData));

      // 当前路由的顶部菜单path
      const belongTopMenu = computed<string>(() => getRouteBelongTopMenu(routeItem.value))

      // 当前路由的父路由path[]
      const routeParentPaths = computed<string[]>(() => formatRoutePathTheParents(routeItem.value.path));

      // 收缩左侧
      const collapsed = computed<boolean>(() => store.state.global.collapsed);
      const toggleCollapsed = (): void => {
        store.commit('global/changeLayoutCollapsed', !collapsed.value);
      }

      // 右侧顶部导航是否开启
      const topNavEnable = computed<boolean>(() => store.state.global.topNavEnable);

      // 右侧顶部是否固定
      const headFixed = computed<boolean>(() => store.state.global.headFixed);


      // 左侧选择的菜单
      const defaultActive = computed<string>(() => getSelectLeftMenuPath(routeItem.value));


      // 面包屑导航
      const breadCrumbs = computed<BreadcrumbType[]>(() => getBreadcrumbRoutes(routeItem.value, routeParentPaths.value, menuData));

      // 设置title
      useTitle(routeItem);


      return {
        collapsed: collapsed as unknown as boolean,
        toggleCollapsed,
        topNavEnable: topNavEnable as unknown as boolean,
        belongTopMenu: belongTopMenu as unknown as string,
        headFixed: headFixed as unknown as boolean,
        defaultActive: defaultActive as unknown as string,
        breadCrumbs: breadCrumbs as unknown as BreadcrumbType[],
        permissionMenuData: permissionMenuData as unknown as RoutesDataItem[],
        routeItem: routeItem as unknown as RoutesDataItem
      }


    }
  })
</script>
<style lang="scss" scoped>
  @import '../../assets/css/element-variables';

  $--header-height: 60px;
  .main-container {
    display: flex;
    flex-direction: row;
    flex: 1 1 auto;

    .content {
      display: flex;
      flex-direction: column;
      position: relative;
      overflow-x: inherit;
      min-height: 100vh;
      flex: 1 1 auto;

      .header {
        flex: 0 0 auto;
        height: $--header-height;
        min-height: $--header-height;
        max-height: $--header-height;
        width: 100%;
        background-color: $--color-primary;

        .left {
          padding: 10px 25px;
          height: 100%;

          img {
            height: 100%;
            width: auto;
          }
        }

        .right {
          text-align: right;
          height: 100%;
          line-height: $--header-height;

          p {
            position: fixed;
            right: 0;
            margin-bottom: 0;
            padding-right: 25px;
            height: $--header-height;
            width: 100%;
            font-size: 13px;
            color: #fff;

            span {
              cursor: pointer;

              &:hover {
                opacity: 0.7;
              }
            }
          }
        }
      }
    }
  }

  .el-container {
    min-height: calc(100vh - 60px);
    width: 100%;

    .el-main {
      padding: 0;
      display: flex;
      overflow: inherit;

      .el-main-container {
        position: relative;
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
        overflow-x: inherit;

        .el-main-content {
          padding: 10px;
        }
      }

    }
  }
</style>