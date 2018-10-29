<template>
	<div id="menu-detail">
        {{menu.label}}

        <component :is="menu.component" v-bind="{model: menu.model, order: order, step: step}" />
	</div>
</template>

<script>

import ItemList from './ItemList';
import ComplexOrder from './ComplexOrder';

export default {
	name: 'MenuDetail',
	components: {
		ItemList,
		ComplexOrder
	},
	props: {
		optionId: {
			type: String,
			required: true
		},
		step: {
			type: String,
			default: '0'
		},
		order: {
			type: Object,
			required: true
		},
		menus: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
		}
	},
	computed: {
		menu() {
			return this.menus.filter(m => m.id === this.optionId)[0];
		}
	}
}

</script>

<style scoped>

</style>
