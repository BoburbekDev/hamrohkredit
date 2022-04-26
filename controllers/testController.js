const Test = require('../models/Test')
const Result = require('../models/Result')

module.exports.createTest = async(req, res) => {
    try {
        const test = new Test(req.body)
        await test.save()
        res.status(201).json(test)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.getTestById = async(req, res) => {
    try {
        const test = await Test.findById(req.body.id)
        res.status(200).json(test)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports.getTests = async(req, res) => {
    try {
        const tests = await Test.find().populate('roleId').select({"tests": 0})
        res.status(200).json(tests)
    } catch (error) {
        res.status(500).json(error)        
    }
}

module.exports.getTestForEmployee = async(req, res) => {
   try {
        const test = await Test.find({roleId: req.body.roleId})
            .select({"tests": 0})
        !test && res.status(400).json('There is no test in your role')
        res.status(200).json(test)
   } catch (error) {
       console.log(error)
       res.status(500).json(error)
   }
}

module.exports.finishTest = async(req, res) => {
    try {
        const result = new Result(req.body)
        await result.save()
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.updateTest = async(req, res) => {
    try {
        const test = await Test.findByIdAndUpdate(req.body.id,{
            $push: req.body
        },{
            new: true
        })
        res.status(200).json(test)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.deleteTest = async(req, res) => {
    try {
        await Test.findByIdAndDelete(req.body.id)
        res.status(200).json("Test has been deleted ...")
    } catch (error) {
        res.status(500).json(error) 
    }
}