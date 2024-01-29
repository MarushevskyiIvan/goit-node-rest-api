const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const path = require('path')
const configPath = path.join(__dirname, '.', 'config', '.env')

require('dotenv').config({ path: configPath })
require('colors')

const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

const contactsRouter = require('./routes/contactsRouter.js')
const app = express()
const { DB_HOST, PORT } = process.env

app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((_, res) => {
	res.status(404).json({ message: 'Route not found' })
})

app.use((err, req, res, next) => {
	const { status = 500, message = 'Server error' } = err
	res.status(status).json({ message })
})

mongoose
	.connect(DB_HOST)
	.then(
		app.listen(PORT, () => {
			console.log('Database connection successful'.green.italic.bold)
		})
	)
	.catch(error => {
		console.log(`Database connection error ${error.message}`.red.italic.bold)
		process.exit(1)
	})
