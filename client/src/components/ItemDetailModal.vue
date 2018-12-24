<template>
	<transition name="modal">
		<div class="modal-mask">
			<span class="close-btn" @click="$emit('close')"><i class="fa fa-times"></i></span>
			<div class="content-wrapper">
				
				<h2 class="title">{{ item.name }}</h2>

				<div class="picture">
					<img :src="'http://localhost:3000/static/parm.jpg'">
				</div>

				<div class="description">
					{{ item.description }}
				</div>

				<div class="actions">
					<i class="fa fa-minus-circle" @click="subtractItem()" />
					<span class="quantity">{{ order[item.id].quantity }}</span>
					<i class="fa fa-plus-circle" @click="addItem()" />
				</div>

				<!-- <div class="modal-container">
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
					
				</div> -->
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
	background: rgba(255, 255, 255, 0.95);
	transition: opacity .3s ease;
	display: table-cell;
	vertical-align: middle;

	.close-btn {
		position: absolute;
		font-size: 24px;
		top: 10px;
		right: 10px;
	}

	.content-wrapper {

		height: 75%;
		width: 75%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		.picture {
			height: 120px;
			width: 120px;
			border-radius: 10000px;
			border: 3px solid rgba(255, 255, 255, 0);
			position: relative;
			overflow: hidden;
			margin: 0 auto;

			img {
				height: 100%;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				transition: all .2s;
			}

		}

		.actions {
			font-size: 42px;
			display: inline-block;

			i {
				vertical-align: middle;
			}
			.quantity {
				font-size: 64px;
				vertical-align: middle;
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
