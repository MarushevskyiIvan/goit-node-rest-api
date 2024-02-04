const express = require('express')
const { register, login, current, logout } = require('../controllers/auth')
const { validateBody, authenticate } = require('../middlewares')
const {
	userRegisterSchema,
	userLoginSchema,
} = require('../schemas/contactsSchemas')

const authRouter = express.Router()

authRouter.post('/register', validateBody(userRegisterSchema), register)
authRouter.post('/login', validateBody(userLoginSchema), login)
authRouter.get('/current', authenticate, current)
authRouter.post('/logout', authenticate, logout)

module.exports = authRouter
