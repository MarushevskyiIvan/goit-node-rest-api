const express = require('express')

const {
	getAllContacts,
	getOneContact,
	createContact,
	updateContacts,
	deleteContact,
	updateStatusContact,
} = require('../controllers/contacts')

const {
	createContactSchema,
	updateContactSchema,
	updateFavoriteSchema,
} = require('../schemas/contactsSchemas')

const { validateBody, authenticate } = require('../middlewares')
const { isValidId } = require('../middlewares')

const contactsRouter = express.Router()

contactsRouter.get('/', authenticate, getAllContacts)
contactsRouter.get('/:id', authenticate, isValidId, getOneContact)

contactsRouter.post(
	'/',
	authenticate,
	validateBody(createContactSchema),
	createContact
)

contactsRouter.put(
	'/:id',
	authenticate,
	isValidId,
	validateBody(updateContactSchema),
	updateContacts
)

contactsRouter.patch(
	'/:id/favorite',
	authenticate,
	isValidId,
	validateBody(updateFavoriteSchema),
	updateStatusContact
)

contactsRouter.delete('/:id', authenticate, isValidId, deleteContact)

module.exports = contactsRouter
