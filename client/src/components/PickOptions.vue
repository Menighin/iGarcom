<template>
	<div class="pick-options-wrapper">
		<div class="pick-options">
			<div class="option" v-for="(opt, i) in options" :key="`option-${i}`" @click="pick(opt, i)">
				<img class="option-picture" :src="`${serverUrl}/static/parm.jpg`" />
				<h5 class="option-name">{{opt.name}}</h5>
			</div>
		</div>
	</div>
</template>

<script>

import Constants from '../Constants';

export default {
	props: {
		value: { type: Array, required: true },
		options: { type: Array, required: true },
		multiple: { type: Boolean, default: false }
	},
	data() {
		return {
			serverUrl: null,
			picked: []
		}
	},
	methods: {
		pick(opt, pos) {
			if (typeof this.picked[pos] !== 'undefined' && this.picked[pos] != null)
				this.picked[pos] = null;
			else
				this.picked[pos] = opt;

			this.value.length = 0;
			this.value.pop(); // Clearing arrays with only one element
			this.picked
				.filter(p => typeof p !== 'undefined' && p != null)
				.forEach(p => this.value.push(p));
		}
	},
	created() {
		this.serverUrl = Constants.SERVER_URL;
	}
}
</script>

<style scoped lang="scss">

.pick-options-wrapper {
	.pick-options {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;

		.option {
			margin: 10px;
			background: white;

			.option-name {
				margin: 0;
			}

			.option-picture {
				height: 75px;
				width: 75px;
			}
		}
	}
}

</style>
