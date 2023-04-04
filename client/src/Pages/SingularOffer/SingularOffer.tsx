import Header from "Components/Header/Header"
import { config } from "Config/config"
import { useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import OfferPanel from "./OfferPanel"
import UserPanel from "./UserPanel"
// commit fix
import "./style/style.css"

const SingularOffer = () => {
	const navigate = useNavigate()
	const { offerId } = useParams<{ offerId: string }>()

	const fetchOffer = async () => {
		const res = await fetch(`${config.SERVER_URL}/offer/getOffer/${offerId}`)
		return res.json()
	}

	const { data, isLoading, isError } = useQuery("offer", fetchOffer, {
		onError: () => {
			setTimeout(() => {
				navigate("/")
			}, 5000)
		}
	})

	return (
		<>
			<Header />
			<div className='mainPage__offer__container'>
				<div className='mainPage__offer__container__content'>
					{isLoading ? (
						<div className='mainPage__offer__container__content__loading'>Loading...</div>
					) : isError ? (
						<div className='mainPage__offer__container__content__error'>Error</div>
					) : (
						<>
							<UserPanel userId={data?.createdBy} />
							<OfferPanel offer={data} />
						</>
					)}
				</div>
			</div>
		</>
	)
}

export default SingularOffer
