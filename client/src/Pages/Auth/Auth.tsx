import React from 'react'
import './style/style.css'
import LeftPanel from './LeftPanel/LeftPanel'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useTranslation } from 'react-i18next'

import Login from './Login/Login'
import Register from './Register/Register'

interface LinkTabProps {
	label?: string
	href?: string
}

const LinkTab = (props: LinkTabProps) => {
	const pathName = useLocation().pathname
	return (
		<Link
			to={props.href}
			className={
				pathName.endsWith(props.href) ||
				(pathName === '/auth' && props.href !== '/auth/login')
					? 'highlited'
					: ''
			}
		>
			{props.label}
		</Link>
	)
}

const Auth = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()

	const pathName = useLocation().pathname

	const isUserLoggedIn = useSelector((state: any) => state.user.isUserLoggedIn)
	if (isUserLoggedIn) {
		navigate('/')
	}

	return (
		<div className='container'>
			<div className='container__login'>
				<div className='container__login__leftSide'>
					<LeftPanel />
				</div>
				<div className='container__login__rightSide'>
					<div className='container__login__rightSide__logo'>Got U</div>
					<div className='container__login__rightSide__tabs'>
						<LinkTab
							label={t('auth.login.title')}
							href='/auth/login'
						/>
						<div className='container__login__rightSide__tabs__divider' />
						<LinkTab
							label={t('auth.register.title')}
							href='/auth/register'
						/>
					</div>
					<div className='container__login__rightSide__form-container'>
						{pathName.endsWith('login') ? <Login /> : <Register />}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Auth
