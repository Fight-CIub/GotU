import ChatIcon from '@mui/icons-material/Chat'
import EmailIcon from '@mui/icons-material/Email'
import NearMeIcon from '@mui/icons-material/NearMe'
import PhoneIcon from '@mui/icons-material/Phone'
import { Avatar, Divider, Rating, Tooltip, Zoom } from '@mui/material'
import { Offer } from 'Assets/Models/Offer'
import { timestampToDate } from 'Assets/Utils/Utils'
import Header from 'Components/Header/Header'
import { config } from 'Config/config'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import './style/style.css'

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

const Profile = () => {
	const { userName } = useParams()

	const user = useSelector((state: any) => state.user.user)
	const { t } = useTranslation()

	const navigate = useNavigate()

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

	const fetchRandomReviews = async () => {
		const res = await fetch(
			`${config.SERVER_URL}/review/getRandomReviews/${userData.uid}`
		)
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
	} = useQuery<Offer[]>('userOffers', fetchUserOffers, {
		enabled: isUserDataLoading ? false : true,
	})

	const {
		data: userReviews,
		isError: isUserReviewsError,
		isLoading: isUserReviewsLoading,
	} = useQuery('userReviews', fetchRandomReviews)

	useEffect(() => {
		console.log(userReviews)
	})

	return (
		<>
			<Header />
			<div className='user-profile-container'>
				<div className='user-profile-container__banner'>
					<Avatar
						src={userData ? userData.photoURL : ''}
						alt='avatar'
						className='user-profile-container__banner__img'
						sx={{
							width: 200,
							height: 200,
							boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
							cursor: 'pointer',
						}}
					/>
					<Tooltip
						arrow
						TransitionComponent={Zoom}
						placement='top'
						// flexItem
						title={
							userData
								? `${t('user.accountCreationTime')} ${timestampToDate(
										userData.metadata.creationTime
								  )}`
								: ''
						}
					>
						<p className='user-profile-container__banner__name'>
							{userData ? userData.displayName : ''}
						</p>
					</Tooltip>
					<h3 className='user-profile-container__banner__quote'>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit.
						Magni dolorum vitae qui labore error quas repudiandae, ea ex
						doloribus nam autem placeat ad repellat aperiam tempora
						nesciunt! Illum, animi in.
					</h3>
					<div className='user-profile-container__banner__media'>
						<EmailIcon /> {userData ? userData.email : ''}
						<Divider flexItem />
						<PhoneIcon /> {userData ? userData.phoneNumber : ''}
						<Divider flexItem />
						<ChatIcon /> {t('user.contact.chat.title')}
					</div>
					<div className='user-profile-container__banner__info'></div>
				</div>

				<div className='user-profile-container__offers'>
					<h3 className='user-profile-container__offers__header'>
						{t('user.userOffers')}
					</h3>
					<Divider />
					<div className='user-profile-container__offers__list'>
						{userOffers &&
							Object.values(userOffers).map((offer: Offer) => {
								return (
									<>
										<div className='user-profile-container__offers__list__item'>
											{/* <img
												src={offer.photos[0]}
												alt='offer'
												className='user-profile-container__offers__list__item__img'
											/> */}
											<div className='user-profile-container__offers__list__item__rating'>
												<Rating
													name='read-only'
													precision={0.5}
													max={1}
													value={1}
													readOnly
												/>
												<span>
													{offer.reviews &&
														Object.values(offer.reviews).reduce(
															(acc: number, review: any) =>
																acc + Number(review.rate),
															0
														) /
															Object.values(offer.reviews)
																.length}
												</span>
											</div>
											<div className='user-profile-container__offers__list__item__info'>
												<h3 className='user-profile-container__offers__list__item__info__title'>
													{offer.title}
												</h3>
												<p className='user-profile-container__offers__list__item__info__description'>
													{offer.description}
												</p>
											</div>
											<div className='user-profile-container__offers__list__item__link'>
												<Tooltip
													title='Przejdź do oferty'
													followCursor
													className='user-profile-container__offers__list__item__link__tooltip'
													onClick={() => {
														navigate('/offers/offer/' + offer.id)
													}}
												>
													<NearMeIcon />
												</Tooltip>
											</div>
										</div>
										<Divider flexItem />
									</>
								)
							})}
					</div>
				</div>
				<div className='user-profile-container__comments'>
					<h3 className='user-profile-container__comments__header'>
						{t('user.userComments')}
					</h3>
					<Divider />
					<div className='user-profile-container__comments__list'>
						{userReviews &&
							Object.values(userReviews).map((review: any) => {
								return (
									<>
										<div className='user-profile-container__comments__list__item'>
											<div className='user-profile-container__comments__list__item__header'>
												<Rating
													name='read-only'
													precision={1}
													max={5}
													value={review.rate}
													readOnly
												/>
												{review.offerTitle}
											</div>
											<div className='user-profile-container__comments__list__item__comment'>
												<span className='user-profile-container__comments__list__item__comment__user'>
													{review.reviewerName}:
												</span>
												<span className='user-profile-container__comments__list__item__comment__text'>
													{review.comment}
												</span>
											</div>
										</div>
										<Divider flexItem />
									</>
								)
							})}
					</div>
				</div>
			</div>
		</>
	)
}

export default Profile
