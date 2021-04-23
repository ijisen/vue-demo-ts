<template>
  <el-header>
    <el-row>
      <!-- 左侧logo + 标题 -->
      <el-col :span="18" class="header-left">
        <div class="logo-box">
          <img src="../../assets/images/logo.png" alt="logo">
        </div>
        <i class="hr" />
        <span class="title">企业数字资产管理平台</span>
      </el-col>
      <!-- 右侧内容 -->
      <el-col :span="6" class="header-right">
        <slot name="userInfo"></slot>
        <SelectLang />
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
  import { defineComponent } from "vue";
  import SelectLang from '@/components/SelectLang/index.vue';

  export default defineComponent({
    name: 'LayoutHeader',
    components: {
      SelectLang,
    },
  })
</script>

<style lang="scss" scoped>
  @import '../../assets/css/element-variables.scss';
  /** 头部样式 */
  .el-header {
    padding-top: 12px !important;
    padding-bottom: 12px !important;
    height: 60px;
    width: 100%;
    background-color: $--color-primary;

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

    .header-right {
      text-align: right;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

  }
</style>