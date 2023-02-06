let router = require('express').Router()
let parselogController = require('../controller/parselogController')
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
});

router.post('/check', upload.single('file'), parselogController.check_parselog)

module.exports = router