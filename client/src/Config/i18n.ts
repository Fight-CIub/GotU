import en from "Assets/translations/en"
import pl from "Assets/translations/pl"
import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import Backend from "i18next-xhr-backend"
import { initReactI18next } from "react-i18next"

export const Languages = { en, pl }

i18n.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: Languages,
		debug: true,
		fallbackLng: "pl",
		interpolation: {
			escapeValue: false
		},
		react: {
			useSuspense: false
		}
	})

export default i18n
