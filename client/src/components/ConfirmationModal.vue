<template>
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper" @click.self="$emit('close')">
				<div class="modal-container">
					<div class="content">
						<slot></slot>
					</div>
					<div class="actions">
						<span class="confirm" @click="$emit('confirm')" :style="`color: ${confirmationColor}`">SIM</span>
						<span class="cancel" @click="$emit('cancel')" :style="`color: ${cancelColor}`">CANCELAR</span>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>

import ApplicationTheme from '../ApplicationTheme';

export default {
	data() {
		return {
			confirmationColor: null,
			cancelColor: null
		}
	},
	created() {
		this.confirmationColor = ApplicationTheme.labelPrimary;
		this.cancelColor = ApplicationTheme.labelSecondary;
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
			background: white;
			box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
			border-radius: 2px;
			transition: all .3s ease;
			margin: 0 auto;

			.content {
				padding: 20px;
				text-align: left;
			}

			.actions {
				text-align: right;
				width: 100%;
				padding: 10px;
				border-top: 1px solid #ccc;
				box-sizing: border-box;

				.confirm {
					margin-right: 10px;
					font-weight: bold;
				}

				.cancel {
					font-weight: bold;
				}

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
