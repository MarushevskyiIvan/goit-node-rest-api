const path = require('path')
const fs = require('fs/promises')
const User = require('../../models/user')

const avatarsDir = path.join(__dirname, '../..', 'public', 'avatars')

const updateAvatar = async (req, res) => {
	const { _id } = req.user

	const { path: tmpUpload, originalname } = req.file

	const filename = `${_id}_${originalname}`

	const resultUpload = path.join(avatarsDir, filename)
	await fs.rename(tmpUpload, resultUpload)

	const avatarURL = path.join('avatar', filename)

	await User.findByIdAndUpdate(_id, { avatarURL })

	res.json({ avatarURL })
}

module.exports = updateAvatar
