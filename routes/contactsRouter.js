const express = require('express')

const {
	getAllContacts,
	getOneContact,
	createContact,
	updateContacts,
	deleteContact,
	updateFavorite,
} = require('../controllers/contacts')

const {
	createContactSchema,
	updateContactSchema,
	updateFavoriteSchema,
} = require('../schemas/contactsSchemas')

const { validateBody } = require('../middlewares')
const { isValidId } = require('../middlewares')

const contactsRouter = express.Router()

contactsRouter.get('/', getAllContacts)

contactsRouter.get('/:id', isValidId, getOneContact)

contactsRouter.post('/', validateBody(createContactSchema), createContact)

contactsRouter.put(
	'/:id',
	isValidId,
	validateBody(updateContactSchema),
	updateContacts
)

contactsRouter.patch(
	'/:id/favorite',
	isValidId,
	validateBody(updateFavoriteSchema),
	updateFavorite
)

contactsRouter.delete('/:id', isValidId, deleteContact)

module.exports = contactsRouter
