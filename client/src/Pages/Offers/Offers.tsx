import { Alert, AlertTitle, Grid, Skeleton, Stack } from "@mui/material"
import Header from "Components/Header/Header"
import Tags from "Components/Tags/Tags"
import { config } from "Config/config"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import Offer from "./Offer/Offer"
import "./style/style.css"

import OfferPagination from "Components/OfferPagination/OfferPagination"
import { useSelector } from "react-redux"

const Offers = () => {
	let { pageNumber } = useParams()
	const tags = useSelector((state: any) => state.searchBar.tags)
	!pageNumber && (pageNumber = "1")
	const howManyOffers = 9
	const navigate = useNavigate()
	const [paginationCount, setPaginationCount] = useState(1)
	const { t } = useTranslation()

	const fetchOffers = async () => {
		const res = await fetch(`${config.SERVER_URL}/offer/getAllOffers`)
		return res.json()
	}
	const { data, isLoading, isError } = useQuery("offers", fetchOffers, {
		onSuccess: () => {
			if (data !== null && data !== undefined) setPaginationCount(Math.ceil(Object.keys(data).length / howManyOffers))
		},
		onError: () => {
			setTimeout(() => {
				navigate("/")
			}, 5000)
		}
	})

	return (
		<>
			<Header />
			<div className='mainPage__offers__container'>
				<Tags />
				<div className='mainPage__offers__container__content'>
					<>
						{isLoading ? (
							<Grid container spacing={2}>
								<>
									{[...Array(3)].map(
										(offer: any, index) => (
											<Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
												<Skeleton variant='rounded' height={350} sx={{ margin: "0 1rem" }} />
											</Grid>
										),
										[]
									)}
								</>
							</Grid>
						) : isError ? (
							<Stack sx={{ width: "100%" }} alignItems='center' marginTop='2rem'>
								<Alert severity='error' variant='standard' sx={{ width: "75%" }}>
									<AlertTitle>{t("offers.error.title")}</AlertTitle>
									{t("offers.error.description")}
								</Alert>
							</Stack>
						) : (
							<>
								{paginationCount > 1 && <OfferPagination paginationCount={paginationCount} pageNumber={pageNumber} />}
								<Grid container spacing={1}>
									{Object.values(data)
										.slice(Number(pageNumber) * howManyOffers - howManyOffers, Number(pageNumber) * howManyOffers)
										.map((offer: any, index) => {
											if (Object.values(offer.tags).some((tag: any) => tags.includes(tag) || tags.length === 0))
												return (
													<Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
														<Offer key={index} offer={offer} />
													</Grid>
												)
										})}
								</Grid>
								{paginationCount > 1 && <OfferPagination paginationCount={paginationCount} pageNumber={pageNumber} />}
							</>
						)}
					</>
				</div>
			</div>
		</>
	)
}

export default Offers
