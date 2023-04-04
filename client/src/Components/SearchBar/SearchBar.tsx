import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as redux from 'react-redux'
import * as SearchBarSlice from 'Store/features/SearchBar/SearchBarSlice'
import './style/style.css'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {
	const { useSelector } = redux
	const dispatch = redux.useDispatch()
	const { t } = useTranslation()
	const [search, setSearch] = useState('')
	const pathName = useLocation().pathname

	return (
		<div
			className='header__search-bar'
			style={{
				/* visibility: useSelector((state: any) => state.searchBar.visibility)
					? 'visible'
					: 'hidden', */
				visibility: pathName === '/offers' ? 'visible' : 'hidden',
			}}
		>
			<input
				type='text'
				placeholder={t('searchBar.placeholder')}
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				onKeyUp={(e) => {
					if (
						(e.key === 'Enter' || e.key === ',') &&
						search.length > 0 &&
						!search.startsWith(',')
					) {
						dispatch(SearchBarSlice.addTag(search.replaceAll(',', '')))
						setSearch('')
					}
				}}
			/>
		</div>
	)
}

export default SearchBar
