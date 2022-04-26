const router = require('express').Router()
const multer = require('../multer')
const articleController = require('../controllers/articleController')

router.post('/createArticle', multer, articleController.createArticle)
router.post('/deleteArticle', multer, articleController.deleteArticle)
router.post('/updateArticle', multer, articleController.updateArticle)
router.get('/getArticles',  articleController.getArticles)

module.exports = router