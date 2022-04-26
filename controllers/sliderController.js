const Slider = require('../models/Slider');
const path = require('path')
const fs = require('fs')

module.exports.createSlider = async (req, res) => {
    try {
        const slider = new Slider({img: req.file.filename})
        await slider.save()
        res.status(200).json(slider)
    } catch (error) {
        res.status(500).json({msg: 'Error'})
    }
}

module.exports.updateSlider = async (req, res) => {
    try {
        const slider = await Slider.findById(req.body.id)
        const file = (path.join(__dirname, `../public/uploads/${slider.img}`));
        fs.existsSync(file, (exists) =>{
            if(exists) fs.unlinkSync(file);
        })
        const result = await Slider.updateOne({_id: req.body.id}, {...req.body, img: req.file.filename})
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(409).json(error)
    } 
}

module.exports.getSliders = async(req, res) => {
    try {
        const sliders = await Slider.find()
        res.status(200).json(sliders)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}
module.exports.deleteSlider = async (req, res) => {
    try {
        const slider = await Slider.findById(req.body.id)
        const file = path.join(__dirname, `../public/uploads/${slider.img}`)
        fs.existsSync(file, (exists) =>{
            if(exists) fs.unlinkSync(file);
        })
        await slider.deleteOne()
        res.status(200).json({msg: 'Success'})
    }catch (error) {
        res.status(409).json({msg: "Error"})
    }
}
