// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router';
import { VueHammer } from 'vue2-hammer';

Vue.config.productionTip = false;

VueHammer.config.pan = {
	touchAction: 'auto',
	direction: 6
};

Vue.use(VueHammer);

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>'
})
