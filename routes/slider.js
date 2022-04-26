const router = require('express').Router()
const sliderController = require('../controllers/sliderController')
const upload = require('../multer')

router.post('/createSlider', upload, sliderController.createSlider)
router.post('/updateSlider', upload, sliderController.updateSlider)
router.get('/getSliders', sliderController.getSliders)
router.post('/deleteSlider', upload, sliderController.deleteSlider)

module.exports = router