import './style/style.css'

//import { useTranslation } from 'react-i18next'
import i18n from 'Config/i18n'

const LeftPanel = () => {
	//const { t } = useTranslation()

	const accountTypes = ['freeAccount', 'premiumAccount', 'premiumPlusAccount']
	const currency = '€'
	const randomAccountType =
		accountTypes[Math.floor(Math.random() * accountTypes.length)]

	return (
		<div>
			<div className='container__login__leftSide__title'>
				{i18n.t('auth.authLeftPanel.title')}
			</div>
			<div className='container__login__leftSide__premium'>
				<div className='container__login__leftSide__premium__title'>
					{i18n.t(`auth.authLeftPanel.${randomAccountType}.title`)}
				</div>
				<div className='container__login__leftSide__premium__price-tag'>
					{currency}
					{i18n.t(`auth.authLeftPanel.${randomAccountType}.price`)}
				</div>
				<div className='container__login__leftSide__premium__description'>
					{i18n.t(`auth.authLeftPanel.subtitle`)}:
				</div>
				<div className='container__login__leftSide__premium__options'>
					{i18n
						.t(`auth.authLeftPanel.${randomAccountType}.options`)
						.split('\n')
						.map((item: string, index: number) => {
							return (
								<div
									key={index}
									className='container__login__leftSide__premium__options__item'
								>
									• {item}
								</div>
							)
						})}
				</div>
			</div>
		</div>
	)
}

export default LeftPanel
