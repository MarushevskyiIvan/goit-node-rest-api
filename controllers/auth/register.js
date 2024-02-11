const User = require('../../models/user')
const { HttpError } = require('../../helpers')
const bcryptjs = require('bcryptjs')
const gravatar = require('gravatar')

const register = async (req, res) => {
	const { email, password } = req.body
	const user = await User.findOne({ email })

	if (user) {
		throw HttpError(409, `Email ${email} is already in use`)
	}
	const hashPassword = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10))

	const avatarUrl = gravatar.url(email)

	const result = await User.create({
		...req.body,
		password: hashPassword,
		avatarUrl,
	})

	res.status(201).json({
		user: {
			email: result.email,
			subscription: result.subscription,
		},
	})
}

module.exports = register
