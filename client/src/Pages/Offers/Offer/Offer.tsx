import NearMeIcon from "@mui/icons-material/NearMe"
import { Card, CardActionArea, CardContent, CardMedia, Dialog, Rating, Slide, Stack, Tooltip, Typography } from "@mui/material"
import { TransitionProps } from "@mui/material/transitions"
import { Offer as OfferProps } from "Assets/Models/Offer"
import { config } from "Config/config"
import OfferPanel from "Pages/SingularOffer/OfferPanel"
import React from "react"
import { useTranslation } from "react-i18next"
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom"

interface Props {
	offer?: OfferProps
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction='up' ref={ref} {...props} />
})

const Offer = (offer?: Props) => {
	const [open, setOpen] = React.useState(false)
	const { t } = useTranslation()
	const navigate = useNavigate()
	const handleOfferClick = () => {
		navigate(`offer/${offer?.offer?.id}`)
		console.log("Offer clicked")
	}
	const [avg, setAvg] = React.useState(0)
	const [allReviewsCount, setAllReviewsCount] = React.useState(0)
	const [sum, setSum] = React.useState(0)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	if (offer.offer.reviews && offer.offer.reviews.length > 0) {
		Object.values(offer.offer.reviews).map((review) => {
			setSum(sum + review.rate)
		})
		setAllReviewsCount(Object.keys(offer.offer.reviews).length)
		setAvg(sum / allReviewsCount)
	}

	const fetchUser = async () => {
		const res = await fetch(`${config.SERVER_URL}/users/getUserData/${offer?.offer?.createdBy}`)
		return res.json()
	}
	const { data, isLoading, isError } = useQuery("user", fetchUser)

	const handleOfferPopup = () => {
		handleClickOpen()
	}

	return (
		<>
			<Card className='mainPage__offers__container__content__offer'>
				<CardActionArea onClick={() => handleOfferPopup()}>
					<CardMedia component='img' height='140' image='https://source.unsplash.com/random' alt='random' />
					<CardContent>
						<Typography gutterBottom variant='h6' component='div'>
							{offer?.offer?.title}
						</Typography>
						<Typography gutterBottom variant='body2' component='div'>
							<Typography variant='body2' flexDirection={"row"}>
								{t("offers.createdBy")}
								{data?.displayName}
							</Typography>
						</Typography>
						<Typography
							variant='body2'
							color='text.secondary'
							maxHeight={100}
							overflow='auto'
							sx={{
								overflowY: "auto",
								maxHeight: "50px"
							}}
						>
							{offer?.offer?.description}
						</Typography>
					</CardContent>
				</CardActionArea>
				<Stack flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} sx={{ p: "1rem", paddingBottom: "0.5rem", bottom: 0 }}>
					<Rating name='read-only' value={offer.offer.reviews && Object.values(offer?.offer?.reviews).reduce((acc, review) => acc + review.rate, 0) / Object.values(offer?.offer?.reviews).length} precision={0.5} readOnly />
					<Typography>
						{offer?.offer?.price.amount} {offer?.offer?.price.currency}
					</Typography>
					<Tooltip sx={{ cursor: "pointer", color: "rgba(black, 10%)" }} title={t("offers.goToOffer")}>
						<NearMeIcon onClick={() => handleOfferClick()} />
					</Tooltip>
				</Stack>
			</Card>
			<Dialog open={open} TransitionComponent={Transition} keepMounted fullWidth maxWidth={"md"} onClose={handleClose} aria-labelledby='alert-dialog-slide-title' aria-describedby='alert-dialog-slide-description'>
				<OfferPanel offer={offer.offer} fullWidth />
			</Dialog>
		</>
	)
}

export default Offer
