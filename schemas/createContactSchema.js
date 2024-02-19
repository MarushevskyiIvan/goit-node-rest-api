const Joi = require('joi')

const createContactSchema = Joi.object({
	name: Joi.string().min(2).max(30).required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
	favorite: Joi.boolean(),
})

module.exports = createContactSchema
