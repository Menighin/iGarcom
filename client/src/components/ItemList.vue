<template>
	<ul class="item-list">
		<li class="item" v-for="(item, i) in model" :key="`item-${i}`">
			<div class="item-container">
				<div class="drag-left" :style="`left: calc(100% - ${dragLeft[i]}); ${transitionDrag}`"></div>
				<div class="drag-right" :style="`right: calc(100% - ${dragRight[i]}); ${transitionDrag}`"></div>
				<div class="picture"><img src="http://localhost:3000/static/parm.jpg" /></div>
				<div class="item-info" v-hammer:pan.horizontal="(evt) => pan(i, evt)" v-hammer:panend="(evt) => panend(i, evt)" >
					<h3 class="item-title">{{item.name}}</h3>
					<div class="item-price">R$ {{item.price | price}}</div>
					<!-- <div class="item-controls">
						<button class="plain-button" @click="order[item.id].quantity--"><i class="fa fa-minus-circle" /></button> -->
						{{order[item.id].quantity}}
						<!-- <button class="plain-button" @click="order[item.id].quantity++"><i class="fa fa-plus-circle" /></button>
					</div> -->
				</div>
			</div>
		</li>
	</ul>
</template>

<script>

import Vue from 'vue';

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
			dragRight: [],
			transitionDrag: ''
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

			this.dragLeft[i] = '0px';
			this.dragRight[i] = '0px';
		}
	},
	methods: {
		pan(i, evt) {
			const quantity = this.order[this.model[i].id].quantity;

			// if (evt.deltaX > 0 && quantity <= 0)
			// 	evt.deltaX = 0;

			if (evt.deltaX > 0) {
				Vue.set(this.dragRight, i, `${evt.deltaX}px`);
				Vue.set(this.dragLeft, i, `0px`);
			} else {
				Vue.set(this.dragLeft, i, `${-evt.deltaX}px`);
				Vue.set(this.dragRight, i, `0px`);
			}

		},
		panend(i, evt) {
			const quantity = this.order[this.model[i].id].quantity;
			let right = parseInt(this.dragRight[i]);
			let left = parseInt(this.dragLeft[i]);
			let px = right || left;

			this.transitionDrag = 'transition: all .5s';
			if (px <= 90) {
				Vue.set(this.dragLeft, i, `0px`);
				Vue.set(this.dragRight, i, `0px`);
			} else {
				if (left != 0) Vue.set(this.dragLeft, i, `100%`);
				if (right != 0) Vue.set(this.dragRight, i, `100%`);
			}

			setTimeout(() => {
				this.transitionDrag = '';
			}, 500)

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
		background-color: #eee;

		.drag-left {
			position: absolute;
			top: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 255, 0, 0.5);
		}

		.drag-right {
			position: absolute;
			top: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(255, 0, 0, 0.5);
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

		.item-controls {
			vertical-align: middle;
			font-size: 18px;
			font-weight: bold;
			text-align: center;
			button {
				vertical-align: middle;
			}
		}

		.item-price {
			vertical-align: middle;
			font-size: 28px;
		}
	}
}

</style>
