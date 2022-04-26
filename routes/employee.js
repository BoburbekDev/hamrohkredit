const router = require('express').Router()
const multer = require('../multer')
const employeeContoller = require('../controllers/employeeController')

router.post('/createEmployee', multer, employeeContoller.createEmployee)
router.post('/updateEmployee', multer, employeeContoller.updateEmployee)
router.post('/employeeLogin', employeeContoller.login)
router.post('/activePrezentation', employeeContoller.activePrezentation)
router.post('/employeeByBranch', employeeContoller.employeeByBranch)
router.post('/deleteEmployee', employeeContoller.deleteEmployee)
router.get('/getEmployees', employeeContoller.getEmployees)
router.get('/getReleased', employeeContoller.getReleased)

module.exports = router