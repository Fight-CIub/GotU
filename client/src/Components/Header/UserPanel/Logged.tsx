import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { Avatar, Divider, Menu, MenuItem, Tooltip } from '@mui/material'
import { CustomAlertProps as Props } from 'Assets/Models/CustomAlertProps'
import * as customAlertSlice from 'Store/features/CustomAlert/CustomAlertSlice'
import * as userSlice from 'Store/features/User/userSlice'
import React from 'react'
import { useTranslation } from 'react-i18next'
import * as redux from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Logged = () => {
	const navigate = useNavigate()
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}
	const dispatch = redux.useDispatch()

	const handleLogout = () => {
		dispatch(userSlice.clearUserData())
		dispatch(userSlice.setUserAuthStatus(false))
		const props: Props = {
			isOpen: true,
			severity: 'success',
			variant: 'standard',
			message: `${t('authMessages.logout.success')}`,
			anchor: { vertical: 'bottom', horizontal: 'center' },
		}
		dispatch(customAlertSlice.setCustomAlert(props))
		//navigate('/')
	}
	const { t } = useTranslation()

	const pages = ['profile', 'my-offers', 'chat', 'settings']

	const userName = useSelector((state: any) => state.user.user.displayName)

	return (
		<div className='header__user-panel'>
			<Tooltip title={t('pages.profile')}>
				<Avatar
					sx={{ bgcolor: 'rgba(24, 140, 93, 1)', cursor: 'pointer' }}
					alt={useSelector((state: any) => state.user.user.displayName)}
					src={useSelector((state: any) => state.user.user.photoURL)}
					onClick={() => navigate(`/profile/${userName}`)}
				>
					{useSelector((state: any) => state.user.user.displayName).charAt(
						0
					)}
				</Avatar>
			</Tooltip>
			<div
				className='header__user-panel__menu-btn'
				onClick={handleClick}
			>
				{useSelector((state: any) => state.user.user.displayName)}
				{open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
			</div>
			<Menu
				id='basic-menu'
				anchorEl={anchorEl}
				open={open}
				disableScrollLock={true}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				{pages.map((page, index) => (
					<MenuItem
						key={index}
						sx={{ paddingRight: '3rem' }}
						onClick={() => {
							handleClose()
							navigate(
								page === 'profile'
									? `/${page}/${userName}`
									: page === 'my-offers'
									? `/profile/${userName}/offers`
									: `/${page}`
							)
						}}
					>
						{t(`pages.${page}`)}
					</MenuItem>
				))}
				<Divider />
				<MenuItem
					onClick={() => {
						handleLogout()
					}}
				>
					{t('pages.logout')}
				</MenuItem>
			</Menu>
		</div>
	)
}

export default Logged
