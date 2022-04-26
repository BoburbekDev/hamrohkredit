const Comfort = require('../models/Comfort')
const fs = require('fs');
const path = require('path');
module.exports.createComfort = async(req, res) => {
    try {
        const comfort = new Comfort({
            img: req.file.filename,
            text: req.body.text
        })
        
        await comfort.save()
        res.status(200).json(comfort)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.updateComfort = async(req,res) =>{
    try {
        const comfort = await Comfort.findById(req.body.id)
        let img = req.body.imgUpdated ? comfort.img : req.file.filename
        const file = (path.join(__dirname, `../public/uploads/${img}`));
        fs.existsSync(file, (exists) =>{
            if(exists) fs.unlinkSync(file);
        })
        const result = await Comfort.updateOne({_id: req.body.id}, {...req.body, img: req.body.imgUpdated ? req.file.filename : comfort.img})
        res.status(200).json(result)
    } catch (error) {
        res.status(409).json(error)
    } 
}

module.exports.deleteComfort = async(req, res) => {
    try {
        const comfort = await Comfort.findById(req.body.id)
        const file = path.join(__dirname, `../public/uploads/${comfort.img}`)
        fs.existsSync(file, (exists) =>{
            if(exists) fs.unlinkSync(file);
        })
        await comfort.deleteOne()
        res.status(200).json({msg: 'Success'})
    } catch (error) {
        res.status(409).json({msg: "Error"})
    }
}

module.exports.getComforts = async(req, res) =>{
    try {
        const comfort = await Comfort.find()
        res.status(200).json(comfort)
    } catch (error) {
        res.status(409).send('error')
    }
}
