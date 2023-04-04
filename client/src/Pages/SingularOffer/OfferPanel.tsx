import DoubleArrowIcon from "@mui/icons-material/DoubleArrow"
import EditIcon from "@mui/icons-material/Edit"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { Rating, Stack } from "@mui/material"
import { Offer as OfferProps } from "Assets/Models/Offer"
import React from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import EditOffer from "./EditOffer"

interface Props {
	offer: OfferProps
	fullWidth?: boolean
}

const OfferPanel = (props: Props) => {
	const { t } = useTranslation()

	const offer = props.offer

	const photos = Object.values(offer.photos) || ["https://picsum.photos/200/300", "https://picsum.photos/400/300", "https://picsum.photos/500/300", "https://picsum.photos/300/300"]

	const [open, setOpen] = React.useState(false)
	const handleClickOpen = () => {
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
	}

	const [currentPhotoIndex, setCurrentPhotoIndex] = React.useState(0)

	const userId = useSelector((state: any) => state.user?.user?.uid)

	return (
		<>
			<div className='mainPage__offer__container__content__offer-panel' style={{ width: props.fullWidth && "100%" }}>
				<div className='mainPage__offer__container__content__offer-panel__header' style={{ display: props.fullWidth && "none" }}>
					<Stack direction={"row-reverse"} gap={"1rem"}>
						<Link to='/offers' className='mainPage__offer__container__content__offer-panel__header__go-back-button'>
							<DoubleArrowIcon sx={{ transform: "rotate(180deg)" }} />
							{t("offers.goBack")}
						</Link>
						<div
							className='mainPage__offer__container__content__offer-panel__header__edit-button'
							style={{
								display: offer.createdBy === userId ? "flex" : "none"
							}}
							onClick={handleClickOpen}
						>
							<EditIcon />
						</div>
					</Stack>
					<div className='mainPage__offer__container__content__offer-panel__header__title'>
						<span className='mainPage__offer__container__content__offer-panel__header__title__title'>{offer.title}</span>
						<span className='mainPage__offer__container__content__offer-panel__header__title__date'>
							{`${t("offers.creationTime")}
							${new Date(offer.creationTime * 1).toLocaleString()}`}
						</span>
					</div>
				</div>
				<div className='mainPage__offer__container__content__user-panel__user__divider' style={{ display: props.fullWidth && "none" }}></div>
				<div className='mainPage__offer__container__content__offer-panel__photos-gallery'>
					<div className='mainPage__offer__container__content__offer-panel__photos-gallery__photo'>
						<img
							//random photo url with short link
							src={photos[currentPhotoIndex]}
							alt='offer'
							className='mainPage__offer__container__content__offer-panel__photos-gallery__photo__image'
						/>
					</div>
					<div className='mainPage__offer__container__content__offer-panel__photos-gallery__switch-buttons'>
						<NavigateNextIcon sx={{ transform: "scaleX(-1)" }} onClick={currentPhotoIndex > 0 ? () => setCurrentPhotoIndex(currentPhotoIndex - 1) : undefined} />
						<span className='mainPage__offer__container__content__offer-panel__photos-gallery__switch-buttons__count'>
							{currentPhotoIndex + 1}/{photos.length}
						</span>
						<NavigateNextIcon onClick={currentPhotoIndex < photos.length - 1 ? () => setCurrentPhotoIndex(currentPhotoIndex + 1) : undefined} />
					</div>
				</div>
				<div className='mainPage__offer__container__content__user-panel__user__divider'></div>
				<div className='mainPage__offer__container__content__offer-panel__description'>{offer.description}</div>
				<div className='mainPage__offer__container__content__user-panel__user__divider'></div>
				<div className='mainPage__offer__container__content__offer-panel__buy'>
					<div className='mainPage__offer__container__content__offer-panel__buy__price'>
						{t("offers.price")}
						{offer.price.amount} {offer.price.currency}
					</div>
					<button className='mainPage__offer__container__content__offer-panel__buy__button' style={{ display: props.fullWidth && "none" }}>
						<ShoppingCartIcon fontSize='small' />
						{t("offers.buy")}
					</button>
				</div>
				<div className='mainPage__offer__container__content__user-panel__user__divider'></div>
				{offer.reviews !== undefined && (
					<div className='mainPage__offer__container__content__offer-panel__reviews-panel'>
						<div className='mainPage__offer__container__content__offer-panel__reviews-panel__header'>{t("offers.reviews")}</div>
						<div className='mainPage__offer__container__content__offer-panel__reviews-panel__stars'>
							{t("offers.averageRate")}
							<Rating name='read-only' precision={0.5} value={Object.values(offer.reviews).reduce((acc, review) => acc + review.rate, 0) / Object.values(offer.reviews).length} readOnly />
						</div>
						<div className='mainPage__offer__container__content__offer-panel__reviews-panel__comments' style={{ display: props.fullWidth && "none" }}>
							{Object.values(offer.reviews)
								.filter((review) => review.comment)
								.map((review, key) => (
									<div className='mainPage__offer__container__content__offer-panel__reviews-panel__comments__comment' key={key}>
										<div className='mainPage__offer__container__content__offer-panel__reviews-panel__comments__comment__stars'>
											<Rating name='read-only' precision={0.5} value={review.rate} readOnly />
										</div>
										<div className='mainPage__offer__container__content__offer-panel__reviews-panel__comments__comment__comment'>
											{review.ratedBy ? review.ratedBy : "Anonim"}
											{": "}
											{review.comment}
										</div>
									</div>
								))}
						</div>
					</div>
				)}
			</div>
			<EditOffer offer={offer} open={open} handleClose={handleClose} />
		</>
	)
}

export default OfferPanel
