<template>
  	<div id="item-list">
        ITEM LIST
  	</div>
</template>

<script>

	export default {
		name: 'ItemList',
        props: {
            items: {
                type: Array,
                required: false
            }
        },
		data() {
			return {
			}
		},
		methods: {
			menuClick(id) {
				this.isInMenu = false;
				
			}
		}
	}
</script>

<style>
#app {

}
</style>
