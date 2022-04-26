const router = require('express').Router()
const roleController = require('../controllers/roleController')

router.post('/createRole', roleController.createRole)
router.post('/getRole', roleController.getRole)
router.post('/updateRole',  roleController.updateRole)
router.post('/deleteRole', roleController.deleteRole)
router.get('/getRoles',roleController.getRoles)

module.exports = router;