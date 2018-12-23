<template>
	<div class="client-order-wrapper" :class="{ active: isFocused }">

		<confirmation-modal
			v-if="requestConfirmation"
			@cancel="requestConfirmation = false"
			@confirm="confirmDelete" >

			Deseja excluir <strong>{{focusedItem.name}}</strong> do seu pedido?

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
						<td><i class="fa fa-trash" @click="removeItem(item)"></i></td>
					</tr>
					<tr>
						<td></td>
						<td>TOTAL</td>
						<td>{{ totalPrice | price}}</td>
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
		removeItem(item) {
			console.log(item);
			this.requestConfirmation = true;
			this.focusedItem = item;
		},
		confirmDelete() {
			if (this.focusedItem.type === 'simple')
				this.order[this.focusedItem.id].quantity--;
			else
				this.order[this.focusedItem.id].splice(this.focusedItem.complexIndex, 1);

			this.requestConfirmation = false;
			console.log(this.order);
		}
	},
	computed: {
		orderItems() {
			let orderItems = [];
			Object.entries(this.order).map(([id, order]) => {
				if (Array.isArray(order)) {
					order.forEach((c, i) => {
						let price = 0.0;
						let subItems = [];
						for (let step of c) {
							subItems.push({
								name: step.name,
								picked: step.picked.map(p => p.name).join(', ')
							});
							price += step.picked.reduce((res, value) => {
								return typeof value.price !== 'undefined' ? res + value.price : res
							}, 0);
						}
						orderItems.push({
							id,
							name: id,
							subItems,
							price,
							complexIndex: i,
							type: 'complex'
						});
					});
				} else {
					for (let i = 0; i < order.quantity; i++) {
						orderItems.push({
							id,
							name: order.name,
							price: order.price,
							type: 'simple'
						});
					}
				}
			});
			return orderItems;
		},
		totalPrice() {
			return this.orderItems.reduce((ac, el) => {
				return ac + el.price;
			}, 0)
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
	z-index: 9999;
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
