const Partner = require('../models/Partner');
const path = require('path')
const fs = require('fs')

module.exports.createPartner = async (req, res) => {
    try {
        const partner = new Partner({img: req.file.filename})
        await partner.save()
        res.status(200).json(partner)
    } catch (error) {
        res.status(500).json({msg: 'Error'})
    }
}

module.exports.updatePartner = async (req, res) => {
    try {
        const partner = await Partner.findById(req.body.id)
        let img = req.body.imgUpdated ? partner.img : req.file.filename
        const file = (path.join(__dirname, `../public/uploads/${img}`));
        fs.existsSync(file, (exists) =>{
            if(exists) fs.unlinkSync(file);
        })
        const result = await Partner.updateOne({_id: req.body.id}, {...req.body, img: req.body.imgUpdated ? req.file.filename : partner.img})
        res.status(200).json("Modified ...")
    } catch (error) {
        res.status(409).json(error)
    } 
}

module.exports.getPartners = async(req, res) => {
    try {
        const partners = await Partner.find().limit(4)
        res.status(200).json(partners)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}
module.exports.deletePartner = async (req, res) => {
    try {
        const partner = await Partner.findById(req.body.id)
        const file = path.join(__dirname, `../public/uploads/${partner.img}`)
        fs.existsSync(file, (exists) =>{
            if(exists) fs.unlinkSync(file);
        })
        await partner.deleteOne()
        res.status(200).json({msg: 'Success'})
    }catch (error) {
        console.log(error)
        res.status(409).json({msg: "Error"})
    }
}
