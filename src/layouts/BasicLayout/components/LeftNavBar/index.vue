<template>
  <div class="index-navbar" :class="{'narrow': collapsed}">
    <div class="index-navbar-content">
      <SiderMenu
          :collapsed="collapsed"
          :topNavEnable="topNavEnable"
          :belongTopMenu="belongTopMenu"
          :defaultActive="defaultActive"
          :menuData="menuData"
      />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from "vue";
  import { RoutesDataItem } from '@/utils/routes';
  import SiderMenu from './SiderMenu.vue';

  export default defineComponent({
    name: 'Left',
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
      defaultActive: {
        type: String,
        default: ''
      },
      menuData: {
        type: Array as PropType<RoutesDataItem[]>,
        default: () => {
          return [];
        }
      }
    },
    components: {
      SiderMenu,
    },
  })
</script>
<style lang="scss" scoped>
  @import '../../../../assets/css/global';

  .index-navbar {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: $--color-primary;
    color: #c0c4cc;
    transition-duration: 0.1s;

    .index-navbar-content {
      flex: 1;
      overflow: hidden auto;
      // height: calc(100vh);

      .left-scrollbar {
        width: 100%;
        height: 100%;
      }
    }

    &.narrow {
      width: $menu-collapsed-width;
    }

    @include scrollbar;

  }
</style>