const multer = require('multer')
const path = require('path')

const tmpDir = path.join(__dirname, '..', 'tmp')

const multerConfig = multer.diskStorage({
	destination: tmpDir,

	// filename => используется в случае необходимости переимоновать файл при загрузке
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	},
})

const upload = multer({ storage: multerConfig })

module.exports = upload
