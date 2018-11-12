import Vue from 'vue';
import Router from 'vue-router';
import MainMenu from '@/components/MainMenu'
import MenuDetail from '@/components/MenuDetail'
import ManageStore from '@/components/ManageStore'

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/store/:storeId/:table/',
			name: 'menu',
			component: MainMenu
		},
		{
			path: '/store/:storeId/:table/ordering/:optionId',
			name: 'ordering',
			component: MenuDetail,
			props: true
		},
		{
			path: '/store/:storeId/:table/ordering/:optionId/:step',
			name: 'orderingComplex',
			component: MenuDetail,
			props: true
		},
		{
			path: '/manage/:storeId',
			name: 'manage',
			component: ManageStore,
			props: true
		}
	]
})
