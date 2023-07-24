import { createApp } from 'vue';

import { createPinia } from 'pinia';

import { IonicVue } from '@ionic/vue';

import App from './App.vue';

import router from './router';

import axios from './plugins/axios';

import 'core';

import BaseView from './core/BaseView.vue';
import BaseViewPage from './core/BaseViewPage.vue';
import piniaPersist from 'pinia-plugin-persist'
import MenuTabs from './components/MenuTabs.vue'

const pinia = createPinia()
pinia.use(piniaPersist)

const app = createApp(App)
	.use(pinia)
	.use(IonicVue)
	.use(router);

app.component('BaseView', BaseView);
app.component('BaseViewPage', BaseViewPage);
app.component('MenuTabs', MenuTabs);

router.isReady().then(() => {
	app.config.globalProperties.$baseURL = axios.defaults.baseURL;
	app.mount('#app');
});
