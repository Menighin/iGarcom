<template>
	<div class="client-order-wrapper" :class="{ active: isFocused }">
		<div class="swipe-up" @click="isFocused = !isFocused">
			<i class="fa" :class="{'fa-chevron-up': !isFocused, 'fa-chevron-down': isFocused}" />
		</div>
		<div class="client-title">
			<h3>Seu Pedido</h3>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isFocused: false
		}
	}
}
</script>

<style scoped lang="scss">

.client-order-wrapper {
	position: fixed;
	width: 100%;
	height: 80%;
	background: rgb(235, 212, 135);
	bottom: 0;
	left: 0;
	transition: all .3s;
	box-shadow: 0 -3px 6px rgba(0,0,0,0.16), 0 -3px 6px rgba(0,0,0,0.23);
	transform: translateY(calc(100% - 50px));

	&.active {
		transform: translateY(0);
		box-shadow: 0 -6px 10px rgba(0,0,0,0.16), 0 -6px 10px rgba(0,0,0,0.23);
	}

	.swipe-up {
		width: 100%;
		height: 20px;
		background: rgb(231, 193, 67);
		color: black;
	}

	.client-title {
		h3 {
			margin: 5px 0 0;
		}
	}
}

</style>
