import { User } from './user'

export interface Offer {
	id: string
	title: string
	description: string
	tags: string[]
	price: {
		amount: number
		currency: string
	}
	creationTime: number
	createdBy: string
	status: number
	photos: string[]
	reviews?: {
		rate: number
		comment?: string
		ratedBy: User
	}[]
}
