<template>
	<div id="storeApp" v-if="iGarcomData != null" :style="`background: ${appBackground}`">

		<item-detail-modal v-if="showModal" :item="itemModal" :order="order" @close="showModal = false" />

		<splash-screen v-if="loadingStore" />

		<div class="store-container" v-if="!loadingStore">
			<h1>{{iGarcomData.store}}</h1>

			<div v-if="isStore">
				<router-view v-bind="{menus: iGarcomData.menu, order: order}" :key="$route.fullPath"></router-view>

				<br>
				<hr>
				{{orderSummary}}
				<hr>
				{{complexOrder}}
				<hr>
				<button @click="finishOrder" :disabled="orderSummary.length == 0">Pedir</button>
			</div>

			<div v-if="isManage">
				<router-view :key="$route.fullPath"></router-view>
			</div>

			<client-order :order="order" />
		</div>
	</div>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css';
import SplashScreen from '@/components/SplashScreen';
import MainMenu from './components/MainMenu';
import MenuDetail from './components/MenuDetail';
import ItemDetailModal from './components/ItemDetailModal';
import { EventBus } from './EventBus';
import axios from 'axios';
import ApplicationTheme from './ApplicationTheme';
import ClientOrder from '@/components/ClientOrder';

export default {
	name: 'App',
	components: {
		MainMenu,
		MenuDetail,
		ItemDetailModal,
		SplashScreen,
		ClientOrder
	},
	data() {
		return {
			iGarcomData: null,
			order: {},
			complexOrder: [],
			isStore: false,
			isManage: false,
			showModal: false,
			itemModal: {},
			loadingStore: true,
			appBackground: '#FFF'
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
					ApplicationTheme.build(response.data);
					this.loadingStore = false;

					this.appBackground = ApplicationTheme.backgroundColor;
				});
		},
		finishOrder() {
			const self = this;
			const storeId = this.$route.params.storeId;
			const table = this.$route.params.table;

			axios
				.post(`http://localhost:3000/stores/${storeId}/order`, {items: this.orderSummary, table: table})
				.then(response => {
					self.init(storeId);
				});
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

		EventBus.$on('showModal', function(item) {
			self.showModal = true;
			self.itemModal = item;
		});

		EventBus.$on('routerBack', function(next) {
			if (self.showModal) {
				self.showModal = false;
				next(false);
			} else
				next();
		});
	},
	created() {
		this.init(this.$route.params.storeId);

		this.isStore = this.$route.path.startsWith('/store');
		this.isManage = this.$route.path.startsWith('/manage');
	}
}
</script>

<style>

@import 'assets/scss/fonts.scss';

#storeApp {
	font-family: RobotoLight; /*Helvetica, Arial, sans-serif;*/
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	box-sizing: border-box;
	padding: 40px 10px;

	width: 100%;
	height: 100%;
	overflow: auto;
}

.store-container {
	width: 100%;
	height: 100%;
}
</style>
