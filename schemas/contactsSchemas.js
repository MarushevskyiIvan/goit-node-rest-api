const Joi = require('joi')

const createContactSchema = Joi.object({
	name: Joi.string().min(2).max(30).required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
	favorite: Joi.boolean(),
})

const updateContactSchema = Joi.object({
	name: Joi.string().min(2).max(30),
	email: Joi.string(),
	phone: Joi.string(),
	favorite: Joi.boolean(),
})

const updateFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required(),
})

module.exports = {
	createContactSchema,
	updateContactSchema,
	updateFavoriteSchema,
}
