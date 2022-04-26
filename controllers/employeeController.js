const Employee = require('../models/Employee')
const Branch = require('../models/Branch')
const bcrypt  = require('bcrypt')
const fs = require('fs')
const path = require('path')

module.exports.getEmployees = async( req, res ) => {
    try {
        const employees = await Employee.find({comment: ""}).populate(['roleId','branchId'])
        res.status(200).json(employees)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.employeeByBranch = async(req, res) => {
    try {
        const employees = await Employee.find({branchId: req.body.branchId, comment: ""}).populate(['roleId','branchId'])
        res.status(200).json(employees)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.getReleased = async( req, res ) => {
    try {
        const employees = await Employee.find({comment:{$ne: ""}}).populate(['roleId','branchId'])
        res.status(200).json(employees)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports.createEmployee = async( req, res ) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(req.body.password, salt)
        const employee = new Employee({
            name: req.body.name,
            roleId: req.body.roleId,
            branchId: req.body.branchId,
            password: hashPass,
            img: req.file.filename,
            email: req.body.email,
        })
        await Branch.updateOne({_id: req.body.branchId},{$inc: {'employeeCount': 1}})
        await employee.save()
        res.status(201).json(employee)
    }catch (error){
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports.login = async( req, res) => {
    try{
        const employee = await Employee.findOne({email: req.body.email})
        !employee && res.status(400).json("Wrong credentials !")
        const validated = await bcrypt.compare(req.body.password,employee.password);
        !validated && res.status(400).json("Wrong credentials bro !")
        const {password, ...others}  = employee._doc
        res.status(200).json(others)
    }catch (error){
        res.status(500).json(error)
    }    
}

module.exports.updateEmployee = async(req, res) =>{
    try{
        const employee = await Employee.findById(req.body.id)
        const file = (path.join(__dirname, `../public/uploads/${employee.img}`));
        fs.existsSync(file, (exists) =>{
            if(exists) fs.unlinkSync(file);
        })
        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(req.body.password, salt)
        const result = await Employee.updateOne({_id: req.body.id}, {...req.body, img: req.file.filename, password: hashPass})
        res.status(200).json(result)
    }catch (error){
        console.log(error)
        res.status(409).json(error)
    }
}

module.exports.activePrezentation = async(req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.body.id, {
            $set: req.body
        }, {
            new: true
        })
        res.status(200).json(updatedEmployee)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.deleteEmployee = async( req, res ) => {
    try{
        await Employee.updateOne({ _id: req.body.id },{ comment: req.body.comment, releasedTime: Date.now() })        
        await Branch.updateOne({_id: req.body.branchId},{$inc: {'employeeCount': -1, 'releasedCount': 1}})
        res.status(200).json("User has been deleted ...")
    }catch (error){
        res.status(500).json(error)
    }
}