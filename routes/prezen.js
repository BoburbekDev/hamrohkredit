const router = require('express').Router()
const multer = require('../multer')
const articleController = require('../controllers/prezen')

router.post('/create', multer, articleController.createArticle)
router.post('/delete', multer, articleController.deleteArticle)
router.post('/update', multer, articleController.updateArticle)
router.get('/get',  articleController.getArticles)

module.exports = router