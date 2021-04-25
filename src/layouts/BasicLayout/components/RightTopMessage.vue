<template>
  <router-link to="/" class="layout-top-message">
    <i class="el-icon-bell" :style="{ fontSize: '16px' }"></i>
    <el-badge
        class="layout-top-message-badge"
        :value="message"
        type="danger"
    />
  </router-link>
</template>
<script lang="ts">
  /**
   ==============================================================
   * Theme Name: 顶部消息消息渲染组件
   * Author: jisen
   * Edit Time: 2021-04-25
   ============================================================== */
  import { computed, defineComponent, onMounted } from "vue";
  import { useStore } from "vuex";
  import { StateType as UserStateType } from "@/store/userInfo";

  interface RightTopMessageSetupData {
    message: number;
  }

  export default defineComponent({
    name: 'RightTopMessage',
    setup(): RightTopMessageSetupData {

      const store = useStore<{ userInfo: UserStateType }>();

      const message = computed<number>(() => store.state.userInfo.message);


      onMounted(() => {
        store.dispatch("userInfo/fetchMessage");
      })


      return {
        message: message as unknown as number
      }
    }
  })
</script>
<style lang="scss" scoped>
  @import '../../../assets/css/global.scss';

  .layout-top-message {
    //height: $headerHeight;
    //line-height: $headerHeight;
    /* display: inline-block; */
    display: inline;
    color: #c0c4cc;

    .layout-top-message-badge {
      margin-left: -5px;
      margin-top: -20px;

      ::v-deep(.el-badge__content) {
        border: 0;
      }
    }
  }
</style>