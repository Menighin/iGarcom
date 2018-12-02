<template>
	<div class="client-order-wrapper" :class="{ active: isFocused }">
		<div class="swipe-up" @click="isFocused = !isFocused">
			<i class="fa" :class="{'fa-chevron-up': !isFocused, 'fa-chevron-down': isFocused}" />
		</div>
		<div class="order-title">
			<h3>Seu Pedido</h3>
		</div>
		<div class="order-content-wrapper">
			<table class="order-content">
				<thead>
					<th>Nº</th>
					<th>Item</th>
					<th>Preço</th>
					<th> </th>
				</thead>
				<tbody>
					<tr v-for="(item, i) in orderItems" :key="`item-${i}`">
						<td>{{i + 1}}</td>
						<td>{{item.name}}</td>
						<td>{{item.price | price}}</td>
						<td>{{item.id}}</td>
					</tr>
					<tr>
						<td></td>
						<td>TOTAL</td>
						<td>{{orderItems.reduce((ac, el) => { return ac + el.price * el.quantity}, 0) | price}}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		order: {
			type: Object,
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
			Object.entries(this.order).map(([id, order]) => {
				for (let i = 0; i < order.quantity; i++)
					orderItems.push(order);
			});
			console.log(orderItems);
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

	.order-content-wrapper {
		padding: 5px 10px;

		.order-content {
			width: 100%;
			border-collapse: collapse;

			thead th {
				text-align: left;
				&:last-child {
					text-align: right;
				}
			}

			tr {
				&:last-child {
					font-weight: bold;
					border-top: 1px solid #777;

					td {
						padding-top: 5px;
					}
				}

				td {
					text-align: left;

					&:nth-child(3) {
						text-align: right;
						min-width: 80px;
					}

				}
			}

		}
	}
}

</style>
