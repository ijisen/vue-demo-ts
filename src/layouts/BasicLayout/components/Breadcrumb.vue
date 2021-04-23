<template>
  <div class="index-breadcrumb">
    <div class="content">
      <div class="flexible"
           @click="() => {toggleCollapsed && toggleCollapsed();}">
        <i class="el-icon-s-unfold"
           v-if="collapsed" title="展开菜单" />
        <i class="el-icon-s-fold" title="收起菜单" v-else />
      </div>
      <div class="index-layout-top-menu">
        <div ref="topMenuCon" :style="{width: topMenuWidth}">
          <template v-if="topNavEnable">
            <template v-for="(item, key) in menuData">
              <a-link
                  :key="key"
                  v-if="!item.hidden"
                  :to="item.path"
                  :class="{'active': belongTopMenu === item.path }"
                  class="index-layout-top-menu-li"
              >
                {{ t(item.title) }}
              </a-link>
            </template>
          </template>
          <BreadCrumbs v-else class="breadcrumb" :list="breadCrumbs" />
        </div>
      </div>
      <!--<div class="index-layout-top-menu-right">

        <right-top-message />

        <right-top-user />

        <select-lang class="index-layout-top-selectlang" />

      </div>-->
    </div>
    <div v-if="topNavEnable" class="index-layout-right-top-bot">
      <div class="index-layout-right-top-bot-home">
        <i class="el-icon-s-home"></i>
      </div>
      <BreadCrumbs class="breadcrumb" :list="breadCrumbs"></BreadCrumbs>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, PropType, Ref, toRefs } from "vue";
  import { useI18n } from "vue-i18n";
  import { BreadcrumbType, RoutesDataItem } from '@/utils/routes';
  import BreadCrumbs from '@/components/BreadCrumbs/index.vue';
  // import SelectLang from '@/components/SelectLang/index.vue';
  import ALink from '@/components/ALink/index.vue';
  // import RightTopMessage from './RightTopMessage.vue';
  // import RightTopUser from './RightTopUser.vue';
  import useTopMenuWidth from "../composables/useTopMenuWidth";

  interface RightTopSetupData {
    t: Function;
    topMenuCon: Ref;
    topMenuWidth: Ref;
  }

  export default defineComponent({
    name: 'RightTop',
    components: {
      ALink,
      BreadCrumbs,
      // RightTopMessage,
      // RightTopUser,
      // SelectLang,
    },
    props: {
      collapsed: {
        type: Boolean,
        default: false
      },
      topNavEnable: {
        type: Boolean,
        default: true
      },
      belongTopMenu: {
        type: String,
        default: ''
      },
      toggleCollapsed: {
        type: Function as PropType<() => void>
      },
      breadCrumbs: {
        type: Array as PropType<BreadcrumbType[]>,
        default: () => {
          return [];
        }
      },
      menuData: {
        type: Array as PropType<RoutesDataItem[]>,
        default: () => {
          return [];
        }
      }
    },
    setup(props): RightTopSetupData {
      const { t } = useI18n();
      const { topNavEnable } = toRefs(props);

      const { topMenuCon, topMenuWidth } = useTopMenuWidth(topNavEnable);

      return {
        t,
        topMenuCon,
        topMenuWidth
      }
    }
  })
</script>
<style lang="scss" scoped>
  @import '../../../assets/css/global.scss';
  //$headerBreadcrumbHeight
  .index-breadcrumb {
    padding: 10px 10px 0;
    width: 100%;
    height: 40px;
    box-sizing: border-box;

    .content {
      display: flex;
      width: 100%;
      height: 100%;
      background-color: transparent;
      color: #666;

      .flexible {
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: left;
        cursor: pointer;

        :hover {
          color: $--color-primary;
        }
      }

      .index-layout-top-menu {
        height: 100%;
        line-height: 30px;
        flex: 1;
        /* display: flex; */
        overflow: hidden;
        overflow-x: auto;

        .breadcrumb {
          line-height: 30px;
        }
      }

      @include scrollbar;

    }
  }
</style>