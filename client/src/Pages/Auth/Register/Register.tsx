import { CustomAlertProps as Props } from "Assets/Models/CustomAlertProps"
import { config } from "Config/config"
import * as customAlertSlice from "Store/features/CustomAlert/CustomAlertSlice"
import React from "react"
import { useTranslation } from "react-i18next"
import * as redux from "react-redux"
import { useNavigate } from "react-router-dom"
import "./../Login/style/style.css"

interface sortedData {
	email: string
	password: string
	displayName: string
}

const Register = () => {
	const dispatch = redux.useDispatch()
	const { t } = useTranslation()
	const { useState } = React
	const { SERVER_URL } = config
	const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	const navigate = useNavigate()

	// const [passwordCorrect, setPasswordCorrect] = useState<Boolean[]>([false, false])
	const [inputCorrect, setInputCorrect] = useState<any>({
		email: false,
		password: false,
		username: false
	})
	const [userData, setUserData] = useState({
		email: "",
		displayName: "",
		password: ""
	})
	const fields = ["email", "password", "displayName"]

	const handleRegistration = async () => {
		const sortedData: sortedData = {
			email: userData.email,
			password: userData.password,
			displayName: userData.displayName
		}
		if (checkIfDataValid()) {
			try {
				//console.log(sortedData)
				await fetch(`${SERVER_URL}/auth/register`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(sortedData)
				})
					.then((res) => {
						if (res.status === 201) {
							return res.json()
						} else {
							const props: Props = {
								isOpen: true,
								severity: "error",
								variant: "standard",
								message: `${t("authMessages.register.failed")}`,
								anchor: { vertical: "bottom", horizontal: "center" }
							}
							dispatch(customAlertSlice.setCustomAlert(props))

							/* const error = new Error(res.statusText)
							throw error */
						}
					})
					.then((res) => {
						//console.log(res)
						const sortedUserData = {
							email: res.user.email,
							uid: res.user.uid,
							displayName: res.user.displayName
						}
						fetch(`${SERVER_URL}/users/add`, {
							method: "POST",
							headers: {
								"Content-Type": "application/json"
							},
							body: JSON.stringify(sortedUserData)
						}).then((res) => {
							if (res.status === 201) {
								const props: Props = {
									isOpen: true,
									severity: "success",
									variant: "standard",
									message: `${t("authMessages.register.success")}`,
									anchor: { vertical: "bottom", horizontal: "center" }
								}
								dispatch(customAlertSlice.setCustomAlert(props))
								navigate("login")
							} else {
							}
						})
					})
			} catch (error) {
				//console.log(error)
			}
		} else {
			const props: Props = {
				isOpen: true,
				severity: "error",
				variant: "standard",
				message: `${t("authMessages.register.checkData")}`,
				anchor: { vertical: "bottom", horizontal: "center" }
			}
			dispatch(customAlertSlice.setCustomAlert(props))
		}
		//console.log(sortedData)
	}

	const validateEmail = (data: sortedData) => {
		if (data.email && data.email.length > 0 && regexEmail.test(data.email)) {
			// console.log("email is valid", data.email)
			// console.log(...inputCorrect)
			const newInputCorret = { ...inputCorrect }
			newInputCorret.email = true
			// console.log("email correct", newInputCorret)
			//console.log('before update state', newInputCorret)
			setInputCorrect(newInputCorret)
			//console.log('after update state', inputCorrect)
		} else {
			//console.log('email is not at all valid')

			const newInputCorret = { ...inputCorrect }
			newInputCorret.email = false
			setInputCorrect(newInputCorret)
			//console.log(inputCorrect)
		}
	}
	const validatePassword = (data: sortedData) => {
		if (data.password && data.password.length >= 8) {
			// console.log("password is valid")
			const newInputCorret = { ...inputCorrect }
			newInputCorret.password = true
			setInputCorrect(newInputCorret)
		} else {
			const newInputCorret = { ...inputCorrect }
			newInputCorret.password = false
			setInputCorrect(newInputCorret)
		}
		//return inputCorrect.password
	}

	const validateUsername = (data: sortedData) => {
		if (data.displayName && data.displayName.length >= 3) {
			// console.log("username is valid")
			const newInputCorret = { ...inputCorrect }
			newInputCorret.displayName = true
			setInputCorrect(newInputCorret)
		} else {
			const newInputCorret = { ...inputCorrect }
			newInputCorret.displayName = false
			setInputCorrect(newInputCorret)
		}
		//return inputCorrect.displayName
	}
	const validate = (field: string) => {
		switch (field) {
			case "email":
				validateEmail(userData)
				break
			case "password":
				validatePassword(userData)
				break
			case "displayName":
				validateUsername(userData)
				break
		}
	}
	const checkIfDataValid = () => {
		if (inputCorrect.displayName && inputCorrect.password && inputCorrect.email) return true
		else return false
	}

	return (
		<form autoComplete='off' className='container__login__rightSide__form'>
			{fields.map((field, index) => {
				//console.log(inputCorrect[field])
				return (
					<div className='container__login__rightSide__form__input-container' key={index}>
						<label className={"container__login__rightSide__form__input-container_label" + (inputCorrect[field] ? " input-correct-" + field : " input-incorrect-" + field)}>{t(`auth.register.${field}`)}</label>
						<input
							className={"container__login__rightSide__form__input-container__input"}
							//type={field}
							type={field === "password" ? "password" : field === "email" ? "email" : "text"}
							id={`${field}Input`}
							autoComplete='false'
							placeholder={t(`auth.register.enter${field}`)}
							onChange={(e) => {
								setUserData({ ...userData, [field]: e.target.value })
								// checkIfDataValid({ ...userData })
								validate(field)
							}}
						/>
					</div>
				)
			})}
			<div className='container__login__rightSide__form__button-container'>
				<button className='container__login__rightSide__form__button-container__button' type='button' onClick={() => handleRegistration()}>
					{t("auth.register.submit")}
				</button>
			</div>
		</form>
	)
}

export default Register
