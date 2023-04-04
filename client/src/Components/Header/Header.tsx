import './style/style.css'
import React, { useState } from 'react'
import SearchBar from 'Components/SearchBar/SearchBar'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import UserPanel from './UserPanel/UserPanel'
import { useLocation } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import {
	SwipeableDrawer,
	List,
	ListItem,
	ListItemText,
	Box,
	Divider,
} from '@mui/material'

type Anchor = 'top' | 'left' | 'bottom' | 'right'

const Header = () => {
	const { t } = useTranslation()
	const pages = ['mainPage', 'offers', 'about', 'contact']
	const pathName = useLocation().pathname

	const [state, setState] = useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	})

	const toggleDrawer =
		(anchor: Anchor, open: boolean) =>
		(event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event &&
				event.type === 'keydown' &&
				((event as React.KeyboardEvent).key === 'Tab' ||
					(event as React.KeyboardEvent).key === 'Shift')
			) {
				return
			}

			setState({ ...state, [anchor]: open })
		}

	const list = (anchor: Anchor) => (
		<Box
			sx={{
				width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '70vw',
				height: '100vh',
				backgroundColor: '#1d201f',
			}}
			role='presentation'
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List>
				{pages.map((page, key) => {
					return (
						<div className='header__pages__links'>
							<ListItem
								key={key}
								component={Link}
								to={page === 'mainPage' ? '/' : `/${page}`}
							>
								<ListItemText
									primary={t(`pages.${page}`)}
									sx={{ color: 'white' }}
								/>
							</ListItem>
							<div className='header__pages__links__divider'></div>
						</div>
					)
				})}
			</List>
		</Box>
	)

	return (
		<div className='header'>
			<Link
				to='/'
				className='header__logo'
			>
				gotU
			</Link>
			<div className='header__pages'>
				<MenuIcon
					onClick={toggleDrawer('left', true)}
					sx={{ fontSize: '2rem', width: '100%', cursor: 'pointer' }}
				/>
				<SwipeableDrawer
					anchor='left'
					open={state.left}
					onClose={toggleDrawer('left', false)}
					onOpen={toggleDrawer('left', true)}
				>
					{list('left')}
				</SwipeableDrawer>
			</div>
			{/* {pathName.startsWith('/offers') && <SearchBar />} */}
			<SearchBar />

			<div className='header__links'>
				{pages.map((page, key) => {
					return (
						<Link
							key={key}
							to={page === 'mainPage' ? '/' : `/${page}`}
							className='header__links__link'
						>
							{t(`pages.${page}`)}
						</Link>
					)
				})}
			</div>
			<UserPanel />
		</div>
	)
}

export default Header
