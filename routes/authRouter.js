const express = require('express')
const {
	register,
	login,
	current,
	logout,
	updateAvatar,
	verifyEmail,
	resendVerifyEmail,
} = require('../controllers/auth')

const { validateBody, authenticate, upload } = require('../middlewares')

const {
	userRegisterSchema,
	userLoginSchema,
	emailVerifySchema,
} = require('../schemas')

const authRouter = express.Router()

// sing up
authRouter.post('/register', validateBody(userRegisterSchema), register)
authRouter.get('/verify/:verificationToken', verifyEmail)
authRouter.post('/verify', validateBody(emailVerifySchema), resendVerifyEmail)

// sing in
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
