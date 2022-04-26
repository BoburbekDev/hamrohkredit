const router = require('express').Router()
const comfortController = require('../controllers/comfortController')
const upload = require('../multer')

router.post('/createComfort', upload, comfortController.createComfort)
router.post('/updateComfort', upload, comfortController.updateComfort)
router.get('/getComforts', comfortController.getComforts)
router.post('/deleteComfort', upload, comfortController.deleteComfort)

module.exports = router