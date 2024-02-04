const User = require('../../models/user')
const { HttpError } = require('../../helpers')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = process.env

const login = async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email })
	if (!user || !user.comparePassword(password)) {
		throw HttpError(401, 'Email or password is wrong ')
	}
	const payload = {
		id: user._id,
	}

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' })

	await User.findByIdAndUpdate(user._id, { token })
	res.json({ status: 'success', code: 200, data: { token } })
}

module.exports = login
