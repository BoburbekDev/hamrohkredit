const router = require('express').Router()
const multer = require('../multer')
const rewardController = require('../controllers/rewardController')

router.post('/createReward', multer, rewardController.createReward)
router.post('/deleteReward', multer, rewardController.deleteReward)
router.post('/updateReward', multer, rewardController.updateReward)
router.get('/getRewardes',  rewardController.getRewardes)

module.exports = router