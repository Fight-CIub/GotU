import { Pagination } from "@mui/material"
import { useNavigate } from "react-router-dom"

interface Props {
	paginationCount: number
	pageNumber: string
}

const OfferPagination = (props: Props) => {
	const { paginationCount, pageNumber } = props
	const navigate = useNavigate()

	return (
		<div className='mainPage__offers__container__content__pagination'>
			<Pagination
				count={paginationCount}
				shape='rounded'
				variant='outlined'
				page={Number(pageNumber) || 1}
				onChange={(e, page) => {
					navigate(`/offers/page/${page}`)
				}}
				sx={{
					"& .MuiPaginationItem-root": {
						color: "white"
					},
					"& .Mui-selected": {
						background: "white",
						color: "black"
					},
					"& .MuiPaginationItem-outlined": {
						borderColor: "white"
					},
					"& .MuiPaginationItem-previousNext": {
						margin: "0 .75rem"
					}
				}}
			/>
		</div>
	)
}

export default OfferPagination
