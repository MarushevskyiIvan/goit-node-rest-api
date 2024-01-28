const { HttpError } = require('../../helpers')

const Contact = require('../../models/contact')

const deleteContact = async (req, res) => {
	const { id } = req.params
	const result = await Contact.findByIdAndDelete(id)

	if (!result) {
		throw HttpError(404, 'Not found')
	}
	res.json(result)
}

module.exports = deleteContact
