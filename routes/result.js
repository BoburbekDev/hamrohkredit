const router = require('express').Router()
const resultController = require('../controllers/resultController')

router.post('/createResult', resultController.createResult)
router.post('/deleteResult', resultController.deleteResult)
router.get('/getResults', resultController.getResults)

module.exports = router