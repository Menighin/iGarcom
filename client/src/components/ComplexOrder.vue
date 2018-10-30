<template>
	<div class="complex-order">

		<h3>{{stepModel.name}}</h3>

		<ul class="options-list">
			<li class="option-item" v-for="(o, i) in stepModel.options" :key="`option-${i}`">
				<input :type="inputType" :id="`item-${i}`" :value="o.name" v-model="picked">
				<label :for="`item-${i}`">{{o.name}}</label>
			</li>
		</ul>

		<br>
		<h4>{{picked}}</h4>
		<br>

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
	},
	data() {
		return {
			picked: []
		}
	},
	computed: {
		stepModel() {
			return this.model[this.step];
		},
		inputType() {
			if (this.stepModel.maxChoices > this.stepModel.minChoices)
				return 'checkbox';
			else
				return 'radio';
		}
	}
}
</script>

<style scoped>
</style>
