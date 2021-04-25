<template>
  <el-header>
    <el-row>
      <!-- 左侧logo + 标题 -->
      <el-col :span="18" class="header-left">
        <div class="logo-box">
          <img src="../../../assets/images/logo.png" alt="logo">
        </div>
        <i class="hr" />
        <span class="title">{{ title }}</span>
      </el-col>
      <!-- 右侧内容 -->
      <el-col :span="6" class="header-right">
        <div class="header-right-content" :style="{top: `${top}px`}">
          {{ top }}
          <slot name="userInfo"></slot>
          <SelectLang />
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>

<script lang="ts">
  /**
   ==============================================================
   * Theme Name: LayoutHeader 顶部导航样式渲染组件
   * Author: jisen
   * Edit Time: 2021-04-25
   ============================================================== */
  import {
    defineComponent,
    onMounted,
    onUnmounted,
    ref,
  } from "vue";
  import settings from '@/config/settings';
  import SelectLang from './SelectLang/index.vue';

  interface SetupData {
    title: string;
    top: number;
  }

  export default defineComponent({
    name: 'LayoutHeader',
    components: {
      SelectLang,
    },
    setup(): SetupData {
      const top = ref<number>(22);
      /* 监听滚动条变化， 设置顶部内容右侧内容展示位置 */
      const bindHandleScroll = (event: any) => {
        // 滚动的高度
        const scrollTop = (event.srcElement ? event.srcElement.documentElement.scrollTop : false)
            || window.pageYOffset
            || (event.srcElement ? event.srcElement.body.scrollTop : 0);
        if(scrollTop < 60) {
          top.value = 22 - scrollTop
          // console.log(111111111)
        } else {
          console.log(top)
        }
      }
      onMounted(() => {
        window.addEventListener('scroll', bindHandleScroll)
      })
      onUnmounted(() => {
        window.removeEventListener('scroll', bindHandleScroll)
      })

      return {
        title: settings.siteTitle,
        top: top as unknown as number
      }
    },
  })
</script>

<style lang="scss" scoped>
  @import '../../../assets/css/element-variables';
  /** 头部样式 */
  .el-header {
    padding-top: 12px !important;
    padding-bottom: 12px !important;
    height: 60px;
    width: 100%;
    background-color: $--theme-color;

    .el-row,
    .el-col {
      height: 100%;
      font-size: 0;
      vertical-align: middle;
    }

    .header-left {
      .logo-box {
        display: inline-block;
        width: 164px;
        height: 100%;
        text-align: center;

        img {
          height: 100%;
          width: auto;
          max-width: 200px;
          vertical-align: middle;
        }
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

    /* 右侧内容展示样式 */
    .header-right {
      position: relative;
      display: flex;
      text-align: right;
      align-items: center;
      justify-content: flex-end;

      .header-right-content {
        position: fixed;
        right: 15px;
      }
    }

  }
</style>