<template>
	<ul class="item-list">
		<li class="item" v-for="(item, i) in model" :key="`item-${i}`">
			<div class="item-container">
				<div class="placeholder"></div>
				<div class="item-info">
					<h3 class="item-title">{{item.name}} <i class="fa fa-info-circle"></i></h3>
				</div>
				<span class="item-price">R${{item.price}}</span>
				<div class="item-controls">
					<button class="plain-button" @click="order[item.id].quantity--"><i class="fa fa-minus-circle" /></button>
					{{order[item.id].quantity}}
					<button class="plain-button" @click="order[item.id].quantity++"><i class="fa fa-plus-circle" /></button>
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

<style lang="scss" scoped>

li, ul {
	list-style: none;
	padding: 0;
}

.item {
	padding: 5px 0;

    .plain-button {
        border: 0;
        background: none;
        font-size: 24px;
    }

    .item-container {
        text-align: left;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;

        .placeholder {
            width: 96px;
            height: 96px;
            border: 1px solid #555;
        }

        .item-info {
            padding: 0 20px;
            max-width: 200px;
        }

        .item-price {
            margin-left: auto;
        }

        .item-controls {
            padding-left: 10px;
        }
    }
}

</style>
