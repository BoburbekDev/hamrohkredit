const router = require('express').Router()
const testController = require('../controllers/testController')

router.get('/getTests', testController.getTests)
router.post('/createTest', testController.createTest)
router.post('/getTestById', testController.getTestById)
router.post('/deleteTest', testController.deleteTest)
router.post('/updateTest', testController.updateTest)
router.post('/getTestForEmployee', testController.getTestForEmployee)
module.exports = router