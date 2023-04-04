import { createSlice } from '@reduxjs/toolkit'
import { SearchBarProps } from 'Assets/Models/SearchBar'
import { useLocation } from 'react-router-dom'

const initialState: SearchBarProps = {
	search: '',
	visibility: true,
	tags: [],
}

export const SearchBarSlice = createSlice({
	name: 'searchBar',
	initialState,
	reducers: {
		setSearch: (state, action) => {
			state.search = action.payload
		},
		addTag: (state, action) => {
			if (!state.tags.find((tag) => tag === action.payload))
				state.tags.push(action.payload)
		},
		removeTag: (state, action) => {
			state.tags = state.tags.filter((tag) => tag !== action.payload)
		},
		removeAllTags: (state) => {
			state.tags = []
		},
		setVisibilityInHeader: (state, action) => {
			state.visibility = action.payload
		},
		clearSearch: (state) => {
			state.search = ''
		},
	},
})

export const {
	setSearch,
	setVisibilityInHeader,
	addTag,
	removeTag,
	removeAllTags,
	clearSearch,
} = SearchBarSlice.actions

export default SearchBarSlice.reducer
