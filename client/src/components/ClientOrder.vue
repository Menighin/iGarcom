<template>
	<div class="client-order-wrapper" :class="{ active: isFocused }">

		<confirmation-modal
			v-if="requestConfirmation"
			@cancel="requestConfirmation = false"
			@confirm="confirmDelete" >

			Deseja excluir <strong>{{order[focusedItem].name}}</strong> do seu pedido?

		</confirmation-modal>

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
						<td><i class="fa fa-trash" @click="removeItem(item.id)"></i></td>
					</tr>
					<tr>
						<td></td>
						<td>TOTAL</td>
						<td>{{Object.values(order).reduce((ac, el) => { return ac + el.price * el.quantity}, 0) | price}}</td>
						<td></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>

import ConfirmationModal from './ConfirmationModal'

export default {
	components: {
		ConfirmationModal
	},
	props: {
		order: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			isFocused: false,
			requestConfirmation: false,
			focusedItem: null
		}
	},
	methods: {
		removeItem(id) {
			this.requestConfirmation = true;
			this.focusedItem = id;
			this.modalMsg = `Deseja excluir ${this.order[id].name} do seu pedido?`
		},
		confirmDelete() {
			this.order[this.focusedItem].quantity--;
			this.requestConfirmation = false;
		}
	},
	computed: {
		orderItems() {
			let orderItems = [];
			Object.entries(this.order).map(([id, order]) => {
				for (let i = 0; i < order.quantity; i++) {
					orderItems.push({
						id,
						name: order.name,
						price: order.price
					});
				}
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
		transform: none;
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
				&:nth-child(3) {
					text-align: right;
				}
			}

			tr {
				line-height: 22px;

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

					&:last-child {
						text-align: center;
						padding: 0 0 0 10px;
					}

				}
			}

		}
	}
}

</style>
