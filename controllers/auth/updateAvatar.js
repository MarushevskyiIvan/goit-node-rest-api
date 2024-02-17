const path = require('path')
const fs = require('fs/promises')
const User = require('../../models/user')
const Jimp = require('jimp')

const avatarsDir = path.join(__dirname, '../..', 'public', 'avatars')

const updateAvatar = async (req, res) => {
	const { _id } = req.user

	const { path: tmpUpload, originalname } = req.file

	const filename = `${_id}_${originalname}`

	const resultUpload = path.join(avatarsDir, filename)
	const jimpImg = await Jimp.read(tmpUpload)
	await jimpImg
		.autocrop()
		.cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE)
		.writeAsync(tmpUpload)

	await fs.rename(tmpUpload, resultUpload)

	const avatarURL = path.join('avatar', filename)

	await User.findByIdAndUpdate(_id, { avatarURL })

	res.json({ avatarURL })
}

module.exports = updateAvatar
