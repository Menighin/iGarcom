<template>
	<div class="mainMenu">
		<router-link :to="`ordering/${m.id}`" v-for="(m, i) in menus" :key="`menu-${i}`">{{m.label}}<br></router-link>
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
	}
}
</script>

<style scoped>

</style>
