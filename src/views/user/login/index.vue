<template>
  <el-row>
    <el-col :span="12" class="text-rt">
      <img src="./icon_08.jpg" alt="icon">
    </el-col>
    <el-col :span="12">
      <el-form :model="modelRef"
               :rules="rulesRef"
               size="medium"
               ref="formRef">
        <h1 class="title">
          {{ t('page.user.login.form.title') }}
        </h1>
        <el-form-item label="" prop="username">
          <el-input v-model="modelRef.username"
                    :placeholder="t('page.user.login.form-item-username')"
                    @keydown.enter="handleSubmit">
            <template #prefix>
              <i class="el-icon-user el-input__icon" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input v-model="modelRef.password"
                    type="password"
                    :placeholder="t('page.user.login.form-item-password')"
                    @keydown.enter="handleSubmit">
            <template #prefix>
              <i class="el-icon-unlock el-input__icon" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="phone">
          <el-input v-model="modelRef.phone"
                    :placeholder="t('page.user.login.form-item-password')"
                    @keydown.enter="handleSubmit">
            <template #prefix>
              <i class="el-icon-phone-outline el-input__icon" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="captcha">
          <el-row>
            <el-col span="16">
              <el-input v-model="modelRef.captcha"
                        :placeholder="t('page.user.login.form-item-password')"
                        @keydown.enter="handleSubmit">
                <template #prefix>
                  <i class="icon-mail iconfont" />
                </template>
              </el-input>
            </el-col>
            <el-col span="8" class="pls">
              <el-button>动态密码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="mbl">
          <el-button type="primary"
                     class="submit mtl"
                     @click="handleSubmit"
                     :loading="submitLoading">
            {{ t('page.user.login.form.btn-submit') }}
          </el-button>
          <!--<div class="text-align-right">
            <router-link to="/user/register">
              {{ t('page.user.login.form.btn-jump') }}
            </router-link>
          </div>-->
        </el-form-item>

        <el-alert v-if="loginStatus === 'error' && !submitLoading" :title="t('page.user.login.form.login-error')"
                  type="error" show-icon :closable="false" />

      </el-form>
    </el-col>
  </el-row>
</template>
<script lang="ts">
  import { computed, defineComponent, reactive, ref, watch, Ref } from "vue";
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  import { useI18n } from "vue-i18n";
  import { ElForm, ElMessage } from 'element-plus';
  import { LoginParamsType } from './data.d';
  import { StateType as UserLoginStateType } from './store';

  interface UserLoginSetupData {
    t: Function;
    modelRef: LoginParamsType;
    rulesRef: any;
    formRef: typeof ElForm;
    submitLoading: boolean;
    handleSubmit: () => Promise<void>;
    loginStatus?: "ok" | "error";
  }

  export default defineComponent({
    name: 'UserLogin',
    components: {},
    setup(): UserLoginSetupData {
      const router = useRouter();
      const { currentRoute } = router;
      const store = useStore<{ userlogin: UserLoginStateType }>();
      const { t } = useI18n();


      // 表单值
      const modelRef = reactive<LoginParamsType>({
        username: '',
        password: ''
      });
      // 表单验证
      const rulesRef = reactive({
        username: [
          {
            required: true,
            message: t('page.user.login.form-item-username.required'),
          },
        ],
        password: [
          {
            required: true,
            message: t('page.user.login.form-item-password.required'),
          },
        ],
        phone: [
          {
            required: true,
            message: t('page.user.login.form-item-password.required'),
          },
        ],
        captcha: [
          {
            required: true,
            message: t('page.user.login.form-item-password.required'),
          },
        ],
      });
      // form
      const formRef = ref<typeof ElForm>();
      // 登录loading
      const submitLoading = ref<boolean>(false);
      // 登录
      const handleSubmit = async () => {
        submitLoading.value = true;
        try {
          const valid: boolean | undefined = await formRef.value?.validate();
          if(valid === true) {
            const res: boolean = await store.dispatch('userlogin/login', modelRef);
            if(res) {
              ElMessage.success(t('page.user.login.form.login-success'));
              const { redirect, ...query } = currentRoute.value.query;
              await router.replace({
                path: redirect as string || '/',
                query: {
                  ...query
                }
              });
            }
          }
        } catch (error) {
          // console.log(error);
          ElMessage.warning(t('app.global.form.validatefields.catch'));
        }
        submitLoading.value = false;
      }

      // 登录状态
      const loginStatus = computed<"ok" | "error" | undefined>(() => store.state.userlogin.loginStatus);


      return {
        t,
        modelRef,
        rulesRef,
        formRef: formRef as unknown as typeof ElForm,
        submitLoading: submitLoading as unknown as boolean,
        handleSubmit,
        loginStatus: loginStatus as unknown as "ok" | "error" | undefined
      }
    }
  })
</script>
<style lang="scss" scoped>
  .el-row {
    height: 100%;
    align-items: center;

    .el-col {
      &.text-rt {
        padding-right: 50px;
      }
    }

    .el-form {
      margin-left: 50px;
      padding: 20px 30px;
      display: inline-block;
      border: 1px solid #cadae2;
      border-radius: 2px;

      .title {
        margin-top: 0;
        margin-bottom: 20px;
        font-size: 18px;
        text-align: center;
      }

      .el-form-item {
        min-width: 270px;
      }

      .submit {
        width: 100%;
      }
    }
  }

</style>