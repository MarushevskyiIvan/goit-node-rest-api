const express = require('express')
const {
	register,
	login,
	current,
	logout,
	updateAvatar,
} = require('../controllers/auth')

const { validateBody, authenticate, upload } = require('../middlewares')

const {
	userRegisterSchema,
	userLoginSchema,
} = require('../schemas/contactsSchemas')

const authRouter = express.Router()

authRouter.post('/register', validateBody(userRegisterSchema), register)
authRouter.post('/login', validateBody(userLoginSchema), login)
authRouter.get('/current', authenticate, current)
authRouter.patch('/logout', authenticate, logout)

authRouter.patch(
	'/avatars',
	authenticate,
	upload.single('avatar'),
	updateAvatar
)

module.exports = authRouter
