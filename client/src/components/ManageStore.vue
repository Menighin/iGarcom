<template>
	<div>
		Manage Store:

		<div class="order" v-for="(o, i) in orders" :key="`id-${i}`">
			{{o.id}} - {{o.table}} - {{o.customer}}
			<button @click="confirm(o.id)">Confirmar</button>
		</div>

	</div>
</template>

<script>
import io from 'socket.io-client';
import axios from 'axios';

export default {
	name: 'ManageStore',
	data() {
		return {
			orders: []
		}
	},
	methods: {
		confirm(id) {
			const storeId = this.$route.params.storeId;
			axios
				.post(`http://localhost:3000/stores/${storeId}/confirm`, { id })
				.then(response => {
				});
		}
	},
	mounted() {
		const storeSocket = io('http://localhost:3000/store-socket');
		const self = this;

		storeSocket.on('orderReceived', order => {
			self.orders.push(order);
		});
	}
}
</script>

<style scoped>

</style>
