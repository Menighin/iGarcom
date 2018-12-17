<template>
	<div class="complex-order">

		<h3>{{stepModel.name}}</h3>

		<!-- <ul class="options-list">
			<li class="option-item" v-for="(o, i) in stepModel.options" :key="`option-${i}`">
				<input :type="inputType" :id="`item-${i}`" :value="i" v-model="picked">
				<label :for="`item-${i}`">{{o.name}}</label>
			</li>
		</ul> -->
		<pick-options :options="stepModel.options" v-model="picked" :multiple="multipleChoices"></pick-options>

		<br>
		<h4>{{picked}}</h4>
		<br>

		<router-link v-if="step > 0" :to="`${parseInt(step) - 1}`">Voltar</router-link>
		<router-link @click.native="next" :event="canGoNextEvent" :class="{active: canGoNext}" v-if="step < model.length - 1" :to="`${parseInt(step) + 1}`">Avançar</router-link>
		<router-link @click.native="finish" :event="canGoNextEvent" :class="{active: canGoNext}" v-if="step == model.length - 1" to="../../">Finalizar</router-link>

	</div>
</template>

<script>

import { EventBus } from '../EventBus';
import PickOptions from './PickOptions';

export default {
	name: 'ComplexOrder',
	components: {
		PickOptions
	},
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
		multipleChoices() {
			return this.stepModel.maxChoices > 1;
		},
		canGoNext() {
			if (Array.isArray(this.picked)) return this.picked.length > 0
			return this.picked != null;
		},
		canGoNextEvent() {
			if (this.canGoNext) return 'click';
			return '';
		}
	},
	methods: {
		next(evt) {
			if (this.canGoNext)
				EventBus.$emit('complexStep', this.step, this.picked, this.stepModel);
		},
		finish() {
			if (this.canGoNext) {
				EventBus.$emit('complexStep', this.step, this.picked, this.stepModel);
				EventBus.$emit('complexFinish', this.model.id);
			}
		}
	}
}
</script>

<style scoped>

</style>
