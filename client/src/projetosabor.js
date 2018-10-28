export default {

	storeId: 'prosab',
	store: 'Projeto Sabor',
	logo: 'projetosabor.png',
	theme: {
		primary: 'tomato',
		secondary: 'blue'
	},
	menu: [
		{
			id: 'sandwich',
			label: 'Sanduíches',
			component: 'ItemComplex',
			steps: [
				{
					name: 'Pão',
					label: 'Escolha o pão',
					extra: false,
					minChoices: 1,
					maxChoices: 1,
					options: [
						{
							name: 'Ciabata',
							img: 'ciabata.png'
						},
						{
							name: 'Sírio',
							img: 'sirio.png'
						}
					]
				},
				{
					name: 'Carne',
					label: 'Escolha a carne',
					extra: false,
					minChoices: 1,
					maxChoices: 1,
					options: [
						{
							name: 'Boi',
							price: 24.90
						},
						{
							name: 'frango',
							price: 18.90
						}
					]
				},
				{
					name: 'Salada',
					label: 'Escolha os acompanhamentos',
					extra: true,
					minChoices: 1,
					maxChoices: 5,
					options: [
						{
							name: 'Alface'
						},
						{
							name: 'Tomate'
						},
						{
							name: 'Pimentao'
						},
						{
							name: 'Azeitona'
						},
						{
							name: 'Cebola'
						}
					]
				}
			]
		},
		{
			id: 'food',
			label: 'Comida',
			component: 'ItemList',
			content: [
				{
					id: 'fileparmegiana',
					name: 'Filé à parmegiana',
					description: 'Filé de boi à parmegiana acompanhando de arroz, feijao e bla',
					img: 'fileparm.png',
					price: 39.90
				},
				{
					id: 'filefrango',
					name: 'Filé de frango',
					description: 'Filé de frango acompanha arroz e salada',
					img: 'filefrango.png',
					price: 32.90
				},
				{
					id: 'feijoada',
					name: 'Feijoada',
					description: 'Feijoada de carnes como rabo, toucinho e bla',
					img: 'feijoada',
					price: 36.90
				}
			]
		},
		{
			id: 'beverage',
			label: 'Bebidas',
			component: 'ItemList',
			content: [
				{
					id: 'coke',
					name: 'Coca-cola Lata',
					img: 'coca.png',
					price: 4.90
				},
				{
					id: 'orange',
					name: 'Suco Laranja',
					img: 'sucolarnaja.png',
					price: 6.00
				},
				{
					id: 'juicehome',
					name: 'Suco da casa',
					description: 'Suco de maracujá com morango e gengibre',
					img: 'sucocasa.png',
					price: 7.90
				}
			]
		}
	]
}
