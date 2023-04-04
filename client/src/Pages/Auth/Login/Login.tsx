import { config, firebase } from "Config/config"
import * as customAlertSlice from "Store/features/CustomAlert/CustomAlertSlice"
import * as userSlice from "Store/features/User/userSlice"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import React from "react"
import { useTranslation } from "react-i18next"
import * as redux from "react-redux"
import { useNavigate } from "react-router-dom"
import "./style/style.css"

import { CustomAlertProps as Props } from "Assets/Models/CustomAlertProps"

const Login = () => {
	const { t } = useTranslation()
	const { useState } = React
	const fields = ["email", "password"]

	const dispatch = redux.useDispatch()

	const [userData, setUserData] = useState({
		email: "",
		password: ""
	})
	const navigate = useNavigate()
	const { SERVER_URL } = config

	const handleLogin = () => {
		const auth = getAuth(firebase)
		try {
			signInWithEmailAndPassword(auth, userData.email, userData.password).then((userCredentials) => {
				try {
					fetch(`${SERVER_URL}/users/getUserData/${userCredentials.user.uid}`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json"
						}
					}).then((response) => {
						if (response.status === 200 || response.status === 201) {
							response.json().then((data) => {
								console.log(data)
								dispatch(userSlice.setUserAuthStatus(true))
								dispatch(userSlice.setUserData(data))
								const props: Props = {
									isOpen: true,
									severity: "success",
									variant: "standard",
									message: `${t("authMessages.login.success")} ${data.displayName}`,
									anchor: { vertical: "bottom", horizontal: "center" }
								}
								dispatch(customAlertSlice.setCustomAlert(props))
								localStorage.setItem("userAuthStatus", "true")
								localStorage.setItem("userData", JSON.stringify(data))
								navigate("/")
							})
						}
					})
				} catch (error) {
					//console.log(error)
				}
			})
		} catch (error) {
			console.error(error)
			const props: Props = {
				isOpen: true,
				severity: "error",
				variant: "standard",
				message: `${t("authMessages.login.failed")}`,
				anchor: { vertical: "bottom", horizontal: "center" }
			}
			dispatch(customAlertSlice.setCustomAlert(props))
		}
	}

	return (
		<form autoComplete='off' className='container__login__rightSide__form'>
			{fields.map((field, key) => {
				return (
					<div key={key} className='container__login__rightSide__form__input-container'>
						<label className='container__login__rightSide__form__input-container_label'>
							{t(`auth.login.${field}`)}
						</label>
						<input
							className='container__login__rightSide__form__input-container__input'
							type={field === "password" || field === "email" ? field : "text"}
							id={`${field}Input`}
							autoComplete='false'
							placeholder={t(`auth.login.enter${field}`)}
							onChange={(e) => {
								setUserData({
									...userData,
									[field]: e.target.value
								})
							}}
						/>
					</div>
				)
			})}
			<div className='container__login__rightSide__form__button-container'>
				<button
					className='container__login__rightSide__form__button-container__button'
					type='button'
					onClick={() => handleLogin()}
				>
					{t("auth.login.submit")}
				</button>
			</div>
		</form>
	)
}

export default Login
