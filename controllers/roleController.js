const Role = require('../models/Role')

module.exports.getRoles = async (req, res) => {
    try {
        const roles = await Role.find()
        res.status(200).json(roles)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.createRole = async (req, res) => {
    try {
        console.log(req.body)
        const role = new Role(req.body)
        await role.save()
        res.status(201).json(role)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports.getRole = async (req, res) => {
    try {
        const role = await Role.findOne(req.params.id)
        !role && res.status(400).json("Role not found")
        res.status(200).json(role)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.updateRole = async (req, res) => {
    try {
        const updatedRole = await Role.findByIdAndUpdate(req.body.id, {
            $set: req.body
        }, {
            new: true
        })
        res.status(200).json(updatedRole)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.deleteRole = async (req, res) => {
    try {
        await Role.findByIdAndDelete(req.body.id)
        res.status(200).json("Role has been deleted ...")
    } catch (error) {
        res.status(500).json(error)
    }
}