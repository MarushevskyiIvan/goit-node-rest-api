const nodemailer = require('nodemailer')
const { META_PASSWORD } = process.env

const nodemailerConfig = {
	host: 'smtp.meta.ua',
	port: 465,
	secure: true,
	auth: {
		user: 'marushevskyi@meta.ua',
		pass: META_PASSWORD,
	},
}

const transport = nodemailer.createTransport(nodemailerConfig)

const sendEmail = async data => {
	const email = { ...data, from: 'marushevskyi@meta.ua' }

	try {
		await transport.sendMail(email)
		return true
	} catch (error) {
		throw error
	}
}

module.exports = sendEmail
