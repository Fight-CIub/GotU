import ChatIcon from '@mui/icons-material/Chat'
import ContactPageIcon from '@mui/icons-material/ContactPage'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox'
import PhoneIcon from '@mui/icons-material/Phone'
import { Avatar, Skeleton, Stack, Tooltip } from '@mui/material'
import { timestampToDate } from 'Assets/Utils/Utils'
import { config } from 'Config/config'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'

interface Props {
	userId: string
}

const UserPanel = (props: Props) => {
	const location = useLocation().pathname
	const navigate = useNavigate()
	const { t } = useTranslation()
	const clientLocation = location.split('/')[0]
	const fetchUser = async () => {
		const res = await fetch(
			`${config.SERVER_URL}/users/getUserData/${props.userId}`
		)
		return res.json()
	}
	const { data, isLoading, isError } = useQuery('user', fetchUser)

	const goToUserPage = () => {
		window.open(`${clientLocation}/profile/${data.displayName}`, '_blank')
	}

	const handleChatOpen = () => {
		console.log('Chat Open')
	}

	return (
		<div className='mainPage__offer__container__content__user-panel'>
			{isLoading ? (
				<>
					<Stack
						sx={{ width: '100%' }}
						flexDirection='row'
						gap={'1rem'}
					>
						<Skeleton
							variant='rounded'
							width={40}
							height={40}
						/>
						<Stack
							flexDirection='column'
							justifyContent='space-between'
							sx={{ width: '100%', height: '100%' }}
						>
							<Skeleton
								variant='text'
								width='20rem'
							/>
							<Skeleton
								variant='text'
								width='20rem'
								height='1rem'
							/>
						</Stack>
					</Stack>
					<div className='mainPage__offer__container__content__user-panel__user__divider'></div>
					<Skeleton
						variant='text'
						width='20rem'
					/>
					<Skeleton
						variant='text'
						width='20rem'
					/>
					<Skeleton
						variant='text'
						width='20rem'
					/>
				</>
			) : isError ? (
				<div className='mainPage__offer__container__content__user-panel__error'>
					Error
				</div>
			) : (
				<>
					<div className='mainPage__offer__container__content__user-panel__user'>
						<Tooltip title={t('user.goToProfile')}>
							<Avatar
								alt={data.displayName}
								src={data.photoURL}
								variant='rounded'
								className='mainPage__offer__container__content__user-panel__user__avatar'
								onClick={() => {
									goToUserPage()
								}}
							/>
						</Tooltip>
						<div className='mainPage__offer__container__content__user-panel__user__data'>
							<Tooltip title={t('user.goToProfile')}>
								<div
									className='mainPage__offer__container__content__user-panel__user__data__name'
									onClick={() => {
										goToUserPage()
									}}
								>
									{data.displayName}
								</div>
							</Tooltip>
							<div className='mainPage__offer__container__content__user-panel__user__data__sign-in-time'>
								{`${t('user.accountCreationTime')} ${timestampToDate(
									data.metadata.creationTime
								)}`}
							</div>
						</div>
					</div>
					<div className='mainPage__offer__container__content__user-panel__user__divider'></div>
					<div className='mainPage__offer__container__content__user-panel__user__contact'>
						<div className='mainPage__offer__container__content__user-panel__user__contact__title'>
							{t('user.contact.title')}
							<ContactPageIcon />
						</div>
						<div className='mainPage__offer__container__content__user-panel__user__contact__container'>
							<div className='mainPage__offer__container__content__user-panel__user__contact__container__label'>
								{t('user.contact.email')}:
							</div>
							<a
								href={`mailto: ${data.email}`}
								className='mainPage__offer__container__content__user-panel__user__contact__container__value'
							>
								{data.email}
								<ForwardToInboxIcon fontSize='small' />
							</a>
						</div>
						<div className='mainPage__offer__container__content__user-panel__user__contact__container'>
							<div className='mainPage__offer__container__content__user-panel__user__contact__container__label'>
								{t('user.contact.phone')}:
							</div>
							<div className='mainPage__offer__container__content__user-panel__user__contact__container__value'>
								{data.phoneNumber} <PhoneIcon fontSize='small' />
							</div>
						</div>
						<div className='mainPage__offer__container__content__user-panel__user__contact__container'>
							<div className='mainPage__offer__container__content__user-panel__user__contact__container__label'>
								{t('user.contact.chat.title')}:
							</div>
							<div
								className='mainPage__offer__container__content__user-panel__user__contact__container__value'
								onClick={handleChatOpen}
							>
								{t('user.contact.chat.action')}
								<ChatIcon fontSize='small' />
							</div>
						</div>
					</div>
					<div className='mainPage__offer__container__content__user-panel__user__divider'></div>
					<div className='mainPage__offer__container__content__user-panel__user__moreOffers'>
						<div className='mainPage__offer__container__content__user-panel__user__moreOffers__title'>
							{t('user.moreOffers.title')} {data.displayName}
						</div>
						<button
							className='mainPage__offer__container__content__user-panel__user__moreOffers__button'
							onClick={() => {
								navigate(
									`${clientLocation}/profile/${data.displayName}/offers`
								)
							}}
						>
							{t('user.moreOffers.goToOffers')} <DoubleArrowIcon />
						</button>
					</div>
				</>
			)}
		</div>
	)
}

export default UserPanel
