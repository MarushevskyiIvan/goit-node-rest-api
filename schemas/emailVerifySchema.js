const Joi = require('joi')

const emailVerifySchema = Joi.object({
	email: Joi.string().required(),
})

module.exports = emailVerifySchema
