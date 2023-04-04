import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { Box, Button, Chip, Dialog, DialogContent, DialogTitle, Step, Stepper, Tooltip, Typography } from "@mui/material"
import { config } from "Config/config"
import { t } from "i18next"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import * as redux from "react-redux"
import * as customAlertSlice from "Store/features/CustomAlert/CustomAlertSlice"
const md5 = require("md5")

function isImageUrl(url: string) {
	const regex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i
	if (!/^https?:\/\/\S+$/.test(url)) {
		return false
	}
	return regex.test(url)
}
interface Props {
	open: boolean
	handleClose: () => void
}

interface dataProps {
	step1: {
		title: string
		description: string
		price: {
			amount: number
			currency: string
		}
	}
	step2: {
		images: string[]
	}
	step3: {
		tags: string[]
	}
}

interface stepProps {
	data: dataProps
	//setData: () => Dispatch<{}>
	setData: any
}

const Step1 = (props: stepProps) => {
	const { data, setData } = props
	// console.log(data)
	return (
		<div className='mainPage__profile-offers-container__add-offer-form'>
			<div className='mainPage__profile-offers-container__add-offer-form__group'>
				<label className='mainPage__profile-offers-container__add-offer-form__group__label'>{useTranslation().t("offers.addingOffer.addingTitle")}</label>
				<input
					className='mainPage__profile-offers-container__add-offer-form__group__input'
					type='text'
					placeholder={useTranslation().t("offers.addingOffer.placeholders.title")}
					value={data.step1.title}
					onChange={(e) => {
						setData({
							...data,
							step1: {
								...data.step1,
								title: e.target.value
							}
						})
					}}
				/>
			</div>
			<div className='mainPage__profile-offers-container__add-offer-form__group'>
				<label className='mainPage__profile-offers-container__add-offer-form__group__label'>{useTranslation().t("offers.addingOffer.addingDescription")}</label>
				<textarea
					className='mainPage__profile-offers-container__add-offer-form__group__input'
					placeholder={useTranslation().t("offers.addingOffer.placeholders.description")}
					value={data.step1.description}
					onChange={(e) => {
						setData({
							...data,
							step1: {
								...data.step1,
								description: e.target.value
							}
						})
					}}
				/>
			</div>
			<div className='mainPage__profile-offers-container__add-offer-form__group'>
				<label className='mainPage__profile-offers-container__add-offer-form__group__label'>{useTranslation().t("offers.addingOffer.addingPrice")}</label>
				<input
					type='number'
					className='mainPage__profile-offers-container__add-offer-form__group__input'
					placeholder={useTranslation().t("offers.addingOffer.placeholders.price")}
					value={data.step1.price.amount}
					onChange={(e) => {
						setData({
							...data,
							step1: {
								...data.step1,
								price: {
									...data.step1.price,
									amount: e.target.value
								}
							}
						})
					}}
				/>
			</div>
			<div className='mainPage__profile-offers-container__add-offer-form__group'>
				<label className='mainPage__profile-offers-container__add-offer-form__group__label'>{useTranslation().t("offers.addingOffer.addingCurrency")}</label>
				<input
					type='text'
					className='mainPage__profile-offers-container__add-offer-form__group__input'
					placeholder={useTranslation().t("offers.addingOffer.placeholders.currency")}
					style={{
						width: "10rem"
					}}
					value={data.step1.price.currency}
					onChange={(e) => {
						setData({
							...data,
							step1: {
								...data.step1,
								price: {
									...data.step1.price,
									currency: e.target.value
								}
							}
						})
					}}
				/>
			</div>
		</div>
	)
}
const Step2 = (props: stepProps) => {
	const { data, setData } = props

	const [link, setLink] = useState("")

	return (
		<div className='mainPage__profile-offers-container__add-offer-form'>
			<div className='mainPage__profile-offers-container__add-offer-form__group'>
				<label className='mainPage__profile-offers-container__add-offer-form__group__label'>{useTranslation().t("offers.addingOffer.addingImages")}</label>
				<input
					type='text'
					className='mainPage__profile-offers-container__add-offer-form__group__input'
					placeholder={useTranslation().t("offers.addingOffer.placeholders.images")}
					value={link}
					onChange={(e) => {
						setLink(e.target.value)
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							if (!isImageUrl(link)) return
							setLink("")
							setData({
								...data,
								step2: {
									images: [...data.step2.images, link]
								}
							})
						}
					}}
				/>
			</div>
			{Object.values(data.step2.images)
				.filter((el) => el.length > 0 && isImageUrl(el))
				.map((photo, index) => (
					<div className='mainPage__offer__container__content__offer-panel__edit-page__change-container__change__photos__photo'>
						<DeleteOutlineIcon
							onClick={() => {
								const newPhotos = Object.values(data.step2.images)
								newPhotos.splice(index, 1)
								setData({
									...data,
									step2: {
										images: newPhotos
									}
								})
							}}
							sx={{
								cursor: "pointer",
								color: "rgba(220, 100, 100, 1)"
							}}
						/>
						<span>
							{photo}
							<Tooltip title={t("offers.messages.clickToOpen")} arrow>
								<VisibilityIcon
									onClick={() => {
										window.open(photo)
									}}
									sx={{
										cursor: "pointer",
										color: "rgba(100, 100, 100, 1)"
									}}
								/>
							</Tooltip>
						</span>
					</div>
				))}
		</div>
	)
}

const Step3 = (props: stepProps) => {
	const { data, setData } = props

	const [tag, setTag] = useState("")

	return (
		<div className='mainPage__profile-offers-container__add-offer-form'>
			<div className='mainPage__profile-offers-container__add-offer-form__group'>
				<label className='mainPage__profile-offers-container__add-offer-form__group__label'>{useTranslation().t("offers.addingOffer.addingTags")}</label>
				<input
					type='text'
					className='mainPage__profile-offers-container__add-offer-form__group__input'
					placeholder={useTranslation().t("offers.addingOffer.placeholders.tags")}
					value={tag}
					onChange={(e) => {
						setTag(e.target.value)
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							if (tag.length < 2) return
							setTag("")
							setData({
								...data,
								step3: {
									tags: [...data.step3.tags, tag]
								}
							})
						}
					}}
				/>
			</div>
			<div style={{ display: "flex", flexDirection: "row", gap: "0.5rem", width: "100%", flexWrap: "wrap" }}>
				{Object.values(data.step3.tags)
					.filter((el) => el.length > 0)
					.map((tag, index) => (
						<div className='mainPage__offer__container__content__offer-panel__edit-page__change-container__change__photos__photo'>
							<Chip
								variant='outlined'
								color='success'
								label={tag}
								onDelete={() => {
									const newTags = Object.values(data.step3.tags)
									newTags.splice(index, 1)
									setData({
										...data,
										step3: {
											tags: newTags
										}
									})
								}}
							/>
						</div>
					))}
			</div>
		</div>
	)
}

const AddOffer = (props: Props) => {
	const { t } = useTranslation()
	const { useSelector } = redux
	const user_id = useSelector((state: any) => state.user.user.uid)
	console.log(user_id)
	const dispatch = redux.useDispatch()

	const [data, setData] = React.useState<dataProps>({
		step1: {
			title: "",
			description: "",
			price: {
				amount: 0,
				currency: ""
			}
		},
		step2: {
			images: []
		},
		step3: {
			tags: []
		}
	})

	const steps = ["step1", "step2", "step3"]
	const [activeStep, setActiveStep] = React.useState(0)
	const [completed, setCompleted] = React.useState<{
		[k: number]: boolean
	}>({})
	const totalSteps = () => {
		return steps.length
	}

	const completedSteps = () => {
		return Object.keys(completed).length
	}

	const allStepsCompleted = () => {
		return completedSteps() === totalSteps()
	}

	const isComplited = (): boolean => {
		let isComplete = false

		return isComplete
	}

	const handleNext = () => {
		let currentData
		let isComplete = false
		console.log(activeStep)
		switch (activeStep) {
			case 0:
				currentData = data.step1
				// console.log(currentData.title !== "" || currentData.description !== "" || currentData.price.amount > 0 || currentData.price.currency !== "")
				if (currentData.title !== "" && currentData.description !== "" && currentData.price.amount > 0 && currentData.price.currency !== "") {
					isComplete = true
				}

				break
			case 1:
				currentData = data.step2
				if (currentData.images.length > 0) {
					isComplete = true
				}
				break
			case 2:
				currentData = data.step3
				if (currentData.tags.length > 0) {
					isComplete = true
				}
				break
			default:
				break
		}

		const newActiveStep = activeStep + 1
		isComplete && setActiveStep(newActiveStep)
	}

	const handleFinish = () => {
		const dataToSend = {
			id: md5(data.step1.title + data.step1.description + data.step1.price.amount + data.step1.price.currency),
			title: data.step1.title,
			description: data.step1.description,
			tags: data.step3.tags,
			price: {
				amount: data.step1.price.amount,
				currency: data.step1.price.currency
			},
			creationTime: new Date().getTime(),
			createdBy: user_id,
			status: 1,
			photos: data.step2.images,
			reviews: [{}]
		}

		try {
			fetch(`${config.SERVER_URL}/offer/add`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(dataToSend)
			}).then((res: any) => {
				if (res && (res.status == "201" || res.status == "200")) {
					const props: any = {
						isOpen: true,
						severity: "success",
						variant: "standard",
						message: `${t("offers.messages.addSuccess")}`,
						anchor: { vertical: "bottom", horizontal: "center" }
					}
					dispatch(customAlertSlice.setCustomAlert(props))
					props.handleClose()
				}
			})
		} catch (e) {
			console.log(e)
		}
	}

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1)
	}

	const handleStep = (step: number) => () => {
		setActiveStep(step)
	}

	const handleReset = () => {
		setActiveStep(0)
		setCompleted({})
	}

	return (
		<Dialog open={props.open} maxWidth='md' fullWidth onClose={props.handleClose}>
			<DialogTitle>{t("offers.addingOffer.title")}</DialogTitle>
			<DialogContent>
				<Box sx={{ width: "100%" }}>
					<Stepper nonLinear activeStep={activeStep}>
						{steps.map((label, index) => (
							<Step
								key={label}
								completed={completed[index]}
								onClick={handleStep(index)}
								sx={{
									cursor: "pointer",
									"&:hover": {
										color: "rgba(24, 140, 93, .8)"
									},
									color: index === activeStep ? "rgba(24, 140, 93, 1)" : "black"
								}}
							>
								{t(`offers.steps.${label}`)}
							</Step>
						))}
					</Stepper>
					<Box>
						{allStepsCompleted() ? (
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center"
								}}
							>
								<Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
								<Button onClick={handleReset}>Reset</Button>
							</Box>
						) : (
							<Box>
								<Typography sx={{ mt: 2, mb: 1 }}>{activeStep === 0 ? <Step1 data={data} setData={setData} /> : activeStep === 1 ? <Step2 data={data} setData={setData} /> : <Step3 data={data} setData={setData} />}</Typography>
								<Box sx={{ display: "flex", flexDirection: "row", mt: 2 }}>
									<Box sx={{ flex: "1 1 auto" }}>
										<Button
											disabled={activeStep === 0}
											onClick={handleBack}
											style={{
												color: "rgba(24, 140, 93, 1)"
											}}
										>
											{t("offers.steps.back")}
										</Button>
									</Box>
									<Box
										sx={{
											flex: "1 1 auto",
											textAlign: "right",
											display: "flex",
											flexDirection: "row",
											justifyContent: "flex-end",
											gap: "2rem"
										}}
									>
										{activeStep === steps.length - 1 ? (
											<Button
												variant='contained'
												onClick={() => handleFinish()}
												style={{
													color: "white",
													backgroundColor: "rgba(24, 140, 93, 1)"
												}}
											>
												{t("offers.steps.finish")}
											</Button>
										) : (
											<Button
												variant='contained'
												onClick={() => handleNext()}
												style={{
													color: "white",
													backgroundColor: "rgba(24, 140, 93, 1)"
												}}
											>
												{t("offers.steps.next")}
											</Button>
										)}
									</Box>
								</Box>
							</Box>
						)}
					</Box>
				</Box>
			</DialogContent>
		</Dialog>
	)
}

export default AddOffer
