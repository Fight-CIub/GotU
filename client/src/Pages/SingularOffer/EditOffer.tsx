import React, { useState } from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Tooltip,
} from '@mui/material'
import { Offer as OfferProps } from 'Assets/Models/Offer'
import { useTranslation } from 'react-i18next'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { config } from 'Config/config'
import { CustomAlertProps as Props } from 'Assets/Models/CustomAlertProps'
import * as customAlertSlice from 'Store/features/CustomAlert/CustomAlertSlice'
import * as redux from 'react-redux'
import { useNavigate } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility'

interface EditOfferProps {
	offer: OfferProps
	handleClose(): void
	open: boolean
}

const EditOffer = (props: EditOfferProps) => {
	const navigate = useNavigate()
	const { handleClose, open, offer } = props
	const dispatch = redux.useDispatch()
	const { t } = useTranslation()
	/* const [newOffer, setNewOffer] = useState({
		title: offer.title,
		description: offer.description,
		price: offer.price.amount,
		tags: offer.tags,
		photos: offer.photos,
	}) */
	const [newOffer, setNewOffer] = useState({
		title: '',
		description: '',
		price: 0,
		tags: [],
		photos: [],
	})
	const [photoLink, setPhotoLink] = useState('')

	const handleSaveChanges = () => {
		const newOfferToSend = {
			...offer,
			title: newOffer.title,
			description: newOffer.description,
			price: {
				...offer.price,
				amount: newOffer.price,
			},
			tags: newOffer.tags,
			photos: newOffer.photos,
		}
		// check if newOfferToSend is valid and has all required fields
		if (
			newOfferToSend.title.length > 3 &&
			newOfferToSend.description.length > 3 &&
			newOfferToSend.price.amount > 0 &&
			newOfferToSend.tags.length > 0 &&
			newOfferToSend.photos.length > 0
		) {
			try {
				fetch(`${config.SERVER_URL}/offer/edit`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(newOfferToSend),
				}).then((response) => {
					if (response.status === 200 || response.status === 201) {
						handleClose()
						const props: Props = {
							isOpen: true,
							severity: 'success',
							variant: 'standard',
							message: `${t('offers.messages.editSuccess')}`,
							anchor: { vertical: 'bottom', horizontal: 'center' },
						}
						dispatch(customAlertSlice.setCustomAlert(props))
						setTimeout(() => {
							navigate(0)
						}, 1500)
					}
				})
			} catch (error) {}
		}
	}

	const isImageUrl = (url: string): boolean => {
		const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif']
		const lowerCaseUrl = url.toLowerCase()

		return imageExtensions.some((ext) => lowerCaseUrl.endsWith(ext))
	}

	return (
		<div className='mainPage__offer__container__content__offer-panel__edit-page'>
			<Dialog
				open={open}
				onClose={() => {
					handleClose()
				}}
				fullWidth
				maxWidth={'md'}
			>
				<DialogTitle>{`${t('offers.edit')} ${offer.title}`}</DialogTitle>
				<DialogContent>
					<div className='mainPage__offer__container__content__offer-panel__edit-page__change-container'>
						<div className='mainPage__offer__container__content__offer-panel__edit-page__change-container__change'>
							<label>{t(`offers.labels.title`)}</label>
							<input
								type='text'
								value={newOffer.title}
								onChange={(e) => {
									setNewOffer({ ...newOffer, title: e.target.value })
								}}
							/>
						</div>
						<div className='mainPage__offer__container__content__offer-panel__edit-page__change-container__change'>
							<label>{t(`offers.labels.description`)}</label>
							<textarea
								value={newOffer.description}
								onChange={(e) => {
									setNewOffer({
										...newOffer,
										description: e.target.value,
									})
								}}
							/>
						</div>
						<div className='mainPage__offer__container__content__offer-panel__edit-page__change-container__change'>
							<label>{t(`offers.labels.title`)}</label>
							<div className='mainPage__offer__container__content__offer-panel__edit-page__change-container__change__price-container'>
								<input
									className='mainPage__offer__container__content__offer-panel__edit-page__change-container__change__price'
									type='number'
									value={`${newOffer.price}`}
									onChange={(e) => {
										setNewOffer({
											...newOffer,
											price: e.target.value as any,
										})
									}}
								/>
								{offer.price.currency}
							</div>
						</div>
						<div className='mainPage__offer__container__content__offer-panel__edit-page__change-container__change'>
							<label>{t(`offers.labels.tags`)}</label>
							<input
								type='text'
								value={Object.values(newOffer.tags).join(',')}
								onChange={(e) => {
									setNewOffer({
										...newOffer,
										tags: e.target.value.split(','),
									})
								}}
							/>
						</div>
						<div className='mainPage__offer__container__content__offer-panel__edit-page__change-container__change'>
							<label>{t(`offers.labels.images`)}</label>
							<div className='mainPage__offer__container__content__offer-panel__edit-page__change-container__change__photos'>
								{Object.values(newOffer.photos).map((photo, index) => (
									<div className='mainPage__offer__container__content__offer-panel__edit-page__change-container__change__photos__photo'>
										<DeleteOutlineIcon
											onClick={() => {
												const newPhotos = Object.values(
													offer.photos
												)
												newPhotos.splice(index, 1)
												setNewOffer({
													...newOffer,
													photos: newPhotos,
												})
											}}
											sx={{
												cursor: 'pointer',
												color: 'rgba(220, 100, 100, 1)',
											}}
										/>
										<span>
											{photo}
											<Tooltip
												title={t('offers.messages.clickToOpen')}
												arrow
											>
												<VisibilityIcon
													onClick={() => {
														window.open(photo)
													}}
													sx={{
														cursor: 'pointer',
														color: 'rgba(100, 100, 100, 1)',
													}}
												/>
											</Tooltip>
										</span>
									</div>
								))}
								<input
									className='mainPage__offer__container__content__offer-panel__edit-page__change-container__change__photos__add-photo'
									placeholder={t(`offers.labels.addPhoto`)}
									value={photoLink}
									onChange={(e) => {
										setPhotoLink(e.target.value)
									}}
								/>
								<button
									className='mainPage__offer__container__content__offer-panel__edit-page__change-container__change__photos__add-photo-button'
									onClick={() => {
										if (photoLink !== '' && isImageUrl(photoLink)) {
											setNewOffer({
												...newOffer,
												photos: [
													...Object.values(newOffer.photos),
													photoLink,
												],
											})
											setPhotoLink('')
										} else {
											const props: Props = {
												isOpen: true,
												severity: 'error',
												variant: 'standard',
												message: `${t(
													'offers.messages.invalidPhotoUrl'
												)}`,
												anchor: {
													vertical: 'bottom',
													horizontal: 'center',
												},
											}
											dispatch(
												customAlertSlice.setCustomAlert(props)
											)
										}
									}}
								>
									{t(`offers.labels.addPhotoButton`)}
								</button>
							</div>
						</div>
					</div>
				</DialogContent>
				<DialogActions>
					<button
						className='mainPage__offer__container__content__offer-panel__edit-page__change-container__change__buttons__clear'
						onClick={() => {
							setNewOffer({
								title: offer.title,
								description: offer.description,
								price: offer.price.amount,
								tags: offer.tags,
								photos: offer.photos,
							})
						}}
					>
						{t(`offers.labels.clear`)}
					</button>
					<button
						className='mainPage__offer__container__content__offer-panel__edit-page__change-container__change__buttons__save'
						onClick={() => {
							handleSaveChanges()
						}}
					>
						{t(`offers.labels.save`)}
					</button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default EditOffer
