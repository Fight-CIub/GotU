import React from "react"
import { createRoot } from "react-dom/client"
import { QueryClient, QueryClientProvider } from "react-query"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import { store } from "./Store/store"
import "./index.css"
import reportWebVitals from "./reportWebVitals"

const container = document.getElementById("root")
const root = createRoot(container)
const queryClient = new QueryClient()

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<QueryClientProvider client={queryClient}>
					<App />
				</QueryClientProvider>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
