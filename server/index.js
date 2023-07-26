const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require("mongoose")
const User = require('./model/user')
const jwt = require('jsonwebtoken')
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/karbhdb')
app.post("/api/register",async (req, res)=>{
    console.log(req.body)
    try{
        const user = await User.create({
            name: req.body.name,
            mobile:req.body.mobile,
            password: req.body.password,
        })
        res.json({status:'ok'})
    } catch(err){
        res.json({status:'error', user:'false'})
    }
    
})
app.post("/api/login",async (req, res)=>{
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    })

    if(user){
        const token = jwt.sign({
            name: user.name,
            mobile: user.mobile,
        },'secret-123')
        return res.json({ status: 'ok', user: token})
    }else{
        return res.json({ status : 'error', user: false})
    }
})

app.get("/api/home",async (req, res)=>{

    const token = req.headers['x-access-token']
    try{
        const decoded= jwt.verify(token,'secret123')
        const mobile = decoded.mobile
        const user = await User.findOne({mobile: mobile})
        return res.json({ status : 'ok', quote: user.quote})
    } catch(error){
        console.log(error)
        res.json({ status: 'error', error:'invalid token'})
    }
})

app.post("/api/home",async (req, res)=>{

    const token = req.headers['x-access-token']
    try{
        const decoded= jwt.verify(token,'secret123')
        const mobile = decoded.mobile
        await User.updateOne({mobile: mobile}, {$set:{quote: req.body.quote}})
        return res.json({ status : 'ok'})
    } catch(error){
        console.log(error)
        res.json({ status: 'error', error:'invalid token'})
    }
})
app.listen(3005,()=>{
    console.log("Server Started")
})