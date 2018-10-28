<template>
	<div class="mainMenu">
		<button v-for="(m, i) in menus" :key="`menu-${i}`" @click="$emit('click', m.id)">{{m.label}}</button>
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
