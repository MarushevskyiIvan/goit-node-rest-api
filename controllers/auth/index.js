const { ctrlWrapper } = require('../../helpers')

const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const current = require('./current')

module.exports = {
	register: ctrlWrapper(register),
	login: ctrlWrapper(login),
	logout: ctrlWrapper(logout),
	current: ctrlWrapper(current),
}
