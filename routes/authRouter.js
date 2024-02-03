const express = require('express')
const { registration, login } = require('../controllers/auth')
const { validateBody } = require('../middlewares')
const {
	userRegisterSchema,
	userLoginSchema,
} = require('../schemas/contactsSchemas')

const authRouter = express.Router()

authRouter.post('/register', validateBody(userRegisterSchema), registration)
authRouter.post('/login', validateBody(userLoginSchema), login)
authRouter.post('/list')

module.exports = authRouter
