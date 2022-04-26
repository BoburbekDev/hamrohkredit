const Result = require('../models/Result')

module.exports.createResult = async (req, res) => {
    try {
        const result = new Result(req.body)
        await result.save()
        res.status(201).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports.getResults = async (req, res) => {
    try {
        const results = await Result.find().populate(['userId', 'testId'])
        .select({'info': 0,}).sort({result: 1})
        res.status(200).json(results)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.deleteResult = async (req, res) => {
    try {
        await Result.findByIdAndDelete(req.body.id)
        res.status(200).json('Result has been deleted ...')
    } catch (error) {
        res.status(500).json(error)
    }
}
