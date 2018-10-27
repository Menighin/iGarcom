<template>
  	<div id="menu-detail">
        {{menu.label}}

        <component :is="menu.component" />
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
            menu: {
                type: Object,
                required: true
            }
        },
		data() {
			return {
			}
		},
		methods: {
		}
	}
</script>

<style scoped>

</style>
