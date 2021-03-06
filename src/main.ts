import { createApp } from 'vue';

// 样式初始化
import 'normalize.css';

// 全局样式
import '@/assets/css/global.scss';
import '@/assets/iconfont/iconfont.css';
import '@/assets/css/custom/index.scss'

// 引入 ElementUI
import ElementPlus from 'element-plus';

import App from '@/App.vue';
import router from '@/router';
import store from '@/config/store';
import i18n, { elementPlusMessages } from '@/config/i18n';

const app = createApp(App)
app.use(store);
app.use(router)
app.use(ElementPlus, { size: 'small', locale: elementPlusMessages[i18n.global.locale.value] });
app.use(i18n);
app.mount('#app');
