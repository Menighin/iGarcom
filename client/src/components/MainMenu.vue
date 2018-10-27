<template>
	<div class="mainMenu">
		<button v-for="(m, i) in menus" @click="$emit('click', m.id)">{{m.label}}</button>
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
		data () {
			return {
				msg: 'Welcome to Your Vue.js App'
			}
		}
	}
</script>

<style scoped>

</style>
