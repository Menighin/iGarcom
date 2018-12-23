<template>
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper" @click.self="$emit('close')">
				<div class="modal-container">
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
						<span><i class="fa fa-minus-circle" @click="subtractItem()" /></span>
						{{ order[item.id].quantity }}
						<span><i class="fa fa-plus-circle" @click="addItem()" /></span>
					</div>
				</div>
			</div>
		</div>
	</transition>
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

<style lang="scss" scoped>

.modal-mask {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(255, 255, 255, 0.93);
	transition: opacity .3s ease;
	display: table;

	.modal-wrapper {

		display: table-cell;
		vertical-align: middle;

		.modal-container {

			width: 80%;
			min-height: 40%;
			background: white;
			box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
			border-radius: 2px;
			transition: all .3s ease;
			margin: 0 auto;

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
}

.modal-enter {
	opacity: 0;
}

.modal-leave-active {
	opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
	transform: scale(1.1);
}

</style>
