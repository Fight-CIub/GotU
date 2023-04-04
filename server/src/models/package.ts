export interface Package {
	id: string
	name: string
	description: string
	price: number
	contains: string[]
	deliveryTime: {
		amount: number
		unit: string
	}
}
