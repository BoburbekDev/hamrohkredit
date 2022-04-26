const router = require('express').Router()
const questionController = require('../controllers/questionController')

router.post('/getQuestionById', questionController.getQuestionById)
router.post('/deleteQuestion', questionController.deleteQuestion)
router.post('/editQuestion', questionController.editQuestion)

module.exports = router