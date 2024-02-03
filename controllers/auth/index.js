const { ctrlWrapper } = require('../../helpers')

const registration = require('./register')
const login = require('./login')
const logout = require('./logout')

module.exports = {
	registration: ctrlWrapper(registration),
	login: ctrlWrapper(login),
	logout: ctrlWrapper(logout),
}
