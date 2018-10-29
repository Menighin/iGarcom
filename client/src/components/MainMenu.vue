<template>
	<div class="mainMenu">
		<router-link :to="getRouterLink(m)" v-for="(m, i) in menus" :key="`menu-${i}`">{{m.label}}<br></router-link>
	</div>
</template>

<script>
export default {
	name: 'MainMenu',
	props: {
		menus: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
		}
	},
	methods: {
		getRouterLink(menu) {
			if (menu.component === 'ComplexOrder')
				return `ordering/${menu.id}/0`;
			else
				return `ordering/${menu.id}`;
		}
	}
}
</script>

<style scoped>

</style>
