<template>
	<div id="app">
		<h1>{{iGarcomData.store}}</h1>

		<router-view v-bind="{menus: iGarcomData.menu, order: order}"></router-view>

		<br>
		<hr>
		{{orderSummary}}
	</div>
</template>

<script>
import iGarcomData from './projetosabor.js';
import MainMenu from './components/MainMenu';
import MenuDetail from './components/MenuDetail';

export default {
	name: 'App',
	components: {
		MainMenu,
		MenuDetail
	},
	data() {
		return {
			iGarcomData: iGarcomData,
			order: {}
		}
	},
	computed: {
		orderSummary() {
			return Object.values(this.order).filter(o => o.quantity > 0);
		}
	}
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
