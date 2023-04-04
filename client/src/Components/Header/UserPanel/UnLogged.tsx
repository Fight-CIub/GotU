import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const UnLogged = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	return (
		<button
			className='header__user-panel__login-in-btn'
			onClick={() => navigate('/auth/login')}
		>
			{t('auth.login.title')}
		</button>
	)
}

export default UnLogged
