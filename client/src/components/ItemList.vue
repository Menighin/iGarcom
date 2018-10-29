<template>
	<ul class="item-list">
		<li class="item" v-for="(item, i) in model" :key="`item-${i}`">
			<div class="item-container">
				<div class="placeholder"></div>
				<div class="item-info">
					<h3 class="item-title">{{item.name}}</h3>
					<p class="item-description">{{item.description}}</p>
				</div>
				<span class="item-price">{{item.price}}</span>
				<div class="item-controls">
					<button @click="order[item.id].quantity--">-</button>
					{{order[item.id].quantity}}
					<button @click="order[item.id].quantity++">+</button>
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
		}
	},
	methods: {
	},
	created() {
		for (let item of this.model) {
			let id = item.id;
			if (typeof this.order[id] === 'undefined' || this.order[id] == null) {
				Vue.set(this.order, id, {
					name: item.name,
					price: item.price,
					quantity: 0
				});
			}
		}
	}
}
</script>

<style scoped>

li, ul {
	list-style: none;
	padding: 0;
}

.item {
	padding: 5px 0;
}

.item-container {
	text-align: left;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	background: greenyellow;
}

.placeholder {
	width: 96px;
	height: 96px;
	border: 1px solid #555;
}

.item-info {
	padding: 0 20px;
	background: royalblue;
}

.item-price {
	background: tomato;
	margin-left: auto;
}

.item-controls {
	padding-left: 10px;
}

</style>
