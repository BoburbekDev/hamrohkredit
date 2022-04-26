const Test = require('../models/Test')

module.exports.getQuestionById = async(req, res) => {
    try {
        const test = await Test.findById(req.body.id).select({'opened': 0, 'roleId': 0, '_id': 0, 'closed': 0, 'title': 0})
        res.status(200).json(test)        
    } catch (error) {
        res.status(409).json(error)        
    }
}

module.exports.editQuestion = async(req, res) => {
    try {
        const updated = await Test.updateOne(
            {
                _id: req.body.id,
                "tests.id": req.body.testId
            },
            {
                $set: {
                    "tests.$.question": req.body.question,
                    "tests.$.options": req.body.options
                }
            },{new: true}
        )
        res.status(200).json(updated)
    } catch (error) {
        res.status(409).json(error)
    }
}


module.exports.deleteQuestion = async(req, res) => {
    try {
        console.log(req.body)
        await Test.updateOne({_id: req.body.id}, {$pull: {'tests': {"id": req.body.testId}}})
        res.status(200).json("Test has been deleted ...")
    } catch (error) {
        console.log(error)
        res.status(409).json(error)
    }
}