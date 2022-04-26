const Reward = require('../models/Reward')
const fs = require('fs');
const path = require('path');
module.exports.createReward = async(req, res) => {
    try {
        const reward = new Reward({
            img: req.file.filename,
            title: req.body.title,
            text: req.body.text
        })
        
        await reward.save()
        res.status(200).json(reward)
    } catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports.updateReward = async(req,res) =>{
    try {
        const reward = await Reward.findById(req.body.id)
        let img = req.body.imgUpdated ? reward.img : req.file.filename
        const file = (path.join(__dirname, `../public/uploads/${img}`));
        fs.existsSync(file, (exists) =>{
            if(exists) fs.unlinkSync(file);
        })
        const result = await Reward.updateOne({_id: req.body.id}, {...req.body, img: req.body.imgUpdated ? req.file.filename : reward.img})
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(409).json(error)
    } 
}

module.exports.deleteReward = async(req, res) => {
    try {
        const reward = await Reward.findById(req.body.id)
        const file = path.join(__dirname, `../public/uploads/${reward.img}`)
        fs.existsSync(file, (exists) =>{
            if(exists) fs.unlinkSync(file);
        })
        await reward.deleteOne()
        res.status(200).json({msg: 'Success'})
    } catch (error) {
        
        res.status(409).json({msg: "Error"})
    }
}

module.exports.getRewardes = async(req, res) =>{
    try {
        const rewardes = await Reward.find()
        res.status(200).json(rewardes)
    } catch (error) {
        res.status(409).send('error')
    }
}
