<template>
	<div class="pick-options-wrapper">
		<h5>{{optionsLeftText}}</h5>
		<div class="pick-options">
			<div class="option" :class="{active: isActive[i] }" v-for="(opt, i) in options" :key="`option-${i}`" @click="pick(opt, i)">
				<h3 class="option-name">{{ opt.name }}</h3>
				<div class="option-picture">
					<img :src="`${serverUrl}/static/parm.jpg`" />
				</div>
				<h5 class="option-price">{{ typeof opt.price !== 'undefined' ? opt.price : '' | price }}</h5>
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
		multiple: { type: Boolean, default: false },
		maxPicks: { type: Number, default: 1 }
	},
	data() {
		return {
			serverUrl: null,
			picked: []
		}
	},
	computed: {
		isActive() {
			let actives = this.options.map((o, i) => this.picked[i] !== null);
			return actives;
		},
		optionsLeft() {
			return this.maxPicks - this.picked.filter(p => p != null).length;
		},
		optionsLeftText() {
			let optionsLeft = this.optionsLeft;
			if (optionsLeft === 0) return 'Você já escolheu o máximo de opções!';
			else if (optionsLeft === 1) return 'Escolha mais 1 opção';
			else return `Escolha mais ${optionsLeft} opções`
		}
	},
	methods: {
		pick(opt, pos) {
			if (this.multiple) {
				if (this.picked[pos] != null)
					this.$set(this.picked, pos, null);
				else if (this.optionsLeft > 0)
					this.$set(this.picked, pos, opt);
			} else {
				this.picked.forEach((p, i) => this.$set(this.picked, i, null));
				this.$set(this.picked, pos, opt);
			}

			this.value.length = 0;
			this.value.pop(); // Clearing arrays with only one element
			this.picked
				.filter(p => p != null)
				.forEach(p => this.value.push(p));
		}
	},
	filters: {
		price(price) {
			if (price.length === 0) return '';
			let [whole, decimal] = price.toString().split('.');
			if (typeof decimal === 'undefined') decimal = '';
			return `R$ ${whole},${decimal.padEnd(2, '0')}`;
		}
	},
	created() {
		this.serverUrl = Constants.SERVER_URL;
		this.picked = this.options.map(o => null);
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
			flex: 1 1 0;
			margin: 10px;

			.option-name {
				margin: 10px;
			}

			.option-price {
				margin: 10px;
			}

			.option-picture {
				height: 75px;
				width: 75px;
				border-radius: 50px;
				border: 3px solid rgba(255, 255, 255, 0);
				position: relative;
				overflow: hidden;
				margin: 0 auto;

				img {
					height: 100%;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					transition: all .2s;
				}

			}

			&.active {
				.option-picture {
					border: 3px solid rgba(255, 255, 255, 1);
					img {
						height: 120%;
						width: 120%;
					}
				}
			}
		}
	}
}

</style>
