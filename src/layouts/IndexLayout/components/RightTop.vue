<template>
    <div id="index-layout-right-top" :class="{'topNavEnable': !topNavEnable }">
        <div class="index-layout-right-top-top">
            <div class="index-layout-flexible"
              @click="() => {
                if(toggleCollapsed) {
                  toggleCollapsed();
                }
              }"
            >
               <i class="el-icon-s-unfold" v-if="collapsed"></i>
               <i class="el-icon-s-fold" v-else></i>
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
                        {{t(item.title)}}
                        </a-link>
                      </template>
                    </template>             
                    <bread-crumbs v-else class="breadcrumb" :list="breadCrumbs"></bread-crumbs>
                </div>
            </div>
            <div class="index-layout-top-menu-right">

                <right-top-message />

                <right-top-user />

                <select-lang class="index-layout-top-selectlang" />

            </div>
        </div>
        <div v-if="topNavEnable" class="index-layout-right-top-bot">
            <div class="index-layout-right-top-bot-home">
              <i class="el-icon-s-home"></i>
            </div>
            <bread-crumbs class="breadcrumb" :list="breadCrumbs"></bread-crumbs>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType, Ref, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import { BreadcrumbType, RoutesDataItem } from '@/utils/routes';
import BreadCrumbs from '@/components/BreadCrumbs/index.vue';
import SelectLang from '@/components/SelectLang/index.vue';
import ALink from '@/components/ALink/index.vue';
import RightTopMessage from './RightTopMessage.vue';
import RightTopUser from './RightTopUser.vue';
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
      RightTopMessage,
      RightTopUser,
      SelectLang,
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
<style lang="scss">
@import '../../../assets/css/global.scss';
#index-layout-right-top {
  width: 100%;
  height: ($headerHeight + $headerBreadcrumbHeight);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  z-index: 9;
  .index-layout-right-top-top {
    display: flex;
    width: 100%;
    height: $headerHeight;
    background-color: $menu-dark-bg;
    color: #c0c4cc;
    .index-layout-flexible {
      width: $headerHeight;
      height: $headerHeight;
      line-height: $headerHeight;
      text-align: center;
      cursor: pointer;
      &:hover {
        background-color: $menu-dark-submenu-bg;
        color: $menu-dark-highlight-color;
      }
    }

    .index-layout-top-menu {
      height: $headerHeight;
      line-height: $headerHeight;
      flex: 1;
      /* display: flex; */
      overflow: hidden;
      overflow-x: auto;
      .index-layout-top-menu-li {
        display: inline-block;
        padding: 0 15px;
        height: ($headerHeight - 3);
        text-decoration: none;
        color: #c0c4cc;
        font-size: 15px;
        border-bottom: solid 3px transparent;
        &:hover,
        &.active {
          background-color: $menu-dark-submenu-bg;
          color: $menu-dark-highlight-color;
          border-bottom-color: $--color-primary;
        }
      }

      .breadcrumb {
        line-height: $headerHeight;
      }
    }

    .index-layout-top-menu-right {
      width: 150px;
      .index-layout-top-usermenu {
        padding-left: 10px;
        color: #c0c4cc;
      }
      .index-layout-top-selectlang {
        padding-left: 10px;
        .dropDown {
          i {
            font-size: 16px;
            color: #c0c4cc;
          }
        }
      }
    }

    @include scrollbar;

  }
  .index-layout-right-top-bot {
    display: flex;
    width: 100%;
    height: $headerBreadcrumbHeight;
    background-color: $mainBgColor;
    .index-layout-right-top-bot-home {
      width: $headerBreadcrumbHeight;
      height: $headerBreadcrumbHeight;
      line-height: $headerBreadcrumbHeight;
      text-align: center;
    }
    .breadcrumb {
      line-height: $headerBreadcrumbHeight;
      margin-left: 10px;
    }
  }
  &.topNavEnable {
    height: $headerHeight;
    .index-layout-right-top-top {
      background-color: #ffffff;
      color: $--color-text-primary;
      .index-layout-flexible {
        &:hover {
          background-color: $mainBgColor;
          color: $heading-color;
        }
      }
      .index-layout-top-menu-right {
        .index-layout-top-message {
          color: $heading-color;
        }
        .index-layout-top-usermenu {
          color: $heading-color;
        }
        .index-layout-top-selectlang {
          .dropDown {
            i {
              color: $heading-color;
            }
          }
        }
      }
    }
  }
}
</style>