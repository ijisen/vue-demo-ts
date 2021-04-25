<template>
  <el-dropdown class="pll prl" @command="onMenuClick">
    <a class="ant-dropdown-link" @click="e => e.preventDefault()">
      {{ currentUser.name }}
      <i class="el-icon-arrow-down el-icon--right"></i>
    </a>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="userinfo">
          {{ t('topMenu.userinfo') }}
        </el-dropdown-item>
        <el-dropdown-item command="logout">
          {{ t('topMenu.logout') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script lang="ts">
  /**
   ==============================================================
   * Theme Name: 顶部用户信息渲染组件
   * Author: jisen
   * Edit Time: 2021-04-25
   ============================================================== */
  import { computed, defineComponent } from "vue";
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  import { useI18n } from "vue-i18n";
  import { StateType as UserStateType, CurrentUser } from "@/store/user";

  interface RightTopUserSetupData {
    t: Function;
    currentUser: CurrentUser;
    onMenuClick: (event: any) => Promise<void>;
  }

  export default defineComponent({
    name: 'RightTopUser',
    setup(): RightTopUserSetupData {
      const store = useStore<{ user: UserStateType }>();
      const router = useRouter();
      const { t } = useI18n();


      // 获取当前登录用户信息
      const currentUser = computed<CurrentUser>(() => store.state.user.currentUser);

      // 点击菜单
      const onMenuClick = async (command: string) => {

        if(command === 'logout') {
          const res: boolean = await store.dispatch('user/logout');
          if(res) {
            router.replace({
              path: '/user/login',
              query: {
                redirect: router.currentRoute.value.path,
                ...router.currentRoute.value.query
              }
            })
          }
        }

      }

      return {
        t,
        currentUser: currentUser as unknown as CurrentUser,
        onMenuClick
      }
    }
  })
</script>

<style lang="scss">
  .ant-dropdown-link {
    color: #fff;

    &:hover {
      color: #fff;
      opacity: 0.85;
    }
  }
</style>