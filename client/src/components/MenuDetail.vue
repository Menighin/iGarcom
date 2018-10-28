<template>
	<div id="menu-detail">
        {{menu.label}}

        <component :is="menu.component" v-bind="{items: menu.content, order: order}" />
	</div>
</template>

<script>

import ItemList from './ItemList';

export default {
	name: 'MenuDetail',
	components: {
		ItemList
	},
	props: {
		optionId: {
			type: String,
			required: true
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
