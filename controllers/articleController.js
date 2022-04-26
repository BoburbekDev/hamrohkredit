const Article = require('../models/Article')
const fs = require('fs');
const path = require('path');
module.exports.createArticle = async(req, res) => {
    try {
        const article = new Article({
            img: req.file.filename,
            title: req.body.title,
            text: req.body.text
        })
        
        await article.save()
        res.status(200).json(article)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports.updateArticle = async(req,res) =>{
    try {
        const article = await Article.findById(req.body.id)
        let img = req.body.imgUpdated ? article.img : req.file.filename
        const file = (path.join(__dirname, `../public/uploads/${img}`));
        fs.existsSync(file, (exists) =>{
            if(exists) fs.unlinkSync(file);
        })
        const result = await Article.updateOne({_id: req.body.id}, {...req.body, img: req.body.imgUpdated ? req.file.filename : article.img})
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(409).json(error)
    } 
}

module.exports.deleteArticle = async(req, res) => {
    try {
        console.log(req.body.id)
        const article = await Article.findById(req.body.id)
        const file = path.join(__dirname, `../public/uploads/${article.img}`)
        fs.existsSync(file, (exists) =>{
            if(exists) fs.unlinkSync(file);
        })
        await article.deleteOne()
        res.status(200).json({msg: 'Success'})
    } catch (error) {
        res.status(409).json({msg: "Error"})
    }
}

module.exports.getArticles = async(req, res) =>{
    try {
        const articles = await Article.find()
        res.status(200).json(articles)
    } catch (error) {
        res.status(409).send('error')
    }
}
