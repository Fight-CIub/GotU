import { useNavigate } from 'react-router-dom'

const NotFound = () => {
	const navigate = useNavigate()
	return (
		<div>
			tu się coś fajnego zrobi w wolnej chwili
			<button onClick={() => navigate(-1)}>
				wróć do poprzedniej strony
			</button>
		</div>
	)
}

export default NotFound
