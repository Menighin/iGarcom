<template>
	<ul class="item-list">
		<li class="item" v-for="(item, i) in model" :key="`item-${i}`">
			<div class="item-container" :style="`background-position: ${bgPos[i]} 0; ${bgTransition[i]}`">
				<div class="picture"><img src="http://localhost:3000/static/parm.jpg" /></div>
				<div class="item-info" v-hammer:pan.horizontal="(evt) => pan(i, evt)" v-hammer:panend="(evt) => panend(i, evt)" >
					<h3 class="item-title">{{item.name}}</h3>
					<div class="item-price">R$ {{item.price | price}}</div>
					<!-- <div class="item-controls">
						<button class="plain-button" @click="order[item.id].quantity--"><i class="fa fa-minus-circle" /></button>
						{{order[item.id].quantity}}
						<button class="plain-button" @click="order[item.id].quantity++"><i class="fa fa-plus-circle" /></button>
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
			bgPos: [],
			bgTransition: []
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
	},
	methods: {
		pan(i, evt) {
			Vue.set(this.bgTransition, i, ``);
			Vue.set(this.bgPos, i, `${evt.deltaX}px`);
		},
		panend(i, evt) {
			let px = parseInt(this.bgPos[i]);
			Vue.set(this.bgTransition, i, `transition: background-position .5s`);
			if (px < -90)
				Vue.set(this.bgPos, i, `100%`);
			else
				Vue.set(this.bgPos, i, `0`);
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
        flex-wrap: nowrap;
        justify-content: center;
        align-items: stretch;

		padding: 5px 10px;
		background-size: 200% 100%;
		background-image: linear-gradient(to right, #eee 50%, rgb(212, 241, 143) 50%);
		// transition: background-position .5s;

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
