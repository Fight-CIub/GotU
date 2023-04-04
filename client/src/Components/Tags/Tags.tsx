import React from 'react'
import { useTranslation } from 'react-i18next'
import { Chip } from '@mui/material'
import { useSelector } from 'react-redux'
import { Tag } from 'Assets/Models/SearchBar'
import { useDispatch } from 'react-redux'
import * as searchBarSlice from 'Store/features/SearchBar/SearchBarSlice'

const Tags = () => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const tags: Tag[] = useSelector((state: any) => state.searchBar.tags)
	return (
		<div className='mainPage__tags-bar__container'>
			<div className='mainPage__tags-bar__container__content'>
				<div className='mainPage__tags-bar__container__content__title'>
					{t('landing.pageTitle')}
				</div>
				<div className='mainPage__tags-bar__container__content__tags-selector'>
					<button
						className='mainPage__tags-bar__container__content__tags-selector__clear-btn'
						onClick={() => {
							dispatch(searchBarSlice.removeAllTags())
						}}
					>
						{t('landing.clearTags')}
					</button>
					{tags.map((tag: any) => {
						return (
							<Chip
								variant='outlined'
								color='success'
								label={tag}
								onDelete={() => {
									dispatch(searchBarSlice.removeTag(tag))
								}}
							/>
						)
					})}
				</div>
				<div className='mainPage__tags-bar__container__content__description'>
					{t('landing.pageDescription')}
				</div>
			</div>
		</div>
	)
}

export default Tags
