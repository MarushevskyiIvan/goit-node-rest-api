const { HttpError } = require('../../helpers')
const Contact = require('../../models/contact')

const updateContacts = async (req, res) => {
	const { id } = req.params
	const { name, email, phone } = req.body

	if (!name && !email && !phone) {
		throw HttpError(400, 'Body must have at least one field')
	}
	const result = await Contact.findByIdAndUpdate(id, req.body, { new: true })

	if (!result) {
		throw HttpError(404, 'Not found')
	}
	res.json(result)
}

module.exports = updateContacts
