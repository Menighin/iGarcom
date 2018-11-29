<template>
	<div class="client-order-wrapper" :class="{ active: isFocused }">
		<div class="swipe-up" @click="isFocused = !isFocused">
			<i class="fa" :class="{'fa-chevron-up': !isFocused, 'fa-chevron-down': isFocused}" />
		</div>
		<div class="order-title">
			<h3>Seu Pedido</h3>
		</div>
		<table class="order-content">
			<thead>
				<th>Nº</th>
				<th>Item</th>
				<th>Preço</th>
			</thead>
			<tbody>
				<tr v-for="(item, i) in orderItems" :key="`item-${i}`">
					<td>{{i + 1}}</td>
					<td>{{item.name}}</td>
					<td>{{item.price | price}}</td>
				</tr>
				<tr>
					<td></td>
					<td>TOTAL</td>
					<td>{{order.reduce((ac, el) => { return ac + el.price * el.quantity}, 0) | price}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	props: {
		order: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			isFocused: false
		}
	},
	computed: {
		orderItems() {
			let orderItems = [];
			this.order.map(o => {
				for (let i = 0; i < o.quantity; i++)
					orderItems.push(o);
			});
			return orderItems;
		}
	},
	filters: {
		price(price) {
			let [whole, decimal] = price.toFixed(2).toString().split('.');
			if (typeof decimal === 'undefined') decimal = '';
			return `R$ ${whole},${decimal.padEnd(2, '0')}`;
		}
	}
}
</script>

<style scoped lang="scss">

.client-order-wrapper {
	position: fixed;
	width: 100%;
	height: 80%;
	background: rgb(235, 212, 135);
	bottom: 0;
	left: 0;
	transition: all .3s;
	box-shadow: 0 -3px 6px rgba(0,0,0,0.16), 0 -3px 6px rgba(0,0,0,0.23);
	transform: translateY(calc(100% - 50px));

	&.active {
		transform: translateY(0);
		box-shadow: 0 -6px 10px rgba(0,0,0,0.16), 0 -6px 10px rgba(0,0,0,0.23);
	}

	.swipe-up {
		width: 100%;
		height: 20px;
		background: rgb(231, 193, 67);
		color: black;
	}

	.order-title {
		h3 {
			margin: 5px 0 0;
		}
	}
}

</style>
