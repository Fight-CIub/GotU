import { User } from './user'
import { Offer } from './offer'
import { Package } from './package'

export interface OrderCredentials {
	id: string
	offer: Offer
	buyer: User
	orderTime: number
	chosenPackage: Package
	tip?: number
}
