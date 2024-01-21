const express = require('express')
const {
	getAllContacts,
	getOneContact,
	createContact,
	updateContacts,
	deleteContact,
} = require('../controllers/contactsControllers')

const {
	createContactSchema,
	updateContactSchema,
} = require('../schemas/contactsSchemas')

const validateBody = require('../helpers/validateBody')
const contactsRouter = express.Router()

contactsRouter.get('/', getAllContacts)

contactsRouter.get('/:id', getOneContact)

contactsRouter.post('/', validateBody(createContactSchema), createContact)

contactsRouter.put('/:id', validateBody(updateContactSchema), updateContacts)

contactsRouter.delete('/:id', deleteContact)

module.exports = contactsRouter
