const User = require('../../models/user')
const bcryptjs = require('bcryptjs')
const gravatar = require('gravatar')
const { nanoid } = require('nanoid')
const { HttpError, sendEmail } = require('../../helpers')

const { BASE_URL } = process.env

const register = async (req, res) => {
	const { email, password } = req.body
	const user = await User.findOne({ email })

	if (user) {
		throw HttpError(409, `Email ${email} is already in use`)
	}

	const verificationToken = nanoid()

	const hashPassword = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10))

	const avatarURL = gravatar.url(email)

	const result = await User.create({
		...req.body,
		password: hashPassword,
		avatarURL,
		verificationToken,
	})

	const verifyEmail = {
		to: email,
		subject: 'Verify email',
		html: `<a target="_blank" href="${BASE_URL}/auth/verify/${verificationToken}">Click verify email</a>`,
	}
	await sendEmail(verifyEmail)

	res.status(201).json({
		user: {
			email: result.email,
			subscription: result.subscription,
			avatarURL,
		},
	})
}

module.exports = register
