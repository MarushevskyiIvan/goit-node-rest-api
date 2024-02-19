const Joi = require('joi')

const userRegisterSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	password: Joi.string().min(6).required(),
})

module.exports = userRegisterSchema
