<template>
	<div id="app" v-if="iGarcomData != null">
		<h1>{{iGarcomData.store}}</h1>

		<router-view v-bind="{menus: iGarcomData.menu, order: order}" :key="$route.fullPath"></router-view>

		<br>
		<hr>
		{{orderSummary}}
		<hr>
		{{complexOrder}}
	</div>
</template>

<script>
import MainMenu from './components/MainMenu';
import MenuDetail from './components/MenuDetail';
import { EventBus } from './EventBus';
import axios from 'axios';
// import io from 'socket.io-client';

export default {
	name: 'App',
	components: {
		MainMenu,
		MenuDetail
	},
	data() {
		return {
			iGarcomData: null,
			order: {},
			complexOrder: []
		}
	},
	computed: {
		orderSummary() {
			return Object.values(this.order).filter(o => o.quantity > 0);
		}
	},
	watch: {
		'$route.params.storeId'(storeId) {
			this.init(storeId);
		}
	},
	methods: {
		init(storeId) {
			axios
				.get(`http://localhost:3000/stores/${storeId}/meta`)
				.then(response => {
					this.order = {};
					this.complexOrder = [];
					this.iGarcomData = response.data;
				})
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
		this.init(this.$route.params.storeId);
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
