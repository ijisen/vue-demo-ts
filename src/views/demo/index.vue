<template>
  <div class="index-layout-main-content">
    <el-card shadow="never" class="cus-card">
      <i class="el-icon-top" :style="{fontSize: '35px', color: '#FF0000'}"></i>
      {{ t('page.demo.msg') }}
    </el-card>
  </div>
</template>
<script lang="ts">
  /**
   * Theme Name: Demo 代码示例
   * Author: jisen
   * Description: A Mysitemyway Premium Wordpress Theme
   * Edit Time: 2020-01-09
   * @param {(Object|Array)} source
   * @returns {Object}
   * @returns {Array}
   **/
  import { defineComponent } from 'vue';
  import { useI18n } from 'vue-i18n';

  export default defineComponent({
    setup() {
      const { t } = useI18n();

      return {
        t,
      };
    },
  });
</script>
