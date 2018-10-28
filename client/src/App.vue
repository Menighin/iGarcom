<template>
	<div id="app">
		<h1>{{iGarcomData.store}}</h1>
		<MainMenu v-if="isInMenu" :menus="iGarcomData.menu" @click="menuClick" />
		<MenuDetail v-if="!isInMenu" :menu="selectedMenu" :order="order" />

		<br>
		<hr>
		{{order}}
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
			isInMenu: true,
			selectedMenu: null,
			order: {}
		}
	},
	methods: {
		menuClick(id) {
			let menu = iGarcomData.menu.filter(m => m.id === id)[0];
			this.selectedMenu = menu;
			this.isInMenu = false;
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
