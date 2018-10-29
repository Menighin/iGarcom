<template>
	<div class="complex-order">
		{{model[step]}}

		<router-link v-if="step > 0" :to="`${parseInt(step) - 1}`">Voltar</router-link>
		<router-link v-if="step < model.length - 1" :to="`${parseInt(step) + 1}`">Avançar</router-link>
		<router-link v-if="step == model.length - 1" to="../../">Finalizar</router-link>

	</div>
</template>

<script>
export default {
	name: 'ComplexOrder',
	props: {
		step: {
			type: String,
			default: '0'
		},
		order: {
			type: Object,
			required: true
		},
		model: {
			type: Array,
			required: true
		}
	}
}
</script>

<style scoped>
</style>
