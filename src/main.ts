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
import LoadingCard from './components/LoadingCard.vue'
import LoadingBar from './components/LoadingBar.vue'
import Card from './components/Card.vue'

const pinia = createPinia()
pinia.use(piniaPersist)

const app = createApp(App)
	.use(pinia)
	.use(IonicVue)
	.use(router);

app.component('BaseView', BaseView);
app.component('BaseViewPage', BaseViewPage);
app.component('LoadingCard', LoadingCard);
app.component('LoadingBar', LoadingBar);
app.component('MenuTabs', MenuTabs);
app.component('Card', Card);

router.isReady().then(() => {
	app.config.globalProperties.$baseURL = axios.defaults.baseURL;
	app.mount('#app');
});
