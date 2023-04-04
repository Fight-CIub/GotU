import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from 'Components/Header/Header'
import './style/style.css'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { config } from 'Config/config'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Tooltip,
} from '@mui/material'
import ArchiveIcon from '@mui/icons-material/Archive'
import UnarchiveIcon from '@mui/icons-material/Unarchive'
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { Offer } from 'Assets/Models/Offer'
import AddOffer from './AddOffer'

interface userData {
	displayName: string
	email: string
	photoURL: string
	metadata: {
		creationTime: string
	}
	phoneNumber: string
	uid: string
}

const ProfileOffers = () => {
	const { userName } = useParams()
	const { t } = useTranslation()
	const navigate = useNavigate()

	const user = useSelector((state: any) => state.user.user)

	const fetchUserData = async () => {
		const res = await fetch(
			`${config.SERVER_URL}/users/getUserDataFromName/${userName}`
		)
		const resValue: userData = await res.json()
		console.log(resValue)
		return resValue
	}

	const fetchUserOffers = async () => {
		const res = await fetch(
			`${config.SERVER_URL}/offer/getOffersFromUser/${userData.uid}`
		)
		// console.log(await res.json())
		return res.json()
	}

	const {
		data: userData,
		isError: isUserDataError,
		isLoading: isUserDataLoading,
	} = useQuery<userData>('userData', fetchUserData)

	const {
		data: userOffers,
		isError: isUserOffersError,
		isLoading: isUserOffersLoading,
	} = useQuery('userOffers', fetchUserOffers, {
		enabled: isUserDataLoading ? false : true,
	})

	const handleOfferArchive = async (offer: Offer) => {
		const offerData = { ...offer, status: 0 }
		try {
			await fetch(`${config.SERVER_URL}/offer/archive`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(offerData),
			})
			navigate(0)
		} catch (error) {}
	}

	const handleOfferUnarchive = async (offer: Offer) => {
		const offerData = { ...offer, status: 1 }
		try {
			await fetch(`${config.SERVER_URL}/offer/archive`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(offerData),
			})
			navigate(0)
		} catch (error) {}
	}

	const handleOfferDelete = async (offer: Offer) => {
		try {
			await fetch(`${config.SERVER_URL}/offer/delete`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(offer),
			})
			navigate(0)
		} catch (error) {}
	}

	const [open, setOpen] = useState(false)
	const handleClickOpen = () => {
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
	}

	return (
		<>
			<Header />
			<div className='mainPage__profile-offers-container'>
				<div className='mainPage__profile-offers-container__content'>
					<TableContainer component={Paper}>
						<Table
							sx={{ width: '100%' }}
							aria-label='offers table'
						>
							<TableHead
								sx={{
									backgroundColor: '#f5f5f5',
								}}
							>
								<TableRow>
									<TableCell>{t('offers.table.title')}</TableCell>
									<TableCell>{t('offers.table.status')}</TableCell>
									<TableCell>
										{t('offers.table.price.amount')}
									</TableCell>
									<TableCell>{t('offers.table.tags')}</TableCell>
									<TableCell>{t('offers.table.date')}</TableCell>
									<TableCell>{t('offers.table.actions')}</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									<TableCell
										align='center'
										colSpan={10}
									>
										<Tooltip
											arrow
											title={t('offers.actions.add')}
										>
											<AddBoxIcon
												style={{
													fontSize: '2rem',
													color: 'rgba(24, 140, 93, 1)',
													cursor: 'pointer',
												}}
												onClick={handleClickOpen}
											/>
										</Tooltip>
									</TableCell>
								</TableRow>
								{userOffers &&
									Object.values(userOffers).map((offer: any) => (
										<TableRow
											key={offer.id}
											sx={{
												'&:last-child td, &:last-child th': {
													border: 0,
												},
											}}
										>
											<TableCell
												component='th'
												scope='row'
											>
												{offer.title}
											</TableCell>
											<TableCell>{offer.status}</TableCell>
											<TableCell>
												{offer.price.amount} {offer.price.currency}
											</TableCell>
											<TableCell>
												{Object.values(offer.tags).join(',')}
											</TableCell>
											<TableCell>
												{new Date(
													offer.creationTime * 1
												).toLocaleString()}
											</TableCell>
											<TableCell
												style={{
													display: 'flex',
													width: '100%',
													justifyContent: 'center',
													alignItems: 'center',
													gap: '1rem',
												}}
											>
												<Tooltip title={t('offers.actions.goto')}>
													<SendIcon
														sx={{ cursor: 'pointer' }}
														onClick={() =>
															navigate(
																`/offers/offer/${offer.id}`
															)
														}
													/>
												</Tooltip>
												<div
													style={{
														display:
															user &&
															user?.uid === offer.createdBy
																? 'flex'
																: 'none',
														gap: '1rem',
													}}
												>
													{offer.status === 1 ? (
														<Tooltip
															title={t('offers.actions.archive')}
														>
															<ArchiveIcon
																sx={{ cursor: 'pointer' }}
																onClick={() =>
																	handleOfferArchive(offer)
																}
															/>
														</Tooltip>
													) : (
														<Tooltip
															title={t(
																'offers.actions.unarchive'
															)}
														>
															<UnarchiveIcon
																sx={{ cursor: 'pointer' }}
																onClick={() =>
																	handleOfferUnarchive(offer)
																}
															/>
														</Tooltip>
													)}
													<Tooltip
														title={t('offers.actions.delete')}
													>
														<DeleteIcon
															sx={{ cursor: 'pointer' }}
															onClick={() =>
																handleOfferDelete(offer)
															}
														/>
													</Tooltip>
												</div>
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</div>
			<AddOffer
				open={open}
				handleClose={handleClose}
			/>
		</>
	)
}

export default ProfileOffers
