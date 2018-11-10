<template>
	<div>
		Manage Store:
		{{orders}}
	</div>
</template>

<script>
import io from 'socket.io-client';

export default {
	name: 'ManageStore',
	data() {
		return {
			orders: []
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
