<template>
	<div class="modal-dim">
		<div class="modal-wrapper">
			<img :src="'http://localhost:3000/static/parm.jpg'" width="100" height="100">
		</div>
	</div>
</template>

<script>
export default {
	props: {
		item: {
			type: Object,
			required: true
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
	background: rgba(0, 0, 0, 0.5);
	z-index: 10;

	.modal-wrapper {
		width: 100px;
		height: 100px;
		background: white;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
}

</style>
