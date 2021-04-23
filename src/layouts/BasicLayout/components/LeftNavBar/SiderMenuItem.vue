<template>
  <template v-if="!item.hidden">
    <template v-if="belongTopMenu !== topMenuPath && topNavEnable === true"></template>
    <template v-else>
      <template v-if="item.children && Array.isArray(item.children) && hasChildRoute(item.children)">
        <el-submenu :index="item.path" class="left-menu" popper-class="index-layout-left-menu-popper">
          <template #title>
            <!-- <Icon v-if="item.icon" :type="item.icon" class="icon" />-->
            <i v-if="item.icon" class="iconfont" :class="item.icon" />
            <span>{{ t(item.title) }}</span>
          </template>
          <sider-menu-item
              v-for="item2 in item.children"
              :key="item2.path"
              :routeItem="item2"
              :topNavEnable="topNavEnable"
              :belongTopMenu="belongTopMenu"
          />
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item :index="item.path" @click="handleClick(item)">
          <i v-if="item.icon" class="iconfont" :class="item.icon" />
          <template #title>{{ t(item.title) }}</template>
        </el-menu-item>
      </template>

    </template>
  </template>
</template>
<script lang="ts">
  import { defineComponent, PropType, toRefs, computed } from 'vue';
  import { useI18n } from "vue-i18n";
  import { RoutesDataItem, setRoutePathForParent, getRouteBelongTopMenu, hasChildRoute } from '@/utils/routes';

  // import ALink from '@/components/ALink/index.vue';

  interface SiderMenuItemSetupData {
    item: RoutesDataItem;
    topMenuPath: string;
    hasChildRoute: (children: RoutesDataItem[]) => boolean;
    t: Function;
  }

  export default defineComponent({
    name: 'SiderMenuItem',
    props: {
      routeItem: {
        type: Object as PropType<RoutesDataItem>,
        required: true
      },
      topNavEnable: {
        type: Boolean,
        default: true
      },
      belongTopMenu: {
        type: String,
        default: ''
      }
    },
    components: {
      // ALink,
    },
    setup(props): SiderMenuItemSetupData {

      const { routeItem } = toRefs(props);
      const { t } = useI18n();


      const topMenuPath = computed<string>(() => getRouteBelongTopMenu(routeItem.value as RoutesDataItem));

      return {
        item: routeItem as unknown as RoutesDataItem,
        topMenuPath: topMenuPath as unknown as string,
        hasChildRoute,
        t
      }

    },
    methods: {
      handleClick(item: RoutesDataItem) {
        this.$router.push({
          path: item.path
        })
      }
    }
  })
</script>

<style lang="scss">
  .left-menu {
    .iconfont {
      margin-right: 5px;
      font-size: 12px;
      color: #fff;
    }
  }
</style>