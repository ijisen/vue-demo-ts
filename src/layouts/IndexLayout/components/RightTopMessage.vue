<template>
    <router-link to="/" class="index-layout-top-message">
      <i class="el-icon-bell" :style="{ fontSize: '16px' }"></i>
      <el-badge
        class="index-layout-top-message-badge"
        :value="message"
        type="danger"
      />
    </router-link>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import { StateType as UserStateType } from "@/store/user";

interface RightTopMessageSetupData {
    message: number;
}

export default defineComponent({
    name: 'RightTopMessage',
    setup(): RightTopMessageSetupData {

        const store = useStore<{user: UserStateType}>();
        
        const message = computed<number>(()=> store.state.user.message);


        onMounted(()=>{
            store.dispatch("user/fetchMessage");
        })


        return {
            message: message as unknown as number
        }
    }
})
</script>
<style lang="scss" scoped>
@import '../../../assets/css/global.scss';
.index-layout-top-message {
    height: $headerHeight;
    line-height: $headerHeight;
    /* display: inline-block; */
    display: inline;
    color: #c0c4cc;
    .index-layout-top-message-badge {
        margin-left: -5px;
        margin-top: -20px;
        ::v-deep(.el-badge__content) {
            border: 0;
        }
    }
}
</style>