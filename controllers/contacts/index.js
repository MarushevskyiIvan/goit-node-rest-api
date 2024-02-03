const { ctrlWrapper } = require('../../helpers')
const getAllContacts = require('./getAllContacts')
const getOneContact = require('./getOneContact')
const deleteContact = require('./deleteContact')
const createContact = require('./createContact')
const updateContacts = require('./updateContacts')
const updateStatusContact = require('./updateStatusContact')

module.exports = {
	getAllContacts: ctrlWrapper(getAllContacts),
	getOneContact: ctrlWrapper(getOneContact),
	deleteContact: ctrlWrapper(deleteContact),
	createContact: ctrlWrapper(createContact),
	updateContacts: ctrlWrapper(updateContacts),
	updateStatusContact: ctrlWrapper(updateStatusContact),
}
