<template>
	<div id="app">
		<h1>{{iGarcomData.store}}</h1>

		<router-view v-bind="{menus: iGarcomData.menu, order: order}" :key="$route.fullPath"></router-view>

		<br>
		<hr>
		{{orderSummary}}

		{{test}}
		<hr>
		{{complexOrder}}
	</div>
</template>

<script>
import iGarcomData from './projetosabor.js';
import MainMenu from './components/MainMenu';
import MenuDetail from './components/MenuDetail';
import { EventBus } from './EventBus';
import axios from 'axios';
import io from 'socket.io-client';

export default {
	name: 'App',
	components: {
		MainMenu,
		MenuDetail
	},
	data() {
		return {
			iGarcomData: iGarcomData,
			order: {},
			complexOrder: [],
			test: {}
		}
	},
	computed: {
		orderSummary() {
			return Object.values(this.order).filter(o => o.quantity > 0);
		}
	},
	mounted() {
		let self = this;
		EventBus.$on('complexStep', function(step, picked, stepModel) {
			if (Array.isArray(picked)) {
				let pickedChoices = picked.map(p => ({name: stepModel.options[p].name, price: stepModel.options[p].price}));
				self.complexOrder[step] = {
					name: stepModel.name,
					picked: pickedChoices
				}
			} else {
				let pickedChoice = {name: stepModel.options[picked].name, price: stepModel.options[picked].price};
				self.complexOrder[step] = {
					name: stepModel.name,
					picked: pickedChoice
				}
			}
		});

		EventBus.$on('complexFinish', function(id) {
			if (!self.order.hasOwnProperty(id)) self.order[id] = [];
			self.order[id].push(self.complexOrder);
		});
	},
	created() {
		axios.get('http://localhost:3000/json')
			.then(response => {
				this.test = response.data
			});

		const socket = io.connect('http://localhost:3000/customer-socket');
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
