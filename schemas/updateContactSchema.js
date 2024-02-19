const Joi = require('joi')

const updateContactSchema = Joi.object({
	name: Joi.string().min(2).max(30),
	email: Joi.string(),
	phone: Joi.string(),
	favorite: Joi.boolean(),
})

module.exports = updateContactSchema
