import Vue from 'vue';
import Router from 'vue-router';
import MainMenu from '@/components/MainMenu'
import MenuDetail from '@/components/MenuDetail'

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/:storeId/',
			name: 'menu',
			component: MainMenu
		},
		{
			path: '/:storeId/ordering/:optionId',
			name: 'ordering',
			component: MenuDetail,
			props: true
		}
	]
})
