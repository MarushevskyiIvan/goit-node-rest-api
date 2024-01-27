const fs = require('fs/promises')
const { nanoid } = require('nanoid')
const path = require('path')

const contactPath = path.join(__dirname, '../db/contacts.json')

const getContactList = async () => {
	return JSON.parse(await fs.readFile(contactPath))
}

async function listContacts() {
	const contacts = await getContactList()
	return contacts
}

async function getContactById(id) {
	const contacts = await listContacts()

	const contactById = contacts.find(contact => contact.id === id)
	return contactById || null
}

async function addContact({ name, email, phone }) {
	const contacts = await getContactList()

	const newContact = { id: nanoid(), ...{ name, email, phone } }
	contacts.push(newContact)

	await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2))
	return newContact
}

async function removeContact(id) {
	const contacts = await listContacts()

	const index = contacts.findIndex(contact => contact.id === id)

	if (index === -1) {
		return null
	}

	const [deleteContact] = contacts.splice(index, 1)

	await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2))
	return deleteContact
}

async function updateContact(id, body) {
	const contacts = await listContacts()

	const index = contacts.findIndex(contact => contact.id === id)

	if (index === -1) {
		return null
	}

	contacts[index] = { ...contacts[index], ...body }

	await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2))
	return contacts[index]
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
}
