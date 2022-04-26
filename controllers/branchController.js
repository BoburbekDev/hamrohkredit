const Branch = require('../models/Branch')
const fs = require('fs');
const path = require('path');
module.exports.createBranch = async(req, res) => {
    try {
        const branch = new Branch({
            img: req.file.filename,
            location: req.body.location,
            name: req.body.name,
            arentr: req.body.arentr,
            phone: req.body.phone,
        })
        await branch.save()
        res.status(201).json(branch)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.updateBranch = async (req, res) => {
    try {
        const branch = await Branch.findById( req.body.id)
        let img = req.body.imgUpdated ? branch.img : req.file.filename
        const file = (path.join(__dirname, `../public/uploads/${img}`));
        fs.existsSync(file, (exists) =>{
            if(exists) fs.unlinkSync(file);
        })
        const result = await Branch.updateOne({_id: req.body.id}, {...req.body, img: req.body.imgUpdated ? req.file.filename : branch.img})
        res.status(200).json(result)
    }catch(error) {
        console.log(error)
        res.status(409).json(error)
    }   
}

module.exports.getStatistic = async(req, res) => {
    try {
        const statistics = await Branch.find().select({name:-1, employeeCount: -1, releasedCount: -1})
        res.status(200).json(statistics)
    } catch (error) {
        console.log(error)
    }
}

module.exports.deleteBranch = async(req, res) => {
    try {
        const branch = await Branch.findById(req.body.id)
        const file = path.join(__dirname, `../public/uploads/${branch.img}`)
        fs.existsSync(file, (exists) =>{
            if(exists) fs.unlinkSync(file);
        })
        await branch.deleteOne()
        res.status(200).json({msg: 'Success'})
    } catch (error) {
        console.log(error)
        res.status(409).json({msg: "Error"})
    }
}

module.exports.getBranches = async(req, res) =>{
    try {
        const branches = await Branch.find()
        res.status(200).json(branches)
    } catch (error) {
        res.status(409).send('error')
    }
}
