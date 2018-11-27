<template>
	<div class="modal-dim" @click.self="$emit('close')">
		<div class="modal-wrapper">
			<div class="picture">
				<img :src="'http://localhost:3000/static/parm.jpg'">
			</div>
			<div class="content">
				<div class="title">
					{{item.name}}
				</div>
				<div class="description">
					{{item.description}}
				</div>
			</div>
			<div class="actions">
				<span><i class="fa fa-minus" @click="subtractItem()" /></span>
				{{order[item.id].quantity}}
				<span><i class="fa fa-plus" @click="addItem()" /></span>
			</div>
		</div>
	</div>
</template>

<script>

import { EventBus } from '@/EventBus';

export default {
	props: {
		item: {
			type: Object,
			required: true
		},
		order: {
			type: Object,
			required: true
		}
	},
	methods: {
		addItem() {
			this.order[this.item.id].quantity++;
			EventBus.$emit('itemQuantityChange', this.item);
		},
		subtractItem() {
			if (this.order[this.item.id].quantity > 0) {
				this.order[this.item.id].quantity--;
				EventBus.$emit('itemQuantityChange', this.item);
			}
		}
	}
}
</script>

<style lang="scss">

.modal-dim {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(255, 255, 255, 0.93);
	z-index: 10;

	.modal-wrapper {
		width: 80%;
		min-height: 40%;
		background: white;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
		border-radius: 2px;

		.picture {
			width: 100%;
			img {
				width: 100%;
			}
		}

		.content {
			padding: 0 10px 10px;
			text-align: left;

			.title {
				font-size: 16px;
				font-weight: bold;
				padding-bottom: 5px;
			}

			.description {
			}
		}

		.actions {
			text-align: right;
			width: 100%;
			padding: 10px;
			border-top: 1px solid #ccc;
			box-sizing: border-box;
		}
	}
}

</style>
