<template>
  <div class="index-breadcrumb">
    <div class="content">
      <div class="flexible"
           @click="() => {toggleCollapsed && toggleCollapsed()}">
        <i class="el-icon-s-unfold"
           :title="t('tooltip.openMenu')"
           v-if="collapsed" />
        <i class="el-icon-s-fold"
           :title="t('tooltip.closeMenu')" v-else />
      </div>
      <div class="index-layout-top-menu">
        <BreadCrumbs class="breadcrumb" :list="breadCrumbs" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from "vue";
  import { useI18n } from "vue-i18n";
  import { BreadcrumbType, RoutesDataItem } from '@/utils/routes';
  import BreadCrumbs from './BreadCrumbsComponent.vue';

  interface RightTopSetupData {
    t: Function;
  }

  export default defineComponent({
    name: 'RightTop',
    components: {
      BreadCrumbs,
    },
    props: {
      collapsed: {
        type: Boolean,
        default: false
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

      return {
        t,
      }
    }
  })
</script>
<style lang="scss" scoped>
  @import '../../../../assets/css/global';
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