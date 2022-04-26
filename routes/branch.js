const router = require('express').Router()
const multer = require('../multer')
const branchController = require('../controllers/branchController')

router.post('/createBranch', multer, branchController.createBranch)
router.post('/deleteBranch', multer, branchController.deleteBranch)
router.post('/updateBranch', multer, branchController.updateBranch)
router.get('/getBranches',  branchController.getBranches)
router.get('/getStatistic',  branchController.getStatistic)

module.exports = router