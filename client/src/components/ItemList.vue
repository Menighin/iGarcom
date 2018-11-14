<template>
	<ul class="item-list">
		<li class="item" v-for="(item, i) in model" :key="`item-${i}`">
			<div class="item-container">
				<div class="placeholder"><img src="http://localhost:3000/static/parm.jpg" /></div>
				<div class="item-info">
					<h3 class="item-title">{{item.name}} <i class="fa fa-info-circle"></i></h3>
				</div>
				<div class="pull-right">
					<div class="item-controls">
						<button class="plain-button" @click="order[item.id].quantity--"><i class="fa fa-minus-circle" /></button>
						{{order[item.id].quantity}}
						<button class="plain-button" @click="order[item.id].quantity++"><i class="fa fa-plus-circle" /></button>
					</div>
					<span class="item-price">R$ {{item.price | price}}</span>
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
	filters: {
		price(price) {
			let [whole, decimal] = price.toString().split('.');
			if (typeof decimal === 'undefined') decimal = '';
			return `${whole},${decimal.padEnd(2, '0')}`;
		}
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
        font-size: 36px;
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

            img {
                width: 96px;
                height: 96px;
            }
        }

        .item-info {
            padding: 0 20px;
            max-width: 200px;

            i {
                color: #ccc;
            }

        }

		.pull-right {
			margin-left: auto;
			width: 300px;

			.item-controls {
				display: inline;
				vertical-align: middle;
				font-size: 18px;
				font-weight: bold;
				button {
					vertical-align: middle;
				}
			}

			.item-price {
				vertical-align: middle;
				padding-left: 10px;
				font-size: 36px;
			}
		}
    }
}

</style>
