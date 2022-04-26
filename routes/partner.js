const router = require('express').Router()
const partnerController = require('../controllers/partnerController')
const upload = require('../multer')

router.post('/createPartner', upload, partnerController.createPartner)
router.post('/updatePartner', upload, partnerController.updatePartner)
router.get('/getPartners', partnerController.getPartners)
router.post('/deletePartner', upload, partnerController.deletePartner)

module.exports = router