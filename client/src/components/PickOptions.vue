<template>
	<div class="pick-options-wrapper">
		<div class="pick-options">
			<div class="option" v-for="(opt, i) in options" :key="`option-${i}`">
				{{serverUrl}}/{{opt.img}}
			</div>
		</div>
	</div>
</template>

<script>

import Constants from '../Constants';

export default {
	props: {
		options: { type: Array, required: true },
		multiple: { type: Boolean, default: false }
	},
	data() {
		return {
			serverUrl: null
		}
	},
	created() {
		this.serverUrl = Constants.SERVER_URL;
	}
}
</script>

<style>

</style>
