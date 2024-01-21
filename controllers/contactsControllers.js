const {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
} = require('../services/contactsServices.js')
const HttpError = require('../helpers/HttpError.js')

const ctrlWrapper = require('../helpers/ctrlWrapper.js')

const getAllContacts = async (req, res) => {
	const result = await listContacts()
	res.json(result)
}

const getOneContact = async (req, res) => {
	const { id } = req.params
	const result = await getContactById(id)

	if (!result) {
		throw HttpError(404, 'Not found')
	}
	res.json(result)
}

const createContact = async (req, res) => {
	const result = await addContact(req.body)
	res.status(201).json(result)
}

const updateContacts = async (req, res) => {
	const { id } = req.params
	const { name, email, phone } = req.body

	if (!name && !email && !phone) {
		throw HttpError(400, 'Body must have at least one field')
	}
	const result = await updateContact(id, req.body)

	if (!result) {
		throw HttpError(404, 'Not found')
	}
	res.json(result)
}

const deleteContact = async (req, res) => {
	const { id } = req.params
	const result = await removeContact(id)

	if (!result) {
		throw HttpError(404, 'Not found')
	}
	res.json(result)
}

module.exports = {
	getAllContacts: ctrlWrapper(getAllContacts),
	getOneContact: ctrlWrapper(getOneContact),
	deleteContact: ctrlWrapper(deleteContact),
	createContact: ctrlWrapper(createContact),
	updateContacts: ctrlWrapper(updateContacts),
}
