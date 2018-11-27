<template>
	<ul class="item-list">
		<li class="item" v-for="(item, i) in model" :key="`item-${i}`">
			<div class="item-container" :style="`background: ${backgroundItem[i]}`">
				<div class="drag-left" :style="`left: calc(100% - ${dragLeft[i]}); ${transitionDrag[i]}; ${opacity[i]}; background: ${backgroundLeft[i]}`"></div>
				<div class="drag-right" :style="`right: calc(100% - ${dragRight[i]}); ${transitionDrag[i]}; ${opacity[i]}; background: ${backgroundRight[i]}`"></div>

				<div class="picture" @click="showModal(item)"><img src="http://localhost:3000/static/parm.jpg" /></div>
				<div class="item-info" v-hammer:pan.horizontal="(evt) => pan(i, evt)" v-hammer:panend="(evt) => panend(i, evt)" >
					<h3 class="item-title">{{item.name}}</h3>
					<div class="item-price">R$ {{item.price | price}}</div>
					<div class="quantity">{{order[item.id].quantity}}</div>
				</div>
			</div>
		</li>
	</ul>
</template>

<script>

import Vue from 'vue';
import { EventBus } from '../EventBus';
import ApplicationTheme from '@/ApplicationTheme';

export default {
	name: 'ItemList',
	props: {
		model: {
			type: Array,
			required: true
		},
		order: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			dragLeft: [],
			backgroundLeft: [],
			dragRight: [],
			backgroundRight: [],
			opacity: [],
			transitionDrag: [],
			backgroundItem: []
		}
	},
	filters: {
		price(price) {
			let [whole, decimal] = price.toString().split('.');
			if (typeof decimal === 'undefined') decimal = '';
			return `${whole},${decimal.padEnd(2, '0')}`;
		}
	},
	created() {
		for (const [i, item] of this.model.entries()) {
			let id = item.id;
			if (typeof this.order[id] === 'undefined' || this.order[id] == null) {
				Vue.set(this.order, id, {
					name: item.name,
					price: item.price,
					quantity: 0
				});
			}

			const quantity = this.order[item.id].quantity;

			this.dragLeft[i] = '0px';
			this.dragRight[i] = '0px';
			this.opacity[i] = 'opacity: 0.7';
			this.backgroundRight[i] = ApplicationTheme.secondaryColor;

			if (quantity === 0) {
				this.backgroundLeft[i] = ApplicationTheme.primaryColor;
				this.backgroundItem[i] = ApplicationTheme.backgroundHighlightColor;
			} else {
				this.backgroundLeft[i] = ApplicationTheme.primaryHighlightColor;
				this.backgroundItem[i] = ApplicationTheme.primaryColor;
			}
		}

		const self = this;
		EventBus.$on('itemQuantityChange', (item) => {
			const quantity = self.order[item.id].quantity;

			let i = 0;
			self.model.forEach((it, j) => {
				if (it.id === item.id)
					i = j;
			});

			if (quantity === 0) {
				self.backgroundLeft[i] = ApplicationTheme.primaryColor;
				self.backgroundItem[i] = ApplicationTheme.backgroundHighlightColor;
			} else {
				self.backgroundLeft[i] = ApplicationTheme.primaryHighlightColor;
				self.backgroundItem[i] = ApplicationTheme.primaryColor;
			}
		});
	},
	methods: {
		showModal(item) {
			EventBus.$emit('showModal', item);
		},
		pan(i, evt) {
			const quantity = this.order[this.model[i].id].quantity;

			if (evt.deltaX > 0 && quantity <= 0)
				evt.deltaX = 0;

			if (evt.deltaX > 0) {
				Vue.set(this.dragRight, i, `${evt.deltaX}px`);
				Vue.set(this.dragLeft, i, `0px`);
			} else {
				Vue.set(this.dragLeft, i, `${-evt.deltaX}px`);
				Vue.set(this.dragRight, i, `0px`);
			}
		},
		panend(i, evt) {
			let right = parseInt(this.dragRight[i]);
			let left = parseInt(this.dragLeft[i]);
			let px = right || left;

			Vue.set(this.transitionDrag, i, 'transition: all .5s');

			// Case user didn't drag enough to change quantity
			if (px <= 90) {
				Vue.set(this.dragLeft, i, `0px`);
				Vue.set(this.dragRight, i, `0px`);

				setTimeout(() => {
					Vue.set(this.transitionDrag, i, '');
				}, 500)

			// If the user dragged enough to change quantity
			} else {
				if (left !== 0) { Vue.set(this.dragLeft, i, `100%`); this.order[this.model[i].id].quantity++; }
				if (right !== 0) { Vue.set(this.dragRight, i, `100%`); this.order[this.model[i].id].quantity--; }

				setTimeout(() => {
					Vue.set(this.opacity, i, 'opacity: 0');
					this.setBackgroundItemColor(i, this.order[this.model[i].id].quantity);

					setTimeout(() => {
						Vue.set(this.transitionDrag, i, '');
						Vue.set(this.dragLeft, i, `0px`);
						Vue.set(this.dragRight, i, `0px`);
						Vue.set(this.opacity, i, 'opacity: 0.7');
					}, 500)
				}, 500)
			}
		},
		setBackgroundItemColor(i, quantity) {
			if (quantity > 0) {
				Vue.set(this.backgroundItem, i, ApplicationTheme.primaryColor);
				Vue.set(this.backgroundLeft, i, ApplicationTheme.primaryHighlightColor);
			} else if (quantity === 0) {
				Vue.set(this.backgroundItem, i, ApplicationTheme.backgroundHighlightColor);
				Vue.set(this.backgroundLeft, i, ApplicationTheme.primaryColor);
			}
		}
	}
}
</script>

<style lang="scss" scoped>

$q0: #eee;
$q1: rgb(212, 241, 143);
$q2: rgb(185, 218, 109);
$q3: rgb(163, 199, 78);

li, ul {
	list-style: none;
	padding: 0;
}

.item {
	padding: 5px 0;

    .plain-button {
        border: 0;
        background: none;
        font-size: 36px;
    }

	.item-container {
		position: relative;
		text-align: left;
		display: flex;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: stretch;

		padding: 5px 10px;
		overflow: hidden;
		transition: all .5s;

		.drag-left {
			position: absolute;
			top: 0;
			width: 100%;
			height: 100%;
			background-color: rgb(190, 228, 102);
		}

		.drag-right {
			position: absolute;
			top: 0;
			width: 100%;
			height: 100%;
			background-color: rgb(216, 90, 90);
		}

		.picture {
			align-items: center;
			display: flex;

			img {
				border: 1px solid #555;
				width: 96px;
				height: 96px;
			}
		}

		.item-info {
			padding: 0 0 0 10px;
			flex: 3;
			align-items: center;
			h3 {
				margin: 0;
				font-size: 14px;
			}
		}

		.item-price {
			vertical-align: middle;
			font-size: 28px;
		}

		.quantity {
			position: absolute;
			right: 0;
			bottom: -20px;
			font-size: 72px;
			font-weight: bold;
			color: white;
		}
	}
}

</style>
