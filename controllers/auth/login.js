const User = require('../../models/user')
const { HttpError } = require('../../helpers')
const jwt = require('jsonwebtoken')

const { SECRET_KEY } = process.env

const login = async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email })

	if (!user || !user.verify || !user.comparePassword(password)) {
		throw HttpError(401, 'Email or password is wrong, or user not verified')
	}
	const payload = {
		id: user._id,
	}

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' })

	await User.findByIdAndUpdate(user._id, { token })
	res.json({
		token,
		user: { email: user.email, subscription: user.subscription },
	})
}

module.exports = login
