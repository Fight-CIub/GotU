import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'

//import 'Config/firebase'

const CORS = require('cors')

dotenv.config()

const app: Express = express()
const port = 8000

app.use(express.json())
app.use(CORS())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
	res.send('Nie ma tu nic ciekawego🧢')
})

//Auth routes
app.use('/api/auth', require('./routes/auth'))

//Users routes
app.use('/api/users', require('./routes/users'))

//Offers routes
app.use('/api/offer', require('./routes/offer'))

//Reviews routes
app.use('/api/review', require('./routes/review'))

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
